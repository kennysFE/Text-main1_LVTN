import React, { Fragment, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import {
  BsFillDoorOpenFill,
  BsHouseDoor,
  BsFillPersonLinesFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineKeyboardArrowRight, MdShareLocation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../utils/setting";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getUserProfileAPi } from "../../../redux/Reducers/userReducer";
import { AiFillSignal } from "react-icons/ai";

type Props = {};

export default function DashBoard({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const { userProfile } = useSelector((state: RootState) => state.userReducer);
  console.log(userProfile);

  useEffect(() => {
    dispatch(getUserProfileAPi());
  }, []);
  // const { user } = JSON.parse(localStorage.getItem(USER_LOGIN))

  const onClick = (e: { key: any }) => {
    switch (e.key) {
      case "1":
        {
          navigate("userAdmin");
        }
        break;
      case "2":
        {
          navigate("userAdmin/createuser");
        }
        break;
      case "5":
        {
          navigate("locationAdmin");
        }
        break;
      case "6":
        {
          navigate("locationAdmin/createlocation");
        }
        break;
      case "9":
        {
          navigate("roomAdmin");
        }
        break;
      case "10":
        {
          navigate("roomAdmin/createroom");
        }
        break;
      case "11":
        {
          navigate("bookingAdmin");
        }
        break;
      case "12":
        {
          navigate("chat");
        }
        break;
      case "13":
        {
          navigate("DashBoardInfor");
        }
        break;
      case "14":
        {
          navigate("commentAdmin");
        }
        break;

      default:
        break;
    }
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() => navigate("/")}
              className="flex items-center text-base p-2"
            >
              <span>Quay lại trang chủ</span>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESS_TOKEN);
                navigate("/");
                window.location.reload();
              }}
              className="flex items-center text-base p-2"
            >
              <span>Đăng xuất</span>
            </div>
          ),
        },
      ]}
    />
  );
  const items: MenuItem[] = [
    getItem("Tổng quan", "Sub0", <AiFillSignal />, [
      getItem("Thông tin tổng quan", "13"),
    ]),
    getItem("Quản lí người dùng", "sub1", <FiUser />, [
      getItem("Danh sách người dùng", "1"),
      getItem("Them người dùng", "2"),
      getItem("Danh sách bình luận", "14"),
    ]),
    getItem("Quản lí vị trí", "sub2", <MdShareLocation />, [
      getItem("Danh sách vị trí", "5"),
      getItem("Thêm vị trí", "6"),
    ]),
    getItem("Quản lí phòng", "sub3", <BsHouseDoor />, [
      getItem("Danh sách phòng", "9"),
      getItem("Thêm phòng", "10"),
    ]),
    getItem("Quản lí đặt phòng ", "sub4", <BsFillPersonLinesFill />, [
      getItem("Danh sách đặt phòng", "11"),
    ]),
    getItem("Tương tác người dùng ", "12", <BsFillChatDotsFill />),
  ];
  // const userRole = JSON.parse(localStorage.getItem(USER_LOGIN)).user.role

  return (
    <div className="grid grid-cols-12 admin ">
      <div className="xl:col-span-2  md:col-span-3 ">
        <div className="h-full admin_slidebar">
          <div
            className="h-20 px-5 py-4 flex items-center "
            style={{ boxShadow: " 0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            {/* <div className="h-12 w-12 rounded-xl overflow-hidden">
              <img
                className="h-full w-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-0CXiCSzYB7Qls6acs-5VZHEewRNH3DUyA&usqp=CAU"
                alt=""
              />
            </div> */}
            <span className="text-xl font-semibold ml-1  text-rose-400">
              Admin UTHBooking
            </span>
          </div>
          <div className="mt-10">
            <Menu
              onClick={onClick}
              style={{}}
              defaultSelectedKeys={["13"]}
              defaultOpenKeys={["sub0"]}
              mode="inline"
              items={items}
            />
          </div>
        </div>
      </div>
      <div className="xl:col-span-10 md:col-span-9 ">
        <div>
          <div
            className="h-20 px-8  flex items-center justify-between"
            style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <div>
              <span>
                <FaBars className="text-3xl" />
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-base font-medium mr-5">{`Hello ${userProfile?.name}`}</p>
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                  <img
                    className="h-full w-full"
                    src={
                      userProfile?.avatar ||
                      "https://images.pexels.com/photos/13691873/pexels-photo-13691873.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    }
                    alt="..."
                  />
                </div>
              </Dropdown>
              <span>
                <IoMdArrowDropdown className="text-2xl" />
              </span>
            </div>
          </div>
          <div className=" px-8 mt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
