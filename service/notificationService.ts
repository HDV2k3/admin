import { Modal, notification } from "antd";
import { MESSAGES } from "../constants/messages";

type NotificationType = "success" | "error" | "info" | "warning";

export const notificationService = {
  // Hiển thị notification
  show: (type: NotificationType, message: string, description?: string) => {
    notification[type]({
      message,
      description,
    });
  },

  // Hiển thị confirm modal
  showConfirm: (
    title: string,
    content: string,
    onOk: () => Promise<void>,
    onCancel?: () => void
  ) => {
    Modal.confirm({
      title,
      content,
      onOk,
      onCancel,
    });
  },

  // Các helper methods cho các trường hợp cụ thể
  room: {
    deleteConfirm: (roomName: string, onDelete: () => Promise<void>) => {
      notificationService.showConfirm(
        MESSAGES.ROOM.DELETE.CONFIRM(roomName),
        MESSAGES.ROOM.DELETE.CONFIRM_DESCRIPTION(roomName),
        onDelete
      );
    },

    deleteSuccess: (roomName: string) => {
      notificationService.show(
        "success",
        "Xóa thành công",
        MESSAGES.ROOM.DELETE.SUCCESS(roomName)
      );
    },

    deleteError: () => {
      notificationService.show(
        "error",
        "Xóa thất bại",
        MESSAGES.ROOM.DELETE.ERROR
      );
    },

    promotional: {
      deleteConfirm: (roomName: string, onDelete: () => Promise<void>) => {
        notificationService.showConfirm(
          MESSAGES.ROOM.PROMOTIONAL.DELETE.CONFIRM,
          MESSAGES.ROOM.PROMOTIONAL.DELETE.CONFIRM_DESCRIPTION(roomName),
          onDelete
        );
      },

      deleteSuccess: (roomName: string) => {
        notificationService.show(
          "success",
          "Xóa khuyến mãi thành công",
          MESSAGES.ROOM.PROMOTIONAL.DELETE.SUCCESS(roomName)
        );
      },

      deleteError: () => {
        notificationService.show(
          "error",
          "Xóa khuyến mãi thất bại",
          MESSAGES.ROOM.PROMOTIONAL.DELETE.ERROR
        );
      },

      addSuccess: (roomName: string) => {
        notificationService.show(
          "success",
          "Thêm khuyến mãi thành công",
          MESSAGES.ROOM.PROMOTIONAL.ADD.SUCCESS(roomName)
        );
      },

      addError: () => {
        notificationService.show(
          "error",
          "Thêm khuyến mãi thất bại",
          MESSAGES.ROOM.PROMOTIONAL.ADD.ERROR
        );
      },

      invalidPrice: () => {
        notificationService.show(
          "error",
          "Lỗi",
          MESSAGES.ROOM.PROMOTIONAL.ADD.INVALID_PRICE
        );
      },
    },
  },
};
