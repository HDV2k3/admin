import React from "react";
import { Form, Input, Button, Switch } from "antd";

import RoomInfoForm from "./RoomInfoEdit";
import PricingDetailsForm from "./PricingDetails";
import RoomUtilityForm from "./RoomUtilities";

interface RoomFormProps {
  roomData?: RoomFinal;
  onSubmit: (data: RoomFinal) => void;
}

const NewRoomForm: React.FC<RoomFormProps> = ({ roomData, onSubmit }) => {
  const [form] = Form.useForm();

  // Convert utilities from object to array for initialValues
  const furnitures = [];
  const amenities = [];

  if (roomData?.roomUtility.furnitureAvailability) {
    furnitures.push(
      ...Object.entries(roomData?.roomUtility.furnitureAvailability).map(
        ([key, value]) => ({
          key,
          value,
        })
      )
    );
  }

  if (roomData?.roomUtility.amenitiesAvailability) {
    amenities.push(
      ...Object.entries(roomData?.roomUtility.amenitiesAvailability).map(
        ([key, value]) => ({
          key,
          value,
        })
      )
    );
  }

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

    submissionValues.availableFromDate = formatDate(
      roomData?.availableFromDate
    );
    submissionValues.status = roomData?.status || "";

    // Convert additionalFees array to object structure
    if (values.pricingDetails?.additionalFees) {
      submissionValues.pricingDetails.additionalFees =
        values.pricingDetails.additionalFees.map((fee) => ({
          type: fee.type,
          amount: fee.amount,
        }));
    }

    // Convert furnitures and amenities back to object structure
    const furnituresObj = {};
    const amenitiesObj = {};

    if (submissionValues.furnitureAvailability) {
      submissionValues.furnitureAvailability.forEach((item) => {
        Object.assign(furnituresObj, { [item.key]: item.value });
      });
    }
    if (submissionValues.amenitiesAvailability) {
      submissionValues.amenitiesAvailability.forEach((item) => {
        Object.assign(amenitiesObj, { [item.key]: item.value });
      });
    }

    submissionValues.roomUtility = {
      furnitureAvailability: furnituresObj,
      amenitiesAvailability: amenitiesObj,
    };

    onSubmit(submissionValues);
    console.log("Form values:", submissionValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...roomData,
        amenitiesAvailability: amenities,
        furnitureAvailability: furnitures,
      }}
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

      {/* Room Info */}
      <RoomInfoForm />

      {/* Room Utility */}
      <RoomUtilityForm />

      {/* Pricing Details */}
      <PricingDetailsForm />

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

      {/* Availability Switch */}
      <Form.Item label="status" name="status">
        <Switch />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewRoomForm;
