import {
    Button,
    Form,
    Input,
    DatePicker,
    Select,
    notification
  } from "antd";
  import type { DatePickerProps } from "antd";
  import React, { useState } from "react";
  import moment from "moment";
  import { useDispatch } from "react-redux";
  import { AppDispatch } from "../../../redux/configStore";
  import { useNavigate } from "react-router-dom";
  import {
    createUserApi,
  } from "../../../redux/Reducers/userAdminReducer";
  
  type SizeType = Parameters<typeof Form>[0]['size'];
  
  export default function CreateUser(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [image, setImage] = useState<string>("");
    const [sendfile, setSendfile] = useState<string>();
    const [form] = Form.useForm();
    const formData = new FormData();
    const { Option } = Select;
    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
      console.log(moment(date).format("DD/MM/YYYY"));
    };
  
    const onFinish = async (values: any) => {
      values.birthday = values.birthday.format("DD/MM/YYYY");
      if (values) {
        await dispatch(createUserApi(values));
        notification.success({
          message: "Thêm người dùng thành công",
        });
      }
      navigate("/admin/dashboard/userAdmin");
    };
  
  
    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const handleChangeOne = (value: string) => {
      console.log(`selected ${value}`);
    };
    const handleChangeTwo = (value: string) => {
      console.log(`selected ${value}`);
    };
  
  
    const hanldeChangeImage = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        setImage(event.target.result);
        setSendfile(file);
      };
    };
  
  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
  
    let allowedDateFormats = [
      "DD/MM/YYYY",
      "D/M/YYYY",
      "DD.MM.YYYY",
      "D.M.YYYY",
      "DD. MM. YYYY",
      "D. M. YYYY",
      "DD-MM-YYYY",
    ];
  
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          name: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          avatar: "",
          gender: false,
          role: true,
          
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        // style={{fontSize:'30px'}}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Chưa nhập tên!" }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Chưa nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Chưa nhập email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[{ required: true, message: "Chưa nhập ngày sinh!" }]}
        >
          <DatePicker onChange={onChange} format={allowedDateFormats} />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Chưa chọn giới tính!" }]}
          hasFeedback validateStatus="success"
        >
          <Select style={{ width: 120 }} onChange={handleChangeOne}>
            <Option value="true">Nam</Option>
            <Option value="false">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Loại người dùng"
          name="role"
          rules={[{ required: true, message: "Chưa chọn loại người dùng!" }]}
        >
          <Select style={{ width: 120 }} onChange={handleChangeTwo}>
            <Option value="ADMIN">Admin</Option>
            <Option value="USER">User</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <Input type="file" onChange={hanldeChangeImage} />
          {/* <Image
            src={image}
            style={{ padding: "50px" }}
            alt="pic"
            onChange={hanldeChangeImage}
          /> */}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-all duration-300 h-10 shadow-lg shadow-green-300" >
            Thêm người dùng 
          </Button>
        </Form.Item>
      </Form>
    );
  }
  