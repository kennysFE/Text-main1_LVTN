import React from "react";
import { BsTranslate, BsHeart } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { TbMedal2 } from "react-icons/tb";
import { FiShare } from "react-icons/fi";
import { useAppSelector } from "../../../Hooks/HooksRedux";

type Props = {};

export default function DetailTitle({}: Props) {
  const {roomDetail}=useAppSelector((state)=>state.roomReducer)
  const {localDetail}=useAppSelector((state)=>state.locationReducer)
  // console.log(localDetail)
  return (
    <>
      <div className="flex text-3xl font-medium text-xl">
        <BsTranslate className="mr-2" />
        {roomDetail?.tenPhong}
      </div>
      <div className="sm:flex mt-3 justify-start text-sm mb-2 sm:mb-0">
        <div className="sm:flex gap-3 basis-2/3">
          <div className="flex font-medium items-center">
            <AiFillStar />
            4.47 ·
          </div>
          <div className="flex gap-1 items-center">
            <TbMedal2 />
            <span>Chủ nhà siêu cấp .</span>
          </div>
          <div className="font-medium text">
            <button className="underline underline-offset-1">
              {localDetail?.tenViTri +' '+ localDetail?.tinhThanh +' '+localDetail?.quocGia}
            </button>
          </div>
        </div>
        <div className="flex basis-1/3 sm:justify-end gap-4 mt-2 sm:mt-0">
          <div className="font-medium flex  items-center gap-1">
            <FiShare />
            <button className="underline underline-offset-1"> Chia Se</button>
          </div>
          <div className="font-medium flex  items-center gap-1">
            <BsHeart />
            <button className="underline underline-offset-1">luu</button>
          </div>
        </div>
      </div>
    </>
  );
}
