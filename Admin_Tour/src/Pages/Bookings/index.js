import { Avatar, Space, Table, Typography, Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import { getAllBooking } from "../../API";

function formatPrice(price) {
  // Sử dụng toLocaleString để định dạng số với dấu chấm làm phân tách hàng nghìn
  return price.toLocaleString('vi-VN') + ' VNĐ';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
}

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getAllBooking()
      .then((data) => {
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      console.log(bookings);
    }
  }, [bookings]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  // Lấy danh sách tour cho trang hiện tại
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Bookings</Typography.Title>
      <Table
        loading={loading}
        dataSource={paginatedBookings} // Sử dụng danh sách tour đã phân trang
        columns={[
          {
            title: "Full Name",
            dataIndex: "fullName",
          },
          {
            title: "Tour Name",
            dataIndex: "tourName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone Number",
            dataIndex: "phone",
          },
          {
            title: "Departure Date",
            dataIndex: "departureDate",
            render: (value) => formatDate(value),
          },
          {
            title: "Date Create",
            dataIndex: "dateCreate",
            render: (value) => formatDate(value),
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total Amount",
            dataIndex: "totalAmount",
            render: (value) => formatPrice(value),
          },
        ]}
        pagination={false}
      />
      {<Pagination
        current={currentPage}
        pageSize={pageSize}
        total={bookings.length} // Tổng số tour
        onChange={handlePageChange}
      />}
    </Space>
  );
}

export default Bookings;
