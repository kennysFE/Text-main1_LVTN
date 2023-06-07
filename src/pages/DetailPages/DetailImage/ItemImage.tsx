import React, { useState } from "react";
import { TiThSmall } from "react-icons/ti";
import {  useAppDispatch } from "../../../Hooks/HooksRedux";
import { modal } from "../../../redux/Reducers/openModalReducer";
import { roomList } from "../../../utils/Type/TypeRoom";

type Props = {
  arrImage: roomList[],
  index: number
};

export default function ItemImage({ arrImage, index }: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      {index === 4 ? (
        <button
          className="w-full h-full relative "
          onClick={() => {
            const action = modal(true);
            dispatch(action);
          }}
          style={{
            backgroundImage: `url(${arrImage[0]?.hinhAnh})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            className="absolute right-8 bottom-5 bg-white py-1 px-3 text-base hover:bg-slate-100 rounded-lg border-black flex items-center"
            style={{ border: "1px solid black" }}
            onClick={() => {
              const action = modal(true);
              dispatch(action);
            }}
          >
            <TiThSmall className="mr-2 font-medium" />
            Hiện tất cả các ảnh
          </button>
        </button>
      ) : (
        <button
          className={`w-full h-full `}
          onClick={() => {
            const action = modal(true);
            dispatch(action);
          }}
          style={{
            backgroundImage: `url(${arrImage[0]?.hinhAnh})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></button>
      )}
    </>
  );
}
