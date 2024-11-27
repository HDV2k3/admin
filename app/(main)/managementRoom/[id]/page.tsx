"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Spin, Card, Col, Row, Tag, Button, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import { API_MARKETING } from "@/service/constant";

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
          `${API_MARKETING}/post/post-by-id/${PostId}`
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
    return <div className="text-center py-12">Room not found</div>;
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

      <Card title={roomData.title} bordered={false} className="shadow-lg">
        <Row gutter={24}>
          <Col span={16}>
            {/* Room Images */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Room Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {roomData.roomInfo.postImages?.map((image, index) => (
                  <Image
                    key={index}
                    src={image.urlImagePost}
                    alt={roomData.title}
                    width={400}
                    height={300}
                    objectFit="cover"
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>

            {/* Room Description */}
            <h3 className="text-2xl font-semibold mt-6">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {roomData.description}
            </p>

            {/* Room Info */}
            <h3 className="text-2xl font-semibold mt-6">Room Information</h3>
            <ul className="space-y-2 text-gray-700">
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

            <Divider />

            {/* Room Utilities */}
            <h3 className="text-2xl font-semibold mt-6">Utilities</h3>
            <ul className="space-y-2 text-gray-700">
              {Object.entries(roomData.roomUtility.furnitureAvailability).map(
                ([key, value]) => (
                  <li key={key}>
                    <strong>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </strong>{" "}
                    {value ? "Available" : "Not Available"}
                  </li>
                )
              )}
              {Object.entries(roomData.roomUtility.amenitiesAvailability).map(
                ([key, value]) => (
                  <li key={key}>
                    <strong>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </strong>{" "}
                    {value ? "Available" : "Not Available"}
                  </li>
                )
              )}
            </ul>

            <Divider />

            {/* Pricing Details */}
            <h3 className="text-2xl font-semibold mt-6">Pricing Details</h3>
            <ul className="space-y-2 text-gray-700">
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

            <Divider />

            {/* Additional Details */}
            <h3 className="text-2xl font-semibold mt-6">Additional Details</h3>
            <p className="text-gray-700">{roomData.additionalDetails}</p>

            <Divider />

            {/* Contact Info */}
            <h3 className="text-2xl font-semibold mt-6">Contact Info</h3>
            <p className="text-gray-700">{roomData.contactInfo}</p>
          </Col>
          <Col span={8}>
            {/* Status */}
            <div className="mb-6">
              <Tag color={roomData.status === "active" ? "green" : "red"}>
                {roomData.status}
              </Tag>
            </div>
            {/* Contact Section */}
            <Button type="primary" block size="large" className="mt-6">
              Contact Owner
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RoomDetailPage;
