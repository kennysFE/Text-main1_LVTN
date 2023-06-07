import React, { memo, useState } from "react";
import { useAppDispatch } from "../../../../Hooks/HooksRedux";
import { modalPopUp } from "../../../../redux/Reducers/openModalReducer";
import PopUpInfoCover from "./PopUpInfoCover";
import PopUPTitle from "./PopUPTitle";

type Props = {};

 function DetailInfoCover({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="mt-8 border-b border-slate-400 pb-5">
      <div className="font-bold text-3xl mb-3">
        <span className="text-red-500">AIR</span>COVER
      </div>
      <p className=" mb-4 text-base">
        Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy,
        thông tin nhà/phòng cho thuê không chính xác và những vấn đề khác như sự
        cố trong quá trình nhận phòng.
      </p>
      <button
        className="underline underline-offset-1 font-bold text-base pb-3"
        onClick={() => {
          const action = modalPopUp({
            openModalPopup: true,
            ComponentContent: PopUpInfoCover,
            ComponentTitle:PopUPTitle
          });
          dispatch(action);
        }}
      >
        Tìm hiểu thêm
      </button>
    </div>
  );
}
export default memo(DetailInfoCover)