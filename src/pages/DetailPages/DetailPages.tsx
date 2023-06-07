import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToTop from "../../components/BackToTop/BackToTop";
import ModalPopup from "../../HOC/ModalPopup";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { getCommentRoomById } from "../../redux/Reducers/commentReducer";
import { getLocationDetailById } from "../../redux/Reducers/locationReducer";
import { getDetailRoomId } from "../../redux/Reducers/roomReducer";
import DetailComment from "./DetailComment/DetailComment";
import DetailInfoRoom from "./DetailInfo/DetailInfo";
import DetailReview from "./DetailReview/DetailReview";
import DetailTitle from "./DetailTitle/DetailTitle";

type Props = {};

type QuizParams = {
  id: string;
};
function DetailPages({}: Props) {
  const { id } = useParams<QuizParams>();
  const dispatch = useAppDispatch();
  const { roomDetail } = useAppSelector((state) => state.roomReducer);
  useEffect(() => {
    (async () => {
      const action1 = getDetailRoomId(id);
      await dispatch(action1);
      const action3 = getCommentRoomById(Number(id));
      await dispatch(action3);
    })();
  }, []);

  useEffect(() => {
    if (roomDetail) {
      const action = getLocationDetailById(roomDetail.maViTri);
      dispatch(action);
    }
  }, [roomDetail]);

  return (
    <div className="relative">
      {/* <HeaderDetail /> */}
      <div className="mt-28">
        <div className="container px-5 sm:w-full">
          <DetailTitle />
          {/* <DetailImage /> */}
          <div
            className=" h-96 w-full mt-4 overflow-hidden rounded-xl"
            style={{
              backgroundImage: `url(${roomDetail?.hinhAnh})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <DetailInfoRoom id={id} />
          <DetailReview />
          <DetailComment idRoom={Number(roomDetail?.id)} />

          {/* <DetailUser /> */}
          <ModalPopup />
          <ToastContainer />
          <BackToTop />
        </div>
      </div>
    </div>
  );
}

export default memo(DetailPages);
