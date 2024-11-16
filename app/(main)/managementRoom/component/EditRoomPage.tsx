"use client";
import React, { useState } from "react";
import { Form, Input, Button, Switch, UploadFile } from "antd";
import RoomImageUpload from "./UploadImages";
import RoomInfoForm from "./RoomInfoEdit";
import RoomUtilityForm from "./RoomUtilities";
import PricingDetailsForm from "./PricingDetails";


interface RoomFormProps {
  roomData?: RoomFinal;
  onSubmit: (data: RoomFinal) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ roomData, onSubmit }) => {
  const [form] = Form.useForm();

  const handleImagesChange = (images: UploadFile[]) => {
    form.setFieldsValue({
      roomImages: images.map((file) => ({
        name: file.name,
        urlImagePost: file.url || file.response?.url,
        type: file.type,
      })),
    });
  };

  const handleRoomInfoChange = (updatedRoomInfo: RoomInfo) => {
    // Cập nhật lại giá trị roomInfo khi có thay đổi
    form.setFieldsValue({ roomInfo: updatedRoomInfo });
    console.log("Updated roomInfo:", form.getFieldsValue());
  };
// Initialize pricing details state
const [pricingDetails, setPricingDetails] = useState(roomData?.pricingDetails || {
  basePrice: 0,
  electricityCost: 0,
  waterCost: 0,
  additionalFees: [],
});

// Handler to update pricing details
const handlePricingDetailsChange = (updatedPricingDetails: PricingDetails) => {
  setPricingDetails(updatedPricingDetails);
};
  const handleFinish = (values: RoomFinal) => {
    const submissionValues = { ...values };
    const formatDate = (date: string | null | undefined): string => {
      if (!date) return "";
      return new Date(date).toISOString();
    };
    submissionValues.id = roomData?.id || "";
    submissionValues.roomId = roomData?.roomId || "";
    submissionValues.roomInfo = values.roomInfo ?? {
      name: roomData?.roomInfo.name || "",
      description: roomData?.roomInfo.description || "",
      address: roomData?.roomInfo.address || "",
      type: roomData?.roomInfo.type || "",
      style: roomData?.roomInfo.style || "",
      floor: roomData?.roomInfo.floor || "",
      width: roomData?.roomInfo.width || 0,
      height: roomData?.roomInfo.height || 0,
      totalArea: roomData?.roomInfo.totalArea || 0,
      capacity: roomData?.roomInfo.capacity || 0,
      numberOfBedrooms: roomData?.roomInfo.numberOfBedrooms || 0,
      numberOfBathrooms: roomData?.roomInfo.numberOfBathrooms || 0,
      availableFromDate: formatDate(roomData?.roomInfo.availableFromDate),
    };
    submissionValues.pricingDetails = roomData?.pricingDetails ?? {
      basePrice: 0,
      electricityCost: 0,
      waterCost: 0,
      additionalFees: [],
    };
    submissionValues.availableFromDate = formatDate(
      roomData?.availableFromDate
    );

    submissionValues.status = roomData?.status || "";

    submissionValues.roomUtility = roomData?.roomUtility ?? {
      furnitureAvailability: {},
      amenitiesAvailability: {},
    };
    console.log("Form values:", submissionValues);
    onSubmit(submissionValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={roomData}
    >
      {/* Title */}
      <Form.Item label="Title" name="title">
        <Input placeholder={roomData?.title || "Enter room title"} />
      </Form.Item>

      {/* Description */}
      <Form.Item label="Description" name="description">
        <Input.TextArea
          placeholder={roomData?.description || "Enter room description"}
        />
      </Form.Item>

      {/* Room Info - Using RoomInfoForm */}
      <RoomInfoForm
        roomInfo={roomData?.roomInfo}
        onChange={handleRoomInfoChange}
      />

      {/* Room Utility */}

      <RoomUtilityForm roomUtility={roomData?.roomUtility} />
      {/* Pricing Details */}
      <PricingDetailsForm
            pricingDetails={pricingDetails}
            onPricingDetailsChange={handlePricingDetailsChange}
      />
     
      {/* Contact Info */}
      <Form.Item label="Contact Info" name="contactInfo">
        <Input
          placeholder={
            roomData?.contactInfo || "Enter contact info (e.g., phone number)"
          }
        />
      </Form.Item>

      {/* Additional Details */}
      <Form.Item label="Additional Details" name="additionalDetails">
        <Input.TextArea
          placeholder={roomData?.additionalDetails || "Enter any details"}
        />
      </Form.Item>

      {/* Room Images */}
      <Form.Item>
        <RoomImageUpload
          postId={roomData?.id || ""}
          initialImages={roomData?.roomInfo?.postImages}
          onChange={handleImagesChange}
        />
      </Form.Item>

      {/* Availability Switch */}
      <Form.Item label="Available" valuePropName="checked" name="status">
        <Switch />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoomForm;
