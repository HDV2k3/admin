"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Switch, UploadFile, message } from "antd";
import RoomInfoForm from "../component/RoomInfoEdit";
import RoomUtilityForm from "../component/RoomUtilities";
import PricingDetailsForm from "../component/PricingDetails";
import RoomImageUpload from "../component/UploadImages";

interface RoomFormProps {
  roomData?: RoomFinal;
  onSubmit: (data: RoomFinal) => void;
}

const Page: React.FC<RoomFormProps> = ({ roomData, onSubmit }) => {
  const [form] = Form.useForm();
  const [pricingDetails, setPricingDetails] = useState(
    roomData?.pricingDetails || {
      basePrice: 0,
      electricityCost: 0,
      waterCost: 0,
      additionalFees: [],
    }
  );

  useEffect(() => {
    if (!roomData) {
      return;
    }
    form.setFieldsValue({ ...roomData });
  }, [roomData, form]);

  const handleImagesChange = (images: UploadFile[]) => {
    form.setFieldsValue({
      roomImages: images.map((file) => ({
        name: file.name,
        urlImagePost: file.url || file.response?.url,
        type: file.type,
      })),
    });
  };

  const handlePricingDetailsChange = (
    updatedPricingDetails: PricingDetails
  ) => {
    setPricingDetails(updatedPricingDetails);
  };

  const handleRoomInfoChange = (updatedRoomInfo: RoomInfo) => {
    form.setFieldsValue({ roomInfo: updatedRoomInfo });
  };

  const handleFinish = async (values: RoomFinal) => {
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

    // Step 1: Create the post
    try {
      const response = await fetch(
        "http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080/marketing/post/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(submissionValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create the post");
      }

      const postData = await response.json();
      const postId = postData.id;

      // Step 2: Upload images (if any)
      const roomImages = form.getFieldValue("postImages") || [];
      const formData = new FormData();
      formData.append("id", postId);
      roomImages.forEach((image: UploadFile) => {
        if (image.originFileObj) {
          formData.append("files", image.originFileObj);
        }
      });
      const imageUploadResponse = await fetch(
        `http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080/marketing/post/upload-images`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!imageUploadResponse.ok) {
        throw new Error("Failed to upload images");
      }

      // Step 3: Return the final data to parent
      message.success("Post and images uploaded successfully");
      onSubmit({ ...submissionValues, id: postId });
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error("Error occurred: " + error.message);
      } else {
        message.error("An unknown error occurred");
      }
    }
    console.log("Form values:", values);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={roomData || {}}
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

        {/* Availability Switch */}
        <Form.Item label="Available" valuePropName="checked" name="status">
          <Switch />
        </Form.Item>
        {/* Room Images */}
        <Form.Item>
          <RoomImageUpload
            postId={roomData?.id || ""}
            initialImages={roomData?.roomInfo?.postImages}
            onChange={handleImagesChange}
          />
        </Form.Item>
        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Page;
