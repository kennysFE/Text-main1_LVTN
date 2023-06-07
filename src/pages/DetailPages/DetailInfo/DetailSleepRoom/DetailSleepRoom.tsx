import React from "react";

type Props = {};

export default function DetailSleepRoom({}: Props) {
  return (
    <div className="mt-8 border-b border-slate-400 pb-5">
      <div className="font-medium text-xl">Nơi bạn sẽ ngủ nghỉ</div>
      <button className="w-72 h-52 overflow-hidden rounded-lg mt-4 mb-3 ">
        <img
          src="https://a0.muscache.com/im/pictures/61c66a15-1617-4042-8987-878f4a70b837.jpg?im_w=720"
          alt="..."
          className="w-full h-full"
        />
      </button>
      <button className="block mb-3">
        <div className="font-medium mb-2 text-left">Phòng ngủ</div>
        <div className="">1 giường đôi</div>
      </button>
    </div>
  );
}
