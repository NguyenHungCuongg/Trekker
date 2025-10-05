"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethod = exports.ServiceType = exports.BookingStatus = void 0;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CANCELLED"] = "cancelled";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var ServiceType;
(function (ServiceType) {
    ServiceType["TOUR"] = "tour";
    ServiceType["ACCOMMODATION"] = "accommodation";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["VNPAY"] = "vnpay";
    PaymentMethod["MOMO"] = "momo";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
//# sourceMappingURL=enums.js.map