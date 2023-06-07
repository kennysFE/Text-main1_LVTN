import {
  Button,
  Form,
  Input,
  DatePicker,
  notification,
  InputNumber,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  getRoomBookingApiID,
  putRoomBookingApi,
} from "../../../redux/Reducers/bookingRoomReducer";

export default function UpdateBooking(): JSX.Element {
  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { roombookingPut } = useSelector(
    (state: RootState) => state.bookingReducer
  );
  console.log(roombookingPut);

  useEffect(() => {
    dispatch(getRoomBookingApiID(Number(params.id)));
  }, []);
  useEffect(() => {
    if (roombookingPut) {
      form.setFieldsValue({
        ...roombookingPut,
        ngayDen: moment(roombookingPut.ngayDen),
        ngayDi: moment(roombookingPut.ngayDi),
      });
    }
  }, [roombookingPut]);

  const onFinish = async (values: any) => {
    // values.id = 0;
    if (values) {
      await dispatch(putRoomBookingApi(Number(params.id), values));
      notification.success({
        message: "Cập nhật đặt phòng thành công",
      });
    }
    navigate("/admin/dashboard/bookingAdmin");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Mã phòng"
        name="maPhong"
        rules={[{ required: true, message: "Chưa mã phòng!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ngày Đến"
        name="ngayDen"
        rules={[{ required: true, message: "Chưa nhập ngày đến " }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Ngày đi"
        name="ngayDi"
        rules={[{ required: true, message: "Chưa nhập ngày bắt đầu" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Số lượng khách"
        name="soLuongKhach"
        rules={[{ required: true, message: "Chưa nhập số lượng khách" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Mã người dùng"
        name="maNguoiDung"
        rules={[{ required: true, message: "Chưa nhập mã người dùng" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-all duration-300 h-10 shadow-lg shadow-green-300"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
