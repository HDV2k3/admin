import React, { useState, useEffect } from "react";
import {
  Table,
  Select,
  DatePicker,
  Button,
  Input,
  Space,
  Modal,
  notification,
} from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  EditOutlined,
  SettingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

interface Room {
  key: string;
  id: string;
  title: string;
  status: string;
  label: string;
  createdAt: string;
  image?: string;
}

const IssueTracker = () => {
  const [data, setData] = useState<Room[]>([]);
  const [size, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0); // For total item count across all pages
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDelete, setLoadingDelete] = useState(false); // For showing loading during deletion
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null); // Room to delete
  const router = useRouter();
  const token = localStorage.getItem("token");

  const handleViewDetail = (room: Room) => {
    router.push(`/managementRoom/${room.id}`);
  };

  const handleEdit = (room: Room) => {
    router.push(`/managementRoom/${room.id}/edit`);
  };
  const handleCreate = () => {
    router.push(`/managementRoom/create`);
  };
  const handleDelete = async (room: Room) => {
    // Set the room to delete
    setDeleteRoomId(room.id);

    // Show confirmation modal
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa phòng này?",
      content: `Phòng ${room.title} sẽ bị xóa vĩnh viễn.`,
      onOk: async () => {
        setLoadingDelete(true);
        try {
          await axios.delete(
            `http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080/marketing/post/${room.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          notification.success({
            message: "Xóa thành công",
            description: `Phòng ${room.title} đã được xóa thành công.`,
          });
          // Remove the deleted room from the table data
          setData((prevData) => prevData.filter((item) => item.id !== room.id));
        } catch (error) {
          console.error("Error deleting room:", error);
          notification.error({
            message: "Xóa thất bại",
            description: "Đã xảy ra lỗi khi xóa phòng.",
          });
        } finally {
          setLoadingDelete(false);
        }
      },
    });
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image
          src={image}
          alt="room"
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {text}
          <span style={{ color: "#1890ff" }}>📎</span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: status === "pending" ? "#ff4d4f" : "#52c41a",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          <span>
            {status === "pending" ? "Chưa giải quyết" : "Đang hoạt động"}
          </span>
        </div>
      ),
    },
    {
      title: "Nhãn",
      dataIndex: "label",
      key: "label",
      render: (label: string) => (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "2px",
            fontSize: "12px",
            backgroundColor: label === "bug" ? "#fff1f0" : "#f6ffed",
            color: label === "bug" ? "#ff4d4f" : "#52c41a",
            border: `1px solid ${label === "bug" ? "#ffccc7" : "#b7eb8f"}`,
          }}
        >
          {label}
        </span>
      ),
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: Room) => (
        <Space>
          <Button
            type="link"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              handleEdit(record);
            }}
            style={{ padding: 0 }}
          >
            Sửa
          </Button>
          <Button
            loading={loadingDelete && deleteRoomId === record.id}
            onClick={() => handleDelete(record)}
            type="link"
            style={{ padding: 0 }}
          >
            Xóa
          </Button>
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              handleViewDetail(record);
            }}
          >
            Chi tiết
          </Button>
          <MoreOutlined />
        </Space>
      ),
    },
  ];

  // Fetch data based on the current page and pageSize
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
            title: item.roomId,
            status: item.status,
            label: item.roomInfo.type,
            createdAt: item.created,
            image: item.roomInfo.postImages?.[0]?.urlImagePost, // Get the first image URL if available
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

  useEffect(() => {
    fetchRoomData(currentPage);
  }, [currentPage]);

  return (
    <div
      style={{ padding: "24px", backgroundColor: "#fff", borderRadius: "8px" }}
    >
      {/* Search Bar */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "16px" }}>
        <Input placeholder="Nhập tiêu đề..." style={{ flex: 1 }} />
        <Select
          defaultValue="pending"
          style={{ width: 200 }}
          options={[
            { label: "Chưa giải quyết", value: "pending" },
            { label: "Đang hoạt động", value: "resolved" },
          ]}
        />
        <RangePicker style={{ width: 300 }} />
        <Button>Đặt lại</Button>
        <Button type="primary">Tìm kiếm</Button>
      </div>

      {/* Action Bar */}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 500 }}>
          Danh sách vấn đề
        </h2>
        <Space>
          <Button onClick={handleCreate} type="primary" icon={<PlusOutlined />}>
            Mới
          </Button>
          <Button type="text" icon={<ReloadOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<SettingOutlined />} />
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          total: totalItems,
          pageSize: size,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default IssueTracker;
