import { Table, Space } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getLocationApi } from "../../../redux/Reducers/locationReducer";
import { deletelocationApi } from "../../../redux/Reducers/locationReducer";

export default function LocationManagement(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { locationList } = useSelector(
    (state: RootState) => state.locationReducer
  );
  console.log("Danh sách vị trí ", locationList);

  useEffect(() => {
    dispatch(getLocationApi());
  }, []);

  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        navigate("createlocation");
        return newLoadings;
      });
    }, 1000);
  };
  // const { Search } = Input;
  // const onSearch = (value: string) => console.log(value);
  interface DataType {
    key: React.Key;
    id: number;
    tenViTri: string | undefined;
    tinhThanh: string | undefined;
    quocGia: string | undefined;
    hinhAnh: string | undefined;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: "5%",
    },
    {
      title: "Địa danh",
      dataIndex: "tenViTri",
      width: "10%",
      //   filters: [
      //     {
      //       text: "Joe",
      //       value: "Joe",
      //     },
      //     {
      //       text: "Jim",
      //       value: "Jim",
      //     },
      //   ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      //   onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Tỉnh Thành",
      dataIndex: "tinhThanh",
      width: "8%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: "10%",
      render: (text: string) => {
        return <img src={text} style={{ width: 70, height: 50 }} />;
      },
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
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
                navigate(`updatelocation/${id}`);
              }}
              className="inline-block py-1 px-2 bg-green-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-600 mx-2 shadow-lg shadow-green-300"
            >
              Xem & Sửa
            </span>
            <span
              onClick={async () => {
                await dispatch(deletelocationApi(id));
                dispatch(getLocationApi())
              }}
              className="inline-block py-1 px-2 bg-red-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-600 shadow-lg shadow-red-300"
            >
              Xóa
            </span>
          </div>
        );
      },
    },
  ];

  const data = locationList?.map((ele, index) => {
    return {
      key: index + 1,
      id: ele.id,
      tenViTri: ele.tenViTri,
      tinhThanh: ele.tinhThanh,
      quocGia: ele.quocGia,
      hinhAnh: ele.hinhAnh,
      tuongTac: ele.id,
    };
  });

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Space
        style={{ width: "100%" }}
        direction="vertical"
        className="w-100 py-3"
      >
        {/* <Button
          type="primary"
          loading={loadings[0]}
          onClick={() => enterLoading(0)}
        >
          Thêm vị trí
        </Button> */}
        {/* <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        /> */}
      </Space>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}
