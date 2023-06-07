import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  location: any;
};

export default function ItemRoomLocation({ location }: Props) {
  const { nameLocationRoom } = useParams<string>();
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="mb-4 w-full"
        onClick={() => {
          navigate(`/detailRoom/${location?.id}`);
        }}
      >
        <img
          src={location?.hinhAnh}
          alt=""
          className="rounded-lg w-full h-64"
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-left mt-1">
            <p className="font-medium">
              Toàn bộ phòng tại khu vực {nameLocationRoom?.replace("_", " ")}
            </p>
            <p className="text-lg font-bold">{location?.tenPhong}</p>
            <p className="">
              {location?.khach} khách + {location?.giuong} giường +{" "}
              {location?.phongTam} phòng tắm
            </p>
          </div>
          <AiOutlineHeart className="text-lg" />
        </div>
      </button>
    </div>
  );
}
