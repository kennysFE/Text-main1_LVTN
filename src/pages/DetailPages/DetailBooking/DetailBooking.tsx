import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useAppSelector } from "../../../Hooks/HooksRedux";
import useScroll from "../../../Hooks/UseScroll";
import { toast } from "react-toastify";
import { getStoreJSON, http, USER_LOGIN } from "../../../utils/setting";

import DetailCheckInCheckOut from "./DetailCheckInCheckOut/DetailCheckInCheckOut";
import DetailPeople from "./DetailPeople/DetailPeople";
import DetailTotal from "./DetailTotal/DetailTotal";
import { toastOptionsErr, toastOptionsSuccess } from "../../../App";
import { useNavigate } from "react-router-dom";
import moment from "moment";



type Props = {
  id: string;
};

export default function DetailBooking({ id }: Props) {
  const scroll: number = useScroll();
  const { roomDetail } = useAppSelector((state) => state.roomReducer);
  const { commentById } = useAppSelector((state) => state.commentReducer);
  const [childCount, setChildCount] = useState(0);
  const [adultsCount, setAdultsCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);
  const [date, setDate] = useState([]);
  const [totalDay, setTotalDay] = useState<number>(0);
  const navigate = useNavigate();

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleSize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, [window.innerWidth]);

  const handleCount = (type: string, count: number) => {
    const handleCount = (prev: number) => {
      let temp = prev + count;
      if (temp < 0) {
        temp = 0;
      }
      return temp;
    };
    switch (type) {
      case "adults": {
        setAdultsCount((prev) => handleCount(prev));
        break;
      }
      case "child": {
        setChildCount((prev) => handleCount(prev));
        break;
      }
      case "baby": {
        setBabyCount((prev) => handleCount(prev));
        break;
      }
      default:
        break;
    }
  };

  const dateFormat = "MM/DD/yyyy";
  const onChange = (date: any, dateString: any) => {
    if (date !== null) {
      date[0].format(dateFormat), date[1].format(dateFormat);
    }
    setDate(dateString);
    const currentDate = moment(new Date()).format("MM/DD/YYYY");
    if (getDateDiff(dateString[0], currentDate) <= 0) {
      toast.error("Chọn lại ngày đến và đi", toastOptionsErr);
    } else {
      setTotalDay(getDateDiff(dateString[1], dateString[0]));
    }
  };

  function getDateDiff(time1: string, time2: string) {
    var str1: any = time1.split("/");
    var str2: any = time2.split("/");
    //                yyyy   , mm       , dd
    var t1: any = new Date(str1[2], str1[0] - 1, str1[1]);
    var t2: any = new Date(str2[2], str2[0] - 1, str2[1]);
    var diffMS = t1 - t2;
    var diffS = diffMS / 1000;
    var diffM = diffS / 60;
    var diffH = diffM / 60;
    var diffD = diffH / 24;
    return diffD;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let user = await getStoreJSON(USER_LOGIN);
    if (user) {
      if (adultsCount + childCount + babyCount > roomDetail?.khach) {
        toast.error(
          `Chọn lại số người , không vượt quá ${roomDetail?.khach} khách `,
          toastOptionsErr
        );
      } else {
        if (totalDay !== 0) {
          if (adultsCount + babyCount + childCount !== 0) {
            let booking = {
              maPhong: id,
              ngayDen: date[0],
              ngayDi: date[1],
              soLuongKhach: adultsCount + babyCount + childCount,
              maNguoiDung: user.id,
            };
            let result = await http.post(`/dat-phong`, booking);
            if (result.status === 201) {
              toast.success(`Thêm thành công `, toastOptionsSuccess);
            }
          } else {
            toast.error("Vui lòng chọn số lượng khách", toastOptionsErr);
          }
        } else {
          toast.error("Hãy chọn lại ngày đến và đi", toastOptionsErr);
        }
      }
    } else {
      navigate("/login/1");
    }
  };

  return (
    <div
      className={
        width > 750
          ? scroll >= 780
            ? "transition-all ease-in-out "
            : "fixed z-10 top-135px w-475px transition-all ease-in-out" &&
              scroll >= 484
            ? "fixed z-10 top-135px w-475px transition-all ease-in-out"
            : "transition-all ease-in-out "
          : ""
      }
      style={{
        scrollBehavior: "smooth",
        transition: "all solid",
        border: "2px solid whitesmoke",
        borderRadius: "20px",
        overflow: "hidden",
        padding: "10px 20px",
      }}
    >
      <div className="flex items-center justify-between my-4">
        <div className="text-base text-slate-400">
          <span className="font-bold  text-xl mr-2 text-black">
            ${roomDetail?.giaTien}
          </span>
          đêm
        </div>
        <div className="text-base font-medium">
          <div className="flex items-center">
            <AiFillStar /> 5,0 ·
            <p className="underline ml-2 font-medium">
              {commentById?.length} đánh giá
            </p>
          </div>
        </div>
      </div>
      <DetailCheckInCheckOut onChange={onChange} dateFormat={dateFormat} />
      <DetailPeople
        handleCount={handleCount}
        adultsCount={adultsCount}
        childCount={childCount}
        babyCount={babyCount}
      />
      <Button
        type="primary"
        htmlType="submit"
        danger
        block
        shape="round"
        size={"large"}
        onClick={handleSubmit}
      >
        Đặt phòng
      </Button>
      <DetailTotal price={roomDetail?.giaTien} totalDay={totalDay} />
    </div>
  );
}
