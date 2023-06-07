import { Button, Form, Input, Image, notification } from "antd";
import type { DatePickerProps } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { createLocationApi } from "../../../redux/Reducers/locationReducer";
import { useNavigate } from "react-router-dom";

export default function CreateLocation(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>("");
//   const [sendfile, setSendfile] = useState<string>();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(moment(date).format("DD/MM/YYYY"));
  };

  const onFinish = async (values: any) => {
    values.id = 0;
    values.hinhAnh = image;
    console.log(values);
    if(values){
      await dispatch(createLocationApi(values))
      notification.success({
        message: "Thêm vị trí thành công",
      });
    }
    navigate("/admin/dashboard/locationAdmin");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const hanldeChangeImage = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImage(event.target.result);
      // setSendfile(file);
    };
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Địa danh"
        name="tenViTri"
        rules={[{ required: true, message: "Chưa nhập địa danh!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tỉnh Thành"
        name="tinhThanh"
        rules={[{ required: true, message: "Chưa nhập tỉnh thành " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Quốc Gia"
        name="quocGia"
        rules={[{ required: true, message: "Chưa nhập quốc gia" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={hanldeChangeImage} />
        <Image
          src={image}
          style={{ padding: "20px" }}
          alt="Hinh Anh"
          onChange={hanldeChangeImage}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-all duration-300 h-10 shadow-lg shadow-green-300">
          Thêm vị trí 
        </Button>
      </Form.Item>
    </Form>
  );
}
