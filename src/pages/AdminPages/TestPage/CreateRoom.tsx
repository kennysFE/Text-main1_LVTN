import {
  Button,
  Form,
  Input,
  Switch,
  Image,
  notification,
  InputNumber,
} from "antd";
// import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { CheckOutlined,CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/configStore";
import { useNavigate } from "react-router-dom";
import { createRoomApi } from "../../../redux/Reducers/roomReducer";

export default function CreateRoom(): JSX.Element {
  // const { userLogin } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>("");
  //
  const onFinish = async (values: any) => {
    values.id = 0;
    values.hinhAnh = image;
    console.log(values);
    if (values) {
      await dispatch(createRoomApi(values));
      console.log(values);
      notification.success({
        message: "Thêm thông tin phòng thành công",
      });
    }
    navigate("/admin/dashboard/roomAdmin");
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
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Mã vị trí"
        name="maViTri"
        rules={[{ required: true, message: "Chưa nhập mã vị trí" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên phòng"
        name="tenPhong"
        rules={[{ required: true, message: "Chưa nhập tên phòng" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hành khách thuê"
        name="khach"
        rules={[{ required: true, message: "Chưa nhập hành khách ở thuê" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Phòng Ngủ"
        name="phongNgu"
        rules={[{ required: true, message: "Chưa nhập số phòng ngủ" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Giường"
        name="giuong"
        rules={[{ required: true, message: "Chưa nhập số giường" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Phòng Tắm"
        name="phongTam"
        rules={[{ required: true, message: "Chưa nhập số phòng tắm" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="moTa"
        rules={[{ required: true, message: "Chưa nhập mô tả!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Giá Tiền"
        name="giaTien"
        rules={[{ required: true, message: "Chưa nhập giá tiền!" }]}
      >
        <Input />
      </Form.Item >
      <div className="flex justify-start ml-28 ">
        <div className="mr-24"> 
        <Form.Item label="Máy giặt" name="mayGiat" valuePropName="checked" labelCol={{ span: 16 }} >
        <Switch className="fix_icon" 
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item label="Bàn Là" name="banLa" valuePropName="checked" labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item label="Ti Vi" name="tivi" valuePropName="checked" labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item label="Điều hòa" name="dieuHoa" valuePropName="checked" labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item> 
        <Form.Item label="Wifi" name="wifi" valuePropName="checked" labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      </div>
        <div>
      <Form.Item label="Bếp" name="bep" valuePropName="checked" labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item label="Đỗ xe" name="doXe" valuePropName="checked" labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item label="Hồ bơi" name="hoBoi" valuePropName="checked" labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item label="Bàn ủi" name="banUi" valuePropName="checked"labelCol={{ span: 16 }}>
         <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
        </div>
      </div>
      <Form.Item label="Hình ảnh">
        <Input type="file" name="hinhAnh" onChange={hanldeChangeImage} />
        <Image
          src={image}
          style={{ padding: "20px" }}
          alt="Hinh Anh "
          onChange={hanldeChangeImage}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-all duration-300 h-10 shadow-lg shadow-green-300">
          Thêm phòng mới 
        </Button>
      </Form.Item>
    </Form>
  );
}
