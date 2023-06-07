import React from "react";
import { BsTranslate } from "react-icons/bs";
import { useAppDispatch } from "../../../../Hooks/HooksRedux";
import { modalPopUp } from "../../../../redux/Reducers/openModalReducer";
import PopUpIntroduce from "./PopUpIntroduce";
import PopUpTitle from "./PopUpTitle";
type Props = {};

export default function DetailIntroduce({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="mt-8 border-b border-slate-400 pb-5">
      <div className="flex items-center">
        <BsTranslate className="mr-2 text-xl" />
        <div className="text-base font-medium">Một số thông tin.</div>
      </div>
      <div className="mb-3 mt-3">
        <p className="text-base">
          Ngôi nhà đồng quê hình Tongita nằm ở Làng nghệ thuật gốm Icheon. Đây
          là một ngôi nhà riêng rộng rãi với sân thượng ở tầng ba của Sera và
          các trung tâm văn hóa khác, nổi tiếng với ngoại thất độc đáo trong hai
          nghìn ngôi làng nghệ thuật gốm sứ hòa quyện rất tốt với thiên nhiên.
          <br />
          <br />
          Tận hưởng một kỳ nghỉ thư giãn về cảm xúc trong một căn phòng ấm cúng
          và ấm áp. Bạn...
        </p>
      </div>
      <button
        className="underline underline-offset-1 font-bold text-base pb-3"
        onClick={() => {
          dispatch(
            modalPopUp({
              openModalPopup: true,
              ComponentContent: PopUpIntroduce,
              ComponentTitle: PopUpTitle,
            })
          );
        }}
      >
        Tìm hiểu thêm
      </button>
    </div>
  );
}
