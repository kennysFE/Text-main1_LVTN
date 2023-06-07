import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import { ApexOptions } from "apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/configStore";
import { useEffect } from "react";
import { getBookingApi } from "../../../../redux/Reducers/bookingRoomReducer";

type Props = {};

export default function Echart({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBookingApi());
  }, []);

  const { roombookingList } = useSelector(
    (state: RootState) => state.bookingReducer
  );
  const roombookingListCount = roombookingList.length;
  const { Title, Paragraph } = Typography;

  const options: ApexOptions = {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },

    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      labels: {
        // show: true,
        // align: "right",
        // minWidth: 0,
        // maxWidth: 160,
        style: {
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
    },

    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
            "#Aab1c1",
          ],
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + " đơn đặt phòng";
        },
      },
    },
  };

  const eChart = {
    series: [
      {
        name: "Tổng số",
        data: [100, 201, 100, 80, 150, 250, 90, 150, roombookingListCount],
        color: "#8c8c8c",
      },
    ],
  };



  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Số lượng đặt phòng</Title>
        <Paragraph className="lastmonth">
          Hơn tháng trước <span className="text-lime-400">+10%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Đồ thị chỉ mang tính chất tham khảo dựa trên số lượng đặt phòng mới
          nhất của người dùng
        </Paragraph>
        <Row>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
