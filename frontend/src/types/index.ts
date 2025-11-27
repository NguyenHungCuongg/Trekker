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

export interface LocationCard {
  name: string;
  accommodationCount: number;
  tourCount: number;
  image: string;
}

export interface DestinationCard {
  name: string;
  tourCount: number;
  image: string;
}

export interface TourCard {
  id: any;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
}

export interface AccommodationCard {
  name: string;
  destination: string;
  rating: number;
  pricePerNight: string;
  image: string;
}

export interface RoomType {
  id: number;
  accommodationId: number;
  name: string;
  capacity: number;
  price: number;
  discountPrice?: number;
  amenities: string;
  description: string;
  quantity: number;
  image: string;
}
