import { Table, Input, Space } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore"
import { deleteCommentApi, getCommentApi } from "../../../redux/Reducers/commentReducer";


export default function CommentManagement(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const [searchState, setSearchState] = useState<DataType[]>([]);

  useEffect(() => {
    dispatch(getCommentApi());
  }, []);

  const { commentList } = useSelector(
    (state: RootState) => state.commentReducer
  );

  const navigate = useNavigate();

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const { Search } = Input;

  interface DataType {
    key: React.Key;
    id: number;
    maPhong: number;
    maNguoiBinhLuan: number;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: "1%",
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      width: "3%",
      sortDirections: ["descend"],
    },
    {
      title: "Mã người bình luận",
      dataIndex: "maNguoiBinhLuan",
      width: "7%",
    },
    {
      title: "Ngày Bình Luận ",
      dataIndex: "ngayBinhLuan",
      width: "5%",
    },
    {
      title: "Nội dung",
      dataIndex: "noiDung",
      width: "5%",
      defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Đánh giá ",
      dataIndex: "saoBinhLuan",
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
            <span onClick={async () => {
              await dispatch(deleteCommentApi(id));
              dispatch(getCommentApi())
            }
            }  
            className="inline-block py-1 px-2 bg-red-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-600 shadow-lg shadow-red-300">
                Xóa Bình luận </span>
          </div>
        )
      },
    },
  ];

  const data = commentList?.map((ele, index) => {
    return {
      key: index + 1,
      id: ele.id,
      maPhong: ele.maPhong,
      maNguoiBinhLuan: ele.maNguoiBinhLuan,
      ngayBinhLuan: ele.ngayBinhLuan,
      noiDung: ele.noiDung,
      saoBinhLuan: ele.saoBinhLuan,
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
          Thêm phòng
        </Button> */}
        <Search
          placeholder="Nhập tên phòng cần tìm"
          onSearch={onSearch}
          enterButton
          allowClear
        />
      </Space>
      <Table
        columns={columns}
        dataSource={searchState.length > 0 ? searchState : data}
        onChange={onChange}
      />
    </>
  );
}
