import { Avatar, Space, Table, Typography, Button, Pagination, notification } from "antd";
import { useEffect, useState } from "react";
import { getAllTour, deleteTour } from "../../API";

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

function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4); // Số lượng tour trên mỗi trang
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);

    getAllTour()
      .then((data) => {
        setTours(data.tours);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (tours.length > 0) {
      console.log(tours);
    }
  }, [tours]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleAddButtonClick = () => {
    window.location.href = "/add-tour";
  };

  const handleEditTour = (_id) => {
    if (_id) {
      window.location.href = `/update-tour/${_id}`; // Truyền _id qua URL
    } else {
      console.error("ID is undefined");
    }
  }

  const handleDeleteTour = (_id) => {
    deleteTour(_id)
      .then((data) => {
        notification.success({
          message: "Delete Tour",
          description: data.message,
        });
        setTours(tours.filter((tour) => tour._id !== _id));
      })
      .catch((error) => {
        notification.error({
          message: "Delete Tour",
          description: error.message,
        });
      });
  }

  const toggleDescriptionExpansion = (_id) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [_id]: !prevState[_id]
    }));
  }

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Tours</Typography.Title>
      <Button type="primary" onClick={handleAddButtonClick}>
        Add
      </Button>
      <Table
        loading={loading}
        dataSource={tours.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        columns={[
          {
            title: "Tour Image",
            dataIndex: "imagePath",
            // render: (link) => <img src={`http://localhost:4000/${link}`} style={{ maxWidth: '200px' }} />,
            render: (link) => <img src={link} style={{ maxWidth: '200px' }} />,
          },
          {
            title: "Tour Name",
            dataIndex: "tourName",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => formatPrice(value),
          },
          {
            title: "Size",
            dataIndex: "size",
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "Departure Date",
            dataIndex: "departureDate",
            render: (value) => formatDate(value),
          },
          {
            title: "Description",
            dataIndex: "description",
            render: (text, record) => (
              <span>
                {expandedDescriptions[record._id] ? text : `${text.slice(0, 100)}...`}
                <Button type="link" onClick={() => toggleDescriptionExpansion(record._id)}>
                  {expandedDescriptions[record._id] ? 'Thu gọn' : 'Xem thêm'}
                </Button>
              </span>
            ),
          },
          {
            title: "Feature",
            dataIndex: "feature",
            render: (value) => <span>{value ? "Yes" : "No"}</span>,
          },
          {
            title: "Action",
            render: (value, record) => (
              <Space>
                <Button type="primary" onClick={() => handleEditTour(record._id)}>
                  Edit
                </Button>
                <Button type="danger" onClick={() => handleDeleteTour(record._id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={tours.length}
        onChange={handlePageChange}
      />
    </Space>
  );
}

export default Tours;
