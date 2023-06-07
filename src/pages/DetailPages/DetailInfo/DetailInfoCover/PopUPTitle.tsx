import React from "react";

type Props = {};

export default function PopUPTitle({}: Props) {
  return (
    <>
      <div className="font-bold text-3xl mb-3">
        <span className="text-red-500">AIR</span>COVER
      </div>
      <p className='font-normal'>
        AirCover là chương trình bảo vệ toàn diện, được áp dụng miễn phí với mọi
        đặt phòng.
      </p>
    </>
  );
}
