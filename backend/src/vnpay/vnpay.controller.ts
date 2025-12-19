import {
  All,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { VnPayIpnReturnDto } from "./dto/vnpay.dto";
import { VnpayService } from "./vnpay.service";
import type { Request, Response } from "express";
import { CreateBookingDto } from "src/booking/dto/create-booking.dto";
import { JwtAuthGuard } from "src/auth/jwt.authguard";

@Controller("vnpay")
export class VnpayController {
  private logger = new Logger("VnpayController");

  constructor(private readonly vnPayService: VnpayService) {}

  @Post("create_payment_url")
  @UseGuards(JwtAuthGuard)
  async createPaymentUrl(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as any).userId;
    createBookingDto.userId = userId;

    let ipAddr =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      req.ip ||
      "127.0.0.1";

    ipAddr = ipAddr.replace(/^::ffff:/i, "");
    if (ipAddr === "::1") {
      ipAddr = "127.0.0.1";
    }

    console.log("Booking Data with User ID:", createBookingDto);
    const paymentUrl = await this.vnPayService.createPaymentUrl(
      createBookingDto,
      ipAddr,
    );

    return { paymentUrl };
  }

  @Get("vnpay_return")
  async handleVnPayReturn(
    @Query() vnp_Params: Record<string, any>,
    @Res() res: Response,
  ) {
    this.logger.log("VNPay Return Params:", vnp_Params);

    const result = await this.vnPayService.processVnPayReturn(vnp_Params);
    const status = result.isSuccess ? "success" : "failed";
    const orderId = vnp_Params.vnp_TxnRef;
    const amount = Math.round(Number(vnp_Params.vnp_Amount) / 100);
    const message = result.message || "Giao dịch thành công";

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Kết quả thanh toán</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }
        .container {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          max-width: 400px;
        }
        .icon { font-size: 64px; margin-bottom: 16px; }
        .title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #333;
        }
        .details {
          font-size: 14px;
          color: #666;
          margin-bottom: 24px;
          line-height: 1.8;
          text-align: left;
          background: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid ${result.isSuccess ? "#4CAF50" : "#f44336"};
        }
        .button {
          display: inline-block;
          padding: 14px 32px;
          background: #0F93C3;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
        }
        .button:hover {
          background: #0d7a9f;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">${result.isSuccess ? "✅" : "❌"}</div>
        <div class="title">${result.isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}</div>
        <div class="details">
          <div><strong>Mã đơn:</strong> ${orderId}</div>
          <div><strong>Số tiền:</strong> ${amount.toLocaleString()} VNĐ</div>
          ${!result.isSuccess ? `<div><strong>Lỗi:</strong> ${message}</div>` : ""}
        </div>
        <button class="button" onclick="window.postMessage({type: 'PAYMENT_COMPLETE', status: '${status}'})">
          Quay lại ứng dụng
        </button>
      </div>
    </body>
    </html>
  `;

    res.header("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  }

  @All("vnpay_ipn")
  async handleVnPayIpn(
    @Query() vnp_Params: Record<string, any>,
    @Res() res: Response<VnPayIpnReturnDto>,
  ) {
    const result = await this.vnPayService.processVnPayIpn(vnp_Params);
    res.status(200).json(result);
  }
}
