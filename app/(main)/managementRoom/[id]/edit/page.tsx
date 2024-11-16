// /app/rooms/[id]/edit.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Spin, notification } from "antd";
import RoomForm from "../../component/EditRoomPage";

const EditRoomPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  // Lấy thông tin phòng từ API
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080/marketing/post/post-by-id/${id}`
        );
        setRoomData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomData();
    }
  }, [id]);

  const handleSubmit = async (updatedRoomData: RoomFinal) => {
    try {
      const response = await axios.put(
        `http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080/marketing/post/${id}`,
        updatedRoomData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        notification.success({ message: "Room updated successfully!" });
        router.push(`/managementRoom/${id}`); // Chuyển hướng về trang chi tiết phòng
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: "Failed to update room." });
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!roomData) {
    return <div>Room not found</div>;
  }

  return (
    <div className="p-6">
      <h1>Edit Room</h1>
      <RoomForm roomData={roomData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditRoomPage;