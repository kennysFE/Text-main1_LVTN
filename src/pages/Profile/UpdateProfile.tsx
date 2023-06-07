import React, { useEffect } from "react";
import { Button, Form, Input, DatePicker, Select, notification } from "antd";
import type { DatePickerProps } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { putUseProfileApi } from "../../redux/Reducers/userReducer";
import { AppDispatch, RootState } from "../../redux/configStore";
import "./UpdateProfile.scss";

export default function UpdateProfile(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { Option } = Select;

  
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    // console.log(moment(date).format("DD/MM/YYYY"));
  };
  const { userProfile } = useSelector((state: RootState) => state.userReducer);

  const onFinish = async (values: any) => {
    try {
      if (values) {
        // Post APi
        await dispatch(putUseProfileApi(userProfile.id, values));
        notification.success({
          message: "Cập nhật người dùng thành công",
        });
      }
    } catch (error) {
      notification.error({
        message: `${error}`,
      });
    }
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log("Failed:", errorInfo);
  };
  const handleChangeOne = (value: string) => {
    console.log(`selected ${value}`);
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

  useEffect(() => {
    if (userProfile) {
      form.setFieldsValue({
        ...userProfile,
        birthday: moment(userProfile.birthday, "DD-MM-YYYY"),
      });
    }
  }, [userProfile]);

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
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        name: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        avatar: "",
        gender: false,
        role: "",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Họ và tên"
        name="name"
        rules={[{ required: true, message: "Chưa nhập tên!" }]}
      >
        <Input />
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
        {/* <Input /> */}
      </Form.Item>
      <Form.Item
        label="Giới tính"
        name="gender"
        rules={[{ required: true, message: "Chưa chọn giới tính!" }]}
      >
        <Select style={{ width: 120 }} onChange={handleChangeOne}>
          <Option value={true}>Nam</Option>
          <Option value={false}>Nữ</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="Button_one">
          Thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
}
