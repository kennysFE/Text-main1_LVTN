import React from "react";

import { BsHeart } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";

import { useAppDispatch, useAppSelector } from "../../../../Hooks/HooksRedux";
import { modal } from "../../../../redux/Reducers/openModalReducer";

type Props = {};

export default function DetailImageModal({}: Props) {
  const dispatch = useAppDispatch();
  const { openModal } = useAppSelector((state) => state.openModalReducer);
  const { roomArray } = useAppSelector((state) => state.roomReducer);
  return (
    <div
      className={`absolute left-0 w-full bg-slate-50 animate__animated ${
        openModal
          ? "opacity-1 z-10 "
          : "opacity-0 -z-10 h-0 hidden  animate__backOutDown"
      }`}
      style={{ top: "-128px" }}
    >
      <div className="container relative">
        <div className=" fixed container p-6 bg-slate-50">
          <div className="w-full flex justify-start font-medium text-lg">
            <button
              className="basis-2/3 text-xl"
              onClick={() => {
                const action = modal(false);
                dispatch(action);
                window.scroll(0,0);
              }}
            >
              <GrFormPrevious />
            </button>
            <div className="flex basis-1/3 justify-end gap-4">
              <div className="font-medium flex  items-center gap-1">
                <FiShare />
                <button className="underline underline-offset-1">
                  Chia Se
                </button>
              </div>
              <div className="font-medium flex  items-center gap-1">
                <BsHeart />
                <button className="underline underline-offset-1">luu</button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid justify-items-center gap-3">
          {roomArray?.map((item, index) => {
            return (
              <div className="" key={index}>
                <img src={item.hinhAnh} alt="..." className="object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
