export interface user {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  avatar?: string;
}
export interface UpdateUser {
  name: string;
  email: string;
  birthday: string;
  role: string;
  gender: boolean;
  phone: string;
}

export interface userProfile extends UpdateUser {
  avatar: string;
}

export interface UserPost extends UpdateUser {
  id: number;
  role: string;
}

export type UserSignIn = {
  email?: string;
  password?: string;
};

export interface userBooking {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}
