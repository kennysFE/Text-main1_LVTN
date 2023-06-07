import React from "react";
import DetailBooking from "../DetailBooking/DetailBooking";
import DetailDescription from "./DetailDescription/DetailDescription";
import DetailEquipment from "./DetailEquipment/DetailEquipment";
import DetailInfoCover from "./DetailInfoCover/DetailInfoCover";

type Props = {
  id: string | any;
};

export default function DetailInfoRoom({ id }: Props) {
  return (
    <div className="mt-14 sm:flex sm:gap-24">
      <div className="sm:w-3/5 ">
        <DetailDescription />
        <DetailInfoCover />
        {/* <DetailIntroduce/> */}
        {/* <DetailSleepRoom /> */}
        <DetailEquipment />
        {/* <DetailCalendar/> */}
      </div>
      <div className="sm:w-2/5 relative right-0 top-0 ">
        <DetailBooking id={id} />
      </div>
    </div>
  );
}
