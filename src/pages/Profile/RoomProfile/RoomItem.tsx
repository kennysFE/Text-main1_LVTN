import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import _ from "lodash";
import RoomInfor from "./RoomInfor";
import { getBookingUserApi } from "../../../redux/Reducers/userReducer";

type Props = {};

export default function RoomItem({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { userBooking } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
      const action = getBookingUserApi();
      dispatch(action);
  }, []);

  // Code xử lí render
  const lengthroom = userBooking.length;
  const [statusLength, setStatusLength] = useState(2);

  const renderTicketInfo = () => {
    if (lengthroom > 1) {
      return (
        <>
          {userBooking
            .slice(0,statusLength)
            .map((item: any, index: number) => {
              return (
                <>
                  <RoomInfor key={index} mainbooking={item} />
                </>
              );
            })}
        </>
      );
    } else {
      return (
        <>
          {userBooking.map((item: any, index: number) => {
            return (
              <>
                <RoomInfor key={index} mainbooking={item} />
              </>
            );
          })}
        </>
      );
    }
  };

  return (
    <div>
      <div>{renderTicketInfo()}</div>
      <div className="text-center ">
        {lengthroom > 1 && lengthroom >statusLength ? (
          <p
            className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 mt-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-60 text-center"
            onClick={() =>
              setStatusLength((preState) => {
                return preState + 1;
              })
            }
          >
            {" "}
            Xem thêm vé đã đặt
          </p>
        ) : (
          ""
        )}
        {statusLength >= lengthroom && lengthroom !== 0 && lengthroom > 1 ? (
          <p
            className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 mt-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 sm:w-60 text-center"
            onClick={() => setStatusLength(2)}
          >
            Vé của bạn đã hết !<p>Thu gọn</p>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
