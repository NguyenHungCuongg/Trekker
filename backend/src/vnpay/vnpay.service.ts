import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { VnPayIpnReturnDto } from "./dto/vnpay.dto";
import {
  buildQueryString,
  buildSignedQuery,
  createVnPayHash,
} from "./vnpay.utils";
import moment from "moment";
import { Repository } from "typeorm";
import { Booking } from "src/booking/booking.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingStatus, PaymentStatus } from "src/common/enums";
import { BookingService } from "src/booking/booking.service";
import { CreateBookingDto } from "src/booking/dto/create-booking.dto";
import { Payment } from "src/payment/payment.entity";

@Injectable()
export class VnpayService {
  private readonly logger = new Logger(VnpayService.name);
  private readonly vnp_TmnCode: string;
  private readonly vnp_HashSecret: string;
  private readonly vnp_Url: string;
  private readonly vnp_ReturnUrl: string;
  private readonly vnp_IpnUrl: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private bookingService: BookingService,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    this.vnp_TmnCode =
      this.configService.getOrThrow<string>("vnpay.vnp_TmnCode");
    this.vnp_HashSecret = this.configService.getOrThrow<string>(
      "vnpay.vnp_HashSecret",
    );
    this.vnp_Url = this.configService.getOrThrow<string>("vnpay.vnp_Url");
    this.vnp_ReturnUrl = this.configService.getOrThrow<string>(
      "vnpay.vnp_ReturnUrl",
    );
    this.vnp_IpnUrl = this.configService.getOrThrow<string>("vnpay.vnp_IpnUrl");
  }

  async createPaymentUrl(
    data: CreateBookingDto,
    ipAddr: string,
  ): Promise<string> {
    try {
      this.logger.log("=== START createPaymentUrl ===");
      if (
        !this.vnp_TmnCode ||
        !this.vnp_HashSecret ||
        !this.vnp_Url ||
        !this.vnp_ReturnUrl
      ) {
        throw new InternalServerErrorException(
          "VnPay configuration is missing.",
        );
      }

      this.logger.log("Creating booking...");
      const newBooking = await this.bookingService.create(data);
      this.logger.log(`Booking created with ID: ${newBooking.id}`);

      const clientIp = ipAddr === "::1" ? "127.0.0.1" : ipAddr;

      const createDate = moment().utcOffset(7).format("YYYYMMDDHHmmss");
      const expiredDate = moment()
        .utcOffset(7)
        .add(15, "minutes")
        .format("YYYYMMDDHHmmss");

      const vnp_Params: Record<string, string> = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: this.vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: String(newBooking.id),
        vnp_OrderInfo: `Thanh toan cho don hang ${newBooking.id}`,
        vnp_OrderType: "other",
        vnp_Amount: String(Math.round(Number(newBooking.totalPrice) * 100)),
        vnp_ReturnUrl: this.vnp_ReturnUrl,
        vnp_IpAddr: clientIp,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expiredDate,
        vnp_SecureHashType: "HMACSHA512",
      };

      const signData = buildQueryString(vnp_Params, [
        "vnp_SecureHash",
        "vnp_SecureHashType",
      ]);
      this.logger.debug(`SIGN_DATA=${signData}`);

      const querystring = buildSignedQuery(vnp_Params, this.vnp_HashSecret);
      const finalUrl = `${this.vnp_Url}?${querystring}`;

      this.logger.log(`Payment URL created: ${finalUrl.substring(0, 100)}...`);
      this.logger.log("=== END createPaymentUrl ===");

      return finalUrl;
    } catch (error) {
      this.logger.error("Error in createPaymentUrl:", error);
      throw error;
    }
  }

  async processVnPayReturn(vnp_Params: Record<string, any>): Promise<{
    isSuccess: boolean;
    message: string;
    orderId: string;
    amount: number;
  }> {
    const secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    // 1. Kiểm tra chữ ký hợp lệ
    const checkSum = createVnPayHash(vnp_Params, this.vnp_HashSecret);

    if (secureHash !== checkSum) {
      this.logger.error(
        `Return failed signature check for Booking ID: ${vnp_Params["vnp_TxnRef"]}`,
      );
      await this.bookingService.cancelVnpayBooking(
        Number(vnp_Params["vnp_TxnRef"]),
      );
      return {
        isSuccess: false,
        message: "Sai chữ ký (Invalid signature)",
        orderId: vnp_Params["vnp_TxnRef"],
        amount: vnp_Params["vnp_Amount"] / 100,
      };
    }

    // 2. Kiểm tra mã phản hồi
    const responseCode = vnp_Params["vnp_ResponseCode"];
    const transactionStatus = vnp_Params["vnp_TransactionStatus"];
    const orderId = vnp_Params["vnp_TxnRef"];
    const amount = vnp_Params["vnp_Amount"] / 100;

    if (responseCode === "00" && transactionStatus === "00") {
      // Dù thành công, bạn vẫn nên dựa vào IPN để update DB.
      const booking = await this.bookingRepository.findOne({
        where: { id: Number(orderId) },
        relations: ["payment"],
      });

      if (!booking) {
        this.logger.error(`Booking not found for ID: ${orderId}`);
        return {
          isSuccess: false,
          message: "Booking not found",
          orderId,
          amount,
        };
      }
      booking.status = BookingStatus.CONFIRMED;
      booking.payment.status = PaymentStatus.PAID;
      await this.bookingRepository.save(booking);

      return {
        isSuccess: true,
        message: "Thanh toán thành công",
        orderId,
        amount,
      };
    } else {
      await this.bookingService.cancelVnpayBooking(Number(orderId));
      return {
        isSuccess: false,
        message: `Thanh toán thất bại. Mã lỗi: ${responseCode}`,
        orderId,
        amount,
      };
    }
  }

  async processVnPayIpn(
    vnp_Params: Record<string, any>,
  ): Promise<VnPayIpnReturnDto> {
    const secureHash = vnp_Params["vnp_SecureHash"];
    const orderId = vnp_Params["vnp_TxnRef"];
    const amount = vnp_Params["vnp_Amount"] / 100;
    const responseCode = vnp_Params["vnp_ResponseCode"];
    const transactionStatus = vnp_Params["vnp_TransactionStatus"];

    // 1. Kiểm tra chữ ký hợp lệ
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    const checkSum = createVnPayHash(vnp_Params, this.vnp_HashSecret);

    if (secureHash !== checkSum) {
      this.logger.error(`IPN failed signature check for Order ID: ${orderId}`);
      return { RspCode: "97", Message: "Sai chữ ký (Invalid signature)" };
    }

    // 2. Lấy thông tin đơn hàng từ Database và kiểm tra
    // TODO: Thay thế bằng logic truy vấn DB thực tế của bạn
    // Ví dụ: const order = await this.orderRepository.findOne({ where: { id: orderId } });
    const order = { status: "Pending", totalAmount: 100000 };

    if (!order) {
      this.logger.error(`IPN received for non-existent Order ID: ${orderId}`);
      return {
        RspCode: "01",
        Message: "Đơn hàng không tồn tại (Order not found)",
      };
    }

    // 3. Kiểm tra số tiền
    if (order.totalAmount !== amount) {
      this.logger.error(
        `IPN amount mismatch for Order ID ${orderId}. DB: ${order.totalAmount}, VNPAY: ${amount}`,
      );
      return {
        RspCode: "04",
        Message: "Số tiền không hợp lệ (Invalid amount)",
      };
    }

    // 4. Kiểm tra trạng thái đơn hàng (Đảm bảo chỉ xử lý 1 lần)
    if (order.status !== "Pending") {
      // Nếu đã xử lý (đã thành công/thất bại), trả về 02 (đã được xử lý) hoặc 00 (thành công)
      // Trong trường hợp này, trả về 00 để báo VNPay không cần gửi lại
      this.logger.warn(
        `IPN received for processed Order ID: ${orderId}. Status: ${order.status}`,
      );
      return {
        RspCode: "00",
        Message: "Đơn hàng đã được xử lý (Order already confirmed)",
      };
    }

    // 5. Xử lý thành công/thất bại chính thức
    if (responseCode === "00" && transactionStatus === "00") {
      // TODO: Cập nhật trạng thái đơn hàng trong DB thành 'Success'
      this.logger.log(
        `IPN SUCCESS for Order ID: ${orderId}. Amount: ${amount}`,
      );
      return { RspCode: "00", Message: "Giao dịch thành công (Success)" };
    } else {
      // TODO: Cập nhật trạng thái đơn hàng trong DB thành 'Failed'
      this.logger.warn(
        `IPN FAILED for Order ID: ${orderId}. Code: ${responseCode}`,
      );
      return {
        RspCode: "00",
        Message: "Giao dịch thất bại (Success, transaction failed)",
      }; // Trả về 00 để VNPay không gửi lại
    }
  }
}
