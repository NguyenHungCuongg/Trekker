export class ResponseEntity<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;

  constructor(success: boolean, statusCode: number, message: string, data?: T) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(message: string, data?: T, statusCode: number = 200) {
    return new ResponseEntity<T>(true, statusCode, message, data);
  }

  static error(message: string, statusCode: number = 500) {
    return new ResponseEntity(false, statusCode, message);
  }
}
