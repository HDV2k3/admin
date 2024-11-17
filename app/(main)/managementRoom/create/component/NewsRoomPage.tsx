import React from "react";
import { Form, Input, Button, Select, ConfigProvider, DatePicker } from "antd";
import RoomInfoForm from "../../component/RoomInfoEdit";
import PricingDetailsForm from "../../component/PricingDetails";
import RoomUtilityForm from "../../component/RoomUtilities";
import dayjs from "dayjs";

import type { DatePickerProps } from "antd";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
interface RoomFormProps {
  roomData?: RoomFinal;
  onSubmit: (data: RoomFinal) => void;
}

const NewRoomForm: React.FC<RoomFormProps> = ({ roomData, onSubmit }) => {
  const [form] = Form.useForm();

  // Convert utilities from object to array for initialValues
  const furnitures = [];
  const amenities = [];
  const statusOptions = [
    { label: "ACTIVE", value: "active" },
    { label: "UNACTIVE", value: "unactive" },
    { label: "PENDING", value: "pending" },
  ];
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
    };

    if (values.roomInfo?.availableFromDate) {
      submissionValues.roomInfo.availableFromDate = dayjs(
        values.roomInfo.availableFromDate
      ).toISOString(); // ISO 8601 format
    }

    submissionValues.availableFromDate = dayjs(
      values.availableFromDate
    ).toISOString(); // ISO 8601 format
    submissionValues.status = values.status || roomData?.status || "available";
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
  const buddhistLocale: typeof en = {
    ...en,
    lang: {
      ...en.lang,
      dateFormat: "BBBB-MM-DD",
      dateTimeFormat: "BBBB-MM-DD HH:mm:ss",
      yearFormat: "BBBB",
      cellYearFormat: "BBBB",
    },
  };

  // ConfigProvider-level locale
  const globalBuddhistLocale: typeof enUS = {
    ...enUS,
    DatePicker: {
      ...enUS.DatePicker!,
      lang: buddhistLocale.lang,
    },
  };
  const handleDateChange: DatePickerProps["onChange"] = (_, dateStr) => {
    console.log("onChange:", dateStr);
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

      {/* availableFromDate*/}
      <ConfigProvider locale={globalBuddhistLocale}>
        <Form.Item
          label="Available From Date"
          name={["roomInfo", "availableFromDate"]}
        >
          <DatePicker
            placeholder={"Select available from date"}
            style={{ width: "100%" }}
            locale={buddhistLocale}
            onChange={handleDateChange}
            format="BBBB-MM-DD"
            defaultValue={dayjs()}
          />
        </Form.Item>
      </ConfigProvider>
      {/* Status Select */}
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select a status" }]}
      >
        <Select
          placeholder="Select room status"
          options={statusOptions} // Use the predefined options for status
          style={{ width: "100%" }}
        />
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
