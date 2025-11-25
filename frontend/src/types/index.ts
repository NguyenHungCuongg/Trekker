/*
For cu Đạt: từ giờ mấy cái kiểu dữ liệu lưu mấy 
cái Entity fetched từ backend bỏ vô đây nha em!
*/
export interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string | null;
  fullName?: string;
  phone?: string;
}

export interface Location {
  name: string;
  accommodationCount: number;
  tourCount: number;
  image: string;
}

export interface Destination {
  name: string;
  tourCount: number;
  image: string;
}

export interface Tour {
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
}

export interface Accommodation {
  name: string;
  destination: string;
  rating: number;
  pricePerNight: string;
  image: string;
}
