import { Table, Space } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getBookingApi, deleteRoomBookingApi } from "../../../redux/Reducers/bookingRoomReducer"
import Search from "antd/lib/input/Search";

export default function BookingManagement(): JSX.Element {

  const [searchState, setSearchState] = useState<DataType[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { roombookingList } = useSelector(
    (state: RootState) => state.bookingReducer
  );
  useEffect(() => {
    dispatch(getBookingApi());
  }, []);

  const navigate = useNavigate();


  interface DataType {
    key: React.Key;
    id: number;
    maPhong: number;
    ngayDen: string;
    ngayDi: string;
    soLuongKhach: number;
    maNguoiDung: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: "5%",
    },
    {
      title: "Mã Phòng",
      dataIndex: "maPhong",
      width: "5%",
      sortDirections: ["descend"],
    },
    {
      title: "Ngày Đến",
      dataIndex: "ngayDen",
      width: "10%",
    },
    {
      title: "Ngày Đi",
      dataIndex: "ngayDi",
      width: "10%",
    },
    {
      title: "Số lượng khách",
      dataIndex: "soLuongKhach",
      width: "5%",
      defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Mã người dùng ",
      dataIndex: "maNguoiDung",
      width: "5%",
      defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Tương tác",
      dataIndex: "tuongTac",
      width: "5%",
      render: (id: number, name) => {
        return (
          <div className="flex justify-center text-white">
            <span
              onClick={() => {
                navigate(`updatebooking/${id}`);
              }}
              className="inline-block py-1 px-2 bg-green-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-600 mx-2 shadow-lg shadow-green-300"
            >
              Thay đổi
            </span>
            <span
              onClick={async () => {
                await dispatch(deleteRoomBookingApi(id));
                dispatch(getBookingApi())
              }}
              className="inline-block py-1 px-2 bg-red-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-600 shadow-lg shadow-red-300 "
            >
              Xóa
            </span>
          </div>
        );
      },
    },
  ];

  const data = roombookingList?.map((ele, index) => {
    return {
      key: index + 1,
      id: ele.id,
      maPhong: ele.maPhong,
      ngayDen: ele.ngayDen,
      ngayDi: ele.ngayDi,
      soLuongKhach: ele.soLuongKhach,
      maNguoiDung: ele.maNguoiDung,
      tuongTac: ele.id,
    };
  });

  const onSearch = (value: string) => {
    let newValue=Number(value);
    let searchData = data.filter((ele) => {
       return ele.maPhong === newValue;
    });
    console.log(searchData);

    setSearchState(searchData);
  };

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Space
        style={{ width: "100%" }}
        direction="vertical"
        className="w-100 py-3"
      >
        <Search
          placeholder="Nhập mã phòng cần tìm kiếm "
          onSearch={onSearch}
          enterButton
          allowClear
        />
      </Space>
      <Table columns={columns} dataSource={searchState.length > 0 ? searchState : data} onChange={onChange} />
    </>
  );
}
