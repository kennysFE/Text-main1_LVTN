import { Button } from "antd";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useAppSelector } from "../../../Hooks/HooksRedux";

type Props = {};

export default function DetailUser({}: Props) {
   const {roomDetail}=useAppSelector(state => state.roomReducer)
   const {userProfile}=useAppSelector(state => state.userReducer)
   console.log(roomDetail);
   console.log(userProfile) 
  return (
    <div>
      <div className="mt-8 mb-8">
        <div className="flex gap-4 items-center mb-2">
          <img
            src={userProfile?.avatar}
            alt="..."
            className="w-24 h-24 rounded-full"
          />
          <div className="text-lg">
            <h2 className="font-medium">{userProfile?.name}</h2>
            <p>Đã tham gia vào tháng 7 năm 2015</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xl">
          <AiFillStar />
          <h2 className="">{2} đánh giá </h2>
        </div>
        <div className="flex gap-40">
          <p className="mt-2 text-lg w-1/2">
            Tên tôi là Tack Chủ doanh nghiệp và quản lý dịch vụ lưu trú, Nhà sản
            xuất âm nhạc và DJ
            <br />
            <br />
            Thích tạo ra một số ý tưởng thú vị cho doanh nghiệp Sống ở Bangkok
            và du lịch trên toàn thế giới
          </p>
          <div className="text-lg w-1/2">
            <ul className="mb-3">
              <li>Ngôn ngữ: English, ภาษาไทย</li>
              <li>Tỉ lệ phản hồi: 100%</li>
              <li>Thời gian phản hồi: trong vòng một giờ</li>
            </ul>
            <Button size={'large'}>Liên hệ với chủ nhà</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
