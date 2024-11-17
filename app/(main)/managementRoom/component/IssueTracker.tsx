import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Room } from "@/types/IssueTracker";
import { roomService } from "@/service/roomService";
import { SearchBar } from "./SearchBar/SearchBar";
import { ActionBar } from "./ActionBar/ActionBar";
import { PriceModal } from "./PriceModal/PriceModal";
import { RoomTable } from "./RoomTable/RoomTable";
import axios from "axios";
import { notificationService } from "@/service/notificationService";

const IssueTracker: React.FC = () => {
  const [data, setData] = useState<Room[]>([]);
  const [size, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteRoomId] = useState<string | null>(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [fixPrice, setFixPrice] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const router = useRouter();

  const handleViewDetail = (room: Room) => {
    router.push(`/managementRoom/${room.id}`);
  };

  const handleEdit = (room: Room) => {
    router.push(`/managementRoom/${room.id}/edit`);
  };

  const handleCreate = () => {
    router.push(`/managementRoom/create`);
  };
  const handleModalOk = () => {
    if (fixPrice && fixPrice > 0) {
      if (selectedRoom) {
        addRoomToPromotional(selectedRoom.roomId, fixPrice);
        setVisibleModal(false);
      }
    } else {
      notificationService.room.promotional.invalidPrice();
    }
  };
  const handleFixPriceChange = (value: string) => {
    setFixPrice(Number(value));
  };

  const handleDelete = async (room: Room) => {
    notificationService.room.deleteConfirm(room.name, async () => {
      setLoadingDelete(true);
      try {
        await roomService.deleteRoom(room.id);
        notificationService.room.deleteSuccess(room.name);
        setData((prevData) => prevData.filter((item) => item.id !== room.id));
      } catch (error) {
        console.error("Error deleting room:", error);
        notificationService.room.deleteError();
      } finally {
        setLoadingDelete(false);
      }
    });
  };
  const handleDeletePromotional = async (room: Room) => {
    notificationService.room.promotional.deleteConfirm(room.name, async () => {
      setLoadingDelete(true);
      try {
        await roomService.deletePromotional(room.roomId);
        notificationService.room.promotional.deleteSuccess(room.name);
        handleReload();
      } catch (error) {
        console.error("Error deleting promotional:", error);
        notificationService.room.promotional.deleteError();
      } finally {
        setLoadingDelete(false);
      }
    });
  };
  const addRoomToPromotional = async (roomId: string, fixPrice: number) => {
    try {
      const response = await roomService.addPromotional(roomId, fixPrice);

      if (response.data.message === "Success") {
        notificationService.room.promotional.addSuccess(
          data.find((room) => room.roomId === roomId)?.name || roomId
        );
        handleReload();
      } else {
        notificationService.room.promotional.addError();
      }
    } catch (error) {
      console.error("Error:", error);
      notificationService.room.promotional.addError();
    }
  };

  const fetchRoomData = async (page: number = 1) => {
    try {
      const response = await axios.get(
        `http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080/marketing/post/all`,
        { params: { page, size } }
      );
      const responseData = response.data;

      if (responseData.responseCode === 101000 && responseData.data) {
        setTotalItems(responseData.data.totalItems); // Set total item count for pagination
        setPageSize(responseData.data.pageSize);

        const fetchedData = responseData.data.data.map(
          (item: RoomFinal, index: number) => ({
            key: `${index + (page - 1) * size}`,
            id: item.id,
            roomId: item.roomId,
            status: item.status,
            label: item.roomInfo.type,
            createdAt: item.created,
            image: item.roomInfo.postImages?.[0]?.urlImagePost, // Get the first image URL if available
            fixPrice: item.fixPrice,
            basePrice: item.pricingDetails.basePrice,
            name: item.roomInfo.name,
          })
        );

        setData(fetchedData);

        setTotalItems(responseData.data.totalElements);
      } else {
        console.error("Unexpected response format", responseData);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  const handleReload = () => {
    fetchRoomData(currentPage);
  };

  useEffect(() => {
    fetchRoomData(currentPage);
  }, [currentPage]);
  const handleAction = (action: string, room: Room) => {
    switch (action) {
      case "addPromotional":
        setSelectedRoom(room);
        setFixPrice(null);
        setVisibleModal(true);
        break;
      case "deletePromotional":
        handleDeletePromotional(room);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{ padding: "24px", backgroundColor: "#fff", borderRadius: "8px" }}
    >
      <SearchBar onSearch={() => {}} onReset={() => {}} />
      <ActionBar
        onCreate={handleCreate}
        onReload={() => fetchRoomData(currentPage)}
      />
      <PriceModal
        visible={visibleModal}
        fixPrice={fixPrice}
        onOk={handleModalOk}
        onCancel={() => setVisibleModal(false)}
        onChange={handleFixPriceChange}
      />
      <RoomTable
        data={data}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={size}
        onPageChange={setCurrentPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleViewDetail={handleViewDetail}
        handleAction={handleAction}
        loadingDelete={loadingDelete}
        deleteRoomId={deleteRoomId}
      />
    </div>
  );
};

export default IssueTracker;
