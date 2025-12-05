export enum BookingStatus {
  CONFIRMED = "confirmed",
  PENDING = "pending",
  CANCELLED = "cancelled",
}

export enum ServiceType {
  TOUR = "tour",
  ACCOMMODATION = "accommodation",
}

export enum PaymentMethod {
  VNPAY = "vnpay",
  CASH = "cash",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
