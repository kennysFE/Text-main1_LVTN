import { DatePicker, Space } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import React from "react";

type Props = {
  dateFormat: any;
  onChange:any
};
const { RangePicker } = DatePicker;
export default function DetailCheckInCheckOut({onChange,dateFormat}: Props) {

    return (
    <Space direction="vertical" style={{ width: "100%"}}>
      <RangePicker
        style={{ width: "100%", border: "1px solid #ccc" }}
        format={dateFormat}
        locale={locale}
        onChange={onChange}
        placeholder={[ `NGÀY NHẬN PHÒNG`, "NGÀY TRẢ PHÒNG"]}
      />
    </Space>
  );
}
