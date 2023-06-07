import { Button, Form, Input, Image, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { useNavigate, useParams } from "react-router-dom";
import { getlocationApiID, putlocationApi } from "../../../redux/Reducers/locationReducer";

export default function UpdateLocation(): JSX.Element {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>("");
  //   const [sendfile, setSendfile] = useState<string>();
  useEffect(() => {
    dispatch(getlocationApiID(Number(params.id)));
  }, [params.id]);
  const { locationPut} = useSelector(
    (state: RootState) => state.locationReducer
  );

  useEffect(() => {
    if (locationPut !=null) {
      form.setFieldsValue({
        ...locationPut,
        // hinhAnh: setImage(locationPut.hinhAnh),
      });
    }
  }, [locationPut]);


  const onFinish = async (values: any) => {
    values.id = 0;
    values.hinhAnh = image;
    if (values) {
      await dispatch(putlocationApi( Number(params.id), values ));
      notification.success({
        message: "Cập nhật vị trí thành công",
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
      //   setSendfile(file);
    };
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
        label="Địa danh"
        name="tenViTri"
        rules={[{ required: true, message: "Chưa nhập tên!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tỉnh Thành"
        name="tinhThanh"
        rules={[{ required: true, message: "Chưa nhập mật khẩu!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Quốc Gia"
        name="quocGia"
        rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input type="file" name="hinhAnh" onChange={hanldeChangeImage} />
        <Image
          src={image}
          style={{ padding: "50px" }}
          alt="pic"
          onChange={hanldeChangeImage}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-all duration-300 h-10 shadow-lg shadow-green-300">
          Cập nhật vị trí 
        </Button>
      </Form.Item>
    </Form>
  );
}
