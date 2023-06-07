import { Rate } from "antd";
import _ from "lodash";
import React from "react";
import { useAppSelector } from "../../../Hooks/HooksRedux";
import CommentUser from "./CommentUser";

type Props = {};

export default function PopupReview({}: Props) {
  const { commentById } = useAppSelector((state) => state.commentReducer);
  const saoBinhLuan=_.reduce(commentById, (total,item)=>{
      return total + item.saoBinhLuan
  },0)
  return (
    <div className="sm:grid grid-cols-2 gap-1">
      <div className="overflow-hidden">
        <ul className="mt-2 py-2">
          <li className="py-2">
            <span className="w-48 inline-block">Mức độ sạch sẽ</span>
            <Rate allowHalf defaultValue={0} value={2.6} />
          </li>
          <li className=" py-2">
            <span className="w-48 inline-block">Độ chính xác</span>
            <Rate allowHalf defaultValue={0} value={5} />
          </li>
          <li className=" py-2">
            <span className="w-48 inline-block">Giao tiếp</span>
            <Rate allowHalf defaultValue={0} value={4} />
          </li>
          <li className=" py-2">
            <span className="w-48 inline-block">Vị trí</span>
            <Rate allowHalf defaultValue={0} value={3} />
          </li>
          <li className=" py-2">
            <span className="w-48 inline-block">Nhận phòng</span>
            <Rate allowHalf defaultValue={0} value={2.5} />
          </li>
          <li className=" py-2">
            <span className="w-48 inline-block">Giá trị</span>
            <Rate allowHalf defaultValue={0} value={1.5} />
          </li>
        </ul>
      </div>
      <div className="overflow-auto h-29rem">
        {commentById?.map((item: any) => {
          return <CommentUser id={item?.maNguoiBinhLuan} userCommentId={item} />;
        })}
      </div>
    </div>
  );
}
