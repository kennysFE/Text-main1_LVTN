import _ from "lodash";
import React, { memo } from "react";
import { AiFillStar } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../../Hooks/HooksRedux";
import { modalPopUp } from "../../../redux/Reducers/openModalReducer";
import CommentUser from "./CommentUser";
import PopupReview from "./PopupReview";
import PopUpTitle from "./PopUpTitle";

type Props = {
};

 function DetailReview({}: Props) {
  const { commentById } = useAppSelector((state) => state.commentReducer);
  const dispatch = useAppDispatch();
  let user1=_.random(0, commentById.length - 1);
  let user2=_.random(0, commentById.length-2)+1;
  return (
    <div className="" id="review">
      <div className="flex items-center gap-2 font-semibold text-2xl mt-5">
        <AiFillStar />
        <h2 className="">{commentById?.length} đánh giá </h2>
      </div>
      <div className="sm:grid grid-cols-2 mb-4 mt-2">
        <div className="">
          <CommentUser id={commentById[user1]?.maNguoiBinhLuan} userCommentId={commentById[user1]} />
        </div>
        <div className="">
          <CommentUser id={commentById[user2]?.maNguoiBinhLuan} userCommentId={commentById[user2]} />
        </div>
      </div>
      <button
        className="underline underline-offset-1 font-medium text-xl flex items-center mb-5"
        onClick={() => {
          dispatch(
            modalPopUp({
              ComponentContent: PopupReview,
              openModalPopup: true,
              ComponentTitle: PopUpTitle,
            })
          );
        }}
      >
        Hiện thị thêm
        <GrFormNext />
      </button>
    </div>
  );
}

export default memo(DetailReview)