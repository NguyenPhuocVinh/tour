import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {getAllTour,getAllUser,getAllBooking } from "../../API/index";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Tours from "../Tours/Tours";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [bookings, setBookings] = useState(0);
  const [allTours, setAllTour] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    getAllTour().then((res) => {
      setAllTour(res.tours.length);
    });
    getAllBooking().then((res) => {
      setBookings(res.bookings.length);
    });
    getAllUser().then((res) => {
      setUsers(res.users.length);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Bookings"}
          value={bookings}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tours"}
          value={allTours}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Users"}
          value={users}
        />
      </Space>
      <Space>
        
        <DashboardChart />
        <DashboardChart2/>
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}


function DashboardChart() {
  const [bookings, setBookings] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getAllBooking().then((res) => {
      console.log(res);
      const labels = res.bookings.map((booking) => booking.fullName);
      const data = res.bookings.map((booking) => booking.totalAmount);

      setBookings({
        labels: labels,
        datasets: [
          {
            label: "Booking Revenue",
            data: data,
            backgroundColor: "rgba(0,123,255,0.5)",
          },
        ],
      });
    }).catch(error => {
      console.error("Error while fetching bookings:", error);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Booking Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={bookings} />
    </Card>
  );
}



function DashboardChart2() {
  const [bookings, setBookings] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getAllBooking().then((res) => {
      console.log(res);
      const labels = res.bookings.map((booking) => booking.tourName);
      const data = res.bookings.map((booking) => booking.totalAmount);

      setBookings({
        labels: labels,
        datasets: [
          {
            label: "Booking Revenue",
            data: data,
            backgroundColor: "rgba(0,123,255,0.5)",
          },
        ],
      });
    }).catch(error => {
      console.error("Error while fetching bookings:", error);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Booking Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={bookings} />
    </Card>
  );
}
export default Dashboard;
