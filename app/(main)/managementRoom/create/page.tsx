"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import axios from "axios";
import NewRoomForm from "./component/NewsRoomPage";

const NewRoomPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (roomData: RoomFinal) => {
    const token = localStorage.getItem("token");

    try {
      // Submit the new room details (without images)
      const response = await axios.post(
        "http://localhost:8080/marketing/post/create", // Replace with your API endpoint
        roomData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const createdRoomId = response.data.data.id; // Get room ID from response

        notification.success({
          message: "Room created successfully!",
        });

        // Redirect to the image upload page for the newly created room
        router.push(`/managementRoom/${createdRoomId}/upload-images`);
      }
    } catch (error) {
      console.error("Room creation failed:", error);
      notification.error({
        message: "Failed to create room.",
      });
    }
  };

  return (
    <div className="p-6">
      <h1>Create New Room</h1>
      <NewRoomForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewRoomPage;
