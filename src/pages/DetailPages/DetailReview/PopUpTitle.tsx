import { Input } from "antd";
import Search from "antd/lib/transfer/search";
import React from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";

type Props = {};

export default function PopUpTitle({}: Props) {
  const { Search } = Input;
  return (
    <div className="">
      <div className="flex items-center gap-2 font-semibold text-2xl mt-5">
        <AiFillStar />
        5.0
        <h2 className="">({2}) đánh giá </h2>
      </div>
    </div>
  );
}
