import React, { useState } from "react";
import { Space, Input, DatePicker, InputNumber, Checkbox, Button, notification, Upload } from "antd";
import { createTour } from "../../API/index";
import "./CreateTour.css";
import { UploadOutlined } from "@ant-design/icons";

function CreateTour() {
  const [tourData, setTourData] = useState({
    tourName: "",
    price: 0,
    size: 0,
    address: "",
    departureDate: null,
    description: "",
    feature: false,
    image: null // Thêm trường image vào state để lưu trữ file ảnh được chọn
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setTourData({
      ...tourData,
      [key]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("tourName", tourData.tourName);
      formData.append("departureDate", tourData.departureDate ? tourData.departureDate.toISOString() : null);
      formData.append("price", tourData.price);
      formData.append("size", tourData.size);
      formData.append("address", tourData.address);
      formData.append("feature", tourData.feature);
      formData.append("description", tourData.description);
      formData.append("image", tourData.image); // Thêm file ảnh vào formData

      await createTour(formData);
      notification.success({
        message: "Create Tour",
        description: "Tour created successfully!",
      });
      window.location.href = "/tours";
    } catch (error) {
      notification.error({
        message: "Create Tour",
        description: error.response.data.message || "Failed to create tour",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      handleChange("image", file); // Lưu file ảnh vào state khi người dùng chọn
    }
    return false; // Ngăn chặn tải lên mặc định của Ant Design Upload
  };

  return (
    <Space size={20} direction="vertical">
      <h1>Create Tour</h1>
      <div className="form-container">
        <div className="form-row">
          <div className="form-col">
            <label>Tour Name:</label>
            <label>Price:</label>
            <label>Size:</label>
            <label>Address:</label>
            <label>Image:</label>
            <label>Departure Date:</label>
            <label>Description:</label>
            <label>Feature (Yes/No):</label>
          </div>
          <div className="form-col">
            <Input placeholder="Tour Name" value={tourData.tourName} onChange={(e) => handleChange("tourName", e.target.value)} />
            <InputNumber placeholder="Price" value={tourData.price} onChange={(value) => handleChange("price", value)} />
            <InputNumber placeholder="Size" value={tourData.size} onChange={(value) => handleChange("size", value)} />
            <Input placeholder="Address" value={tourData.address} onChange={(e) => handleChange("address", e.target.value)} />
            <Upload
              maxCount={1}
              accept="image/*"
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <DatePicker placeholder="Departure Date" value={tourData.departureDate} onChange={(date) => handleChange("departureDate", date)} />
            <Input.TextArea placeholder="Description" value={tourData.description} onChange={(e) => handleChange("description", e.target.value)} />
            <Checkbox checked={tourData.feature} onChange={(e) => handleChange("feature", e.target.checked)}></Checkbox>
          </div>
        </div>
        <Button type="primary" onClick={handleSubmit} loading={loading}>Submit</Button>
      </div>
    </Space>
  );
}

export default CreateTour;
