"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Spin, Card, Col, Row, Tag, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";

const RoomDetailPage = () => {
  const [roomData, setRoomData] = useState<RoomFinal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id: PostId } = useParams() as { id: string };

  // Fetch room data by ID
  useEffect(() => {
    if (!PostId) return;

    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080/marketing/post/post-by-id/${PostId}`
        );
        if (response.data.responseCode === 101000) {
          setRoomData(response.data.data);
        } else {
          console.error("Failed to fetch room data.");
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [PostId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!roomData) {
    return <div>Room not found</div>;
  }

  return (
    <div className="p-6">
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/")}
        className="mb-6"
      >
        Back to Rooms List
      </Button>

      <Card title={roomData.title} bordered={false}>
        <Row gutter={24}>
          <Col span={16}>
            {/* Room Image */}
            <div className="mb-6">
              <Image
                src={roomData.roomInfo.postImages?.[0].urlImagePost || ""}
                alt={roomData.title}
                width={800}
                height={400}
                objectFit="cover"
              />
            </div>

            {/* Room Description */}
            <h3 className="text-xl font-semibold">Description</h3>
            <p>{roomData.description}</p>

            {/* Room Info */}
            <h3 className="text-xl font-semibold mt-6">Room Information</h3>
            <ul>
              <li>
                <strong>Name:</strong> {roomData.roomInfo.name}
              </li>
              <li>
                <strong>Type:</strong> {roomData.roomInfo.type}
              </li>
              <li>
                <strong>Style:</strong> {roomData.roomInfo.style}
              </li>
              <li>
                <strong>Address:</strong> {roomData.roomInfo.address}
              </li>
              <li>
                <strong>Floor:</strong> {roomData.roomInfo.floor}
              </li>
              <li>
                <strong>Total Area:</strong> {roomData.roomInfo.totalArea} m²
              </li>
              <li>
                <strong>Capacity:</strong> {roomData.roomInfo.capacity} people
              </li>
              <li>
                <strong>Bedrooms:</strong> {roomData.roomInfo.numberOfBedrooms}
              </li>
              <li>
                <strong>Bathrooms:</strong>{" "}
                {roomData.roomInfo.numberOfBathrooms}
              </li>
            </ul>

            {/* Room Utilities */}
            <h3 className="text-xl font-semibold mt-6">Utilities</h3>
            <ul>
              <li>
                <strong>Bed:</strong>{" "}
                {roomData.roomUtility.furnitureAvailability.Bed
                  ? "Available"
                  : "Not Available"}
              </li>
              <li>
                <strong>Sofa:</strong>{" "}
                {roomData.roomUtility.furnitureAvailability.Sofa
                  ? "Available"
                  : "Not Available"}
              </li>
              <li>
                <strong>Table:</strong>{" "}
                {roomData.roomUtility.furnitureAvailability.Table
                  ? "Available"
                  : "Not Available"}
              </li>
              <li>
                <strong>Chair:</strong>{" "}
                {roomData.roomUtility.furnitureAvailability.Chair
                  ? "Available"
                  : "Not Available"}
              </li>
              <li>
                <strong>WiFi:</strong>{" "}
                {roomData.roomUtility.amenitiesAvailability.WiFi
                  ? "Available"
                  : "Not Available"}
              </li>
              <li>
                <strong>Air Conditioner:</strong>{" "}
                {roomData.roomUtility.amenitiesAvailability.AirConditioner
                  ? "Available"
                  : "Not Available"}
              </li>
              <li>
                <strong>Heater:</strong>{" "}
                {roomData.roomUtility.amenitiesAvailability.Heater
                  ? "Available"
                  : "Not Available"}
              </li>
              <li>
                <strong>Washing Machine:</strong>{" "}
                {roomData.roomUtility.amenitiesAvailability.WashingMachine
                  ? "Available"
                  : "Not Available"}
              </li>
            </ul>

            {/* Pricing Details */}
            <h3 className="text-xl font-semibold mt-6">Pricing Details</h3>
            <ul>
              <li>
                <strong>Base Price:</strong> $
                {roomData.pricingDetails.basePrice}
              </li>
              <li>
                <strong>Electricity Cost:</strong> $
                {roomData.pricingDetails.electricityCost}
              </li>
              <li>
                <strong>Water Cost:</strong> $
                {roomData.pricingDetails.waterCost}
              </li>
              {roomData.pricingDetails.additionalFees.map((fee, index) => (
                <li key={index}>
                  <strong>{fee.type}:</strong> ${fee.amount}
                </li>
              ))}
            </ul>

            {/* Additional Details */}
            <h3 className="text-xl font-semibold mt-6">Additional Details</h3>
            <p>{roomData.additionalDetails}</p>

            {/* Contact Info */}
            <h3 className="text-xl font-semibold mt-6">Contact Info</h3>
            <p>{roomData.contactInfo}</p>
          </Col>
          <Col span={8}>
            {/* Status */}
            <div className="mb-6">
              <Tag color={roomData.status === "active" ? "green" : "red"}>
                {roomData.status}
              </Tag>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RoomDetailPage;
