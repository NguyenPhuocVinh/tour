import React, { useState, useEffect } from "react";
import { Space, Input, DatePicker, InputNumber, Checkbox, Button, notification, Upload } from "antd";
import { getSingleTour, updateTour } from "../../API/index";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";

function UpdateTour() {
  const currentPath = window.location.pathname;
  const paths = currentPath.split("/");
  const tourid = paths[paths.length - 1];

  const [tourData, setTourData] = useState({
    tourName: "",
    price: 0,
    size: 0,
    address: "",
    departureDate: null,
    description: "",
    feature: false,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const data = await getSingleTour(tourid);
        setTourData({
          ...data.tour,
          departureDate: data.tour.departureDate ? moment(data.tour.departureDate) : null
        });
      } catch (error) {
        console.error("Failed to fetch tour data:", error);
      }
    };
  
    fetchTourData();
  }, [tourid]);

  const handleChange = (key, value) => {
    setTourData({
      ...tourData,
      [key]: value && value._isValid ? value : value && value.target ? value.target.value : value
    });
  };

  const handleUpload = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      handleChange("image", file);
    }
    return false;
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
      formData.append("image", tourData.image);

      await updateTour(tourid, formData);
      notification.success({
        message: "Update Tour",
        description: "Tour updated successfully!",
      });
      window.location.href = "/tours";
    } catch (error) {
      notification.error({
        message: "Update Tour",
        description: error.response.data.message || "Failed to update tour",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space size={20} direction="vertical">
      <h1>Update Tour</h1>
      <div className="form-container">
        <div className="form-row">
          <div className="form-col">
            <label>Tour Name:</label>
            <label>Price:</label>
            <label>Size:</label>
            <label>Address:</label>
            <label>Departure Date:</label>
            <label>Description:</label>
            <label>Feature (Yes/No):</label>
            <label>Image:</label>
          </div>
          <div className="form-col">
            <Input placeholder="Tour Name" value={tourData.tourName} onChange={(e) => handleChange("tourName", e.target.value)} />
            <InputNumber placeholder="Price" value={tourData.price} onChange={(value) => handleChange("price", value)} />
            <InputNumber placeholder="Size" value={tourData.size} onChange={(value) => handleChange("size", value)} />
            <Input placeholder="Address" value={tourData.address} onChange={(e) => handleChange("address", e.target.value)} />
            <DatePicker placeholder="Departure Date" value={tourData.departureDate} onChange={(date) => handleChange("departureDate", date)} />
            <Input.TextArea placeholder="Description" value={tourData.description} onChange={(e) => handleChange("description", e.target.value)} />
            <Checkbox checked={tourData.feature} onChange={(e) => handleChange("feature", e.target.checked)}></Checkbox>
            <Upload
              maxCount={1}
              accept="image/*"
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <img src={tourData.imagePath} alt="Tour" style={{ maxWidth: '200px' }} />
              {tourData.image && <img src={URL.createObjectURL(tourData.image)} alt="Tour" style={{ maxWidth: '200px' }} />}
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        </div>
        <Button type="primary" onClick={handleSubmit} loading={loading}>Submit</Button>
      </div>
    </Space>
  );
}

export default UpdateTour;
