import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  Image,
  notification,
} from "antd";
import type { DatePickerProps } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserAPiID,putUseApi } from "../../../redux/Reducers/userAdminReducer";
import { AppDispatch, RootState } from "../../../redux/configStore";



export default function UpdateUser(): JSX.Element {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>("");
  const [sendfile, setSendfile] = useState<string>();
  const [form] = Form.useForm();
  const { Option } = Select;
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    // console.log(moment(date).format("DD/MM/YYYY"));
  };
  const { userUpdate } = useSelector(
    (state: RootState) => state.userAdminReducer
  );
  console.log(userUpdate);

  useEffect(() => {
    dispatch(getUserAPiID(Number(param.id)));
  }, []);

  const onFinish = async (values: any) => {
    // console.log(values);
    values.birthday = values.birthday.format("DD/MM/YYYY");
    // values.id = Number(param.id);
    try {
      if (values) {
        // Post APi
        await dispatch(putUseApi( Number(param.id), values ));
        notification.success({
          message: "Cập nhật người dùng thành công",
        });
        navigate("/admin/dashboard/userAdmin");
      }
    } catch (error) {
      notification.error({
        message: `${error}`,
      });
    }
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

  //

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

  console.log(userUpdate);

  useEffect(() => {
    if (userUpdate) {
      form.setFieldsValue({
        ...userUpdate,
        birthday: moment(userUpdate.birthday, "DD-MM-YYYY"),
      });
    }
  }, [userUpdate]);

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
      <Form.Item
        label="Loại người dùng"
        name="role"
        rules={[{ required: true, message: "Chưa chọn loại người dùng!" }]}
      >
        <Select style={{ width: 120 }} onChange={handleChangeTwo}>
          <Option value="ADMIN">ADMIN</Option>
          <Option value="USER">USER</Option>
        </Select>
      </Form.Item>
      {/* <Form.Item label="Hình ảnh">
        <Input type="file" onChange={hanldeChangeImage} />
        <Image
          src={image}
          style={{ padding: "50px" }}
          alt=""
          onChange={hanldeChangeImage}
        />
      </Form.Item> */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-all duration-300 h-10 shadow-lg shadow-green-300">
          Cập nhật người dùng
        </Button>
      </Form.Item>
    </Form>
  );
}
