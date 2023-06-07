import { useEffect, useState } from "react";

import { Card, Col, Row, Typography } from "antd";
import { FaHouseUser, FaTicketAlt, FaUserEdit } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getUserApi } from "../../../redux/Reducers/userAdminReducer";
import { getRoomApi } from "../../../redux/Reducers/roomReducer";
import { getLocationApi } from "../../../redux/Reducers/locationReducer";
import { getBookingApi } from "../../../redux/Reducers/bookingRoomReducer";
import LineChart from "./Chart/ElineChart";
import Echart from "./Chart/Echart";

type Props = {};

export default function DashBoardInfor({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserApi());
    dispatch(getRoomApi());
    dispatch(getLocationApi());
    dispatch(getBookingApi());
  }, []);
  const { arrUser } = useSelector((state: RootState) => state.userAdminReducer);
  const { roomArray } = useSelector((state: RootState) => state.roomReducer);
  const { locationList } = useSelector(
    (state: RootState) => state.locationReducer
  );
  const { roombookingList } = useSelector(
    (state: RootState) => state.bookingReducer
  );
  const arrUserCount = arrUser.length;
  const roomArrayCount = roomArray.length;
  const locationListCount = locationList.length;
  const roombookingListCount = roombookingList.length;

  const { Title, Text } = Typography;

  const dollor = [<FaUserEdit />];
  const profile = [<FaHouseUser />];
  const heart = [<GrMapLocation />];
  const cart = [<FaTicketAlt />];

  const count = [
    {
      today: "Người dùng",
      title: arrUserCount,
      persent: "+10%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "khách sạn",
      title: roomArrayCount,
      persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Vị trí",
      title: locationListCount,
      persent: "+20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "Đặt vé ",
      title: roombookingListCount,
      persent: "+10%",
      icon: cart,
      bnb: "bnb2",
    },
  ];

  return (
    <>
      <div className="layout-content w-full mx-auto  ">
        <Row
          className="mx-4"
          gutter={[24, 0]}
          style={{ marginLeft: "0px", marginTop: "0px" }}
        >
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number bg-sky-50 rounded-2xl w-full h-32 mt-10 pl-1 pr-1 shadow-slate-300 shadow-lg">
                  <Row align="middle" gutter={[24, 0]} className="w-full">
                    <Col xs={18} className="mt-7">
                      <span className="text-neutral-500 text-2xl font-bold ml-5 leading-normal ">
                        {c.today}
                      </span>
                      <Title level={3}>
                        <span className="ml-5 text-2xl"> {c.title} </span>
                        <span className="text-lime-400 ml-2 text-xl">
                          {c.persent}
                        </span>
                      </Title>
                    </Col>
                    <Col xs={6} className="mt-7 ">
                      <div className="icon-box w-14 h-14 rounded-full mx-auto bg-gray-50 relative">
                        <span className="text-4xl absolute top-2 right-2">
                          {c.icon}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={10}
            className="mb-24 bg-sky-50 py-3 shadow-slate-300 shadow-lg ml-0"
          >
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={14}
            className="mb-24 bg-sky-50 py-3 shadow-slate-300 shadow-lg"
          >
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
