import { api } from "./api";


export const roomService = {
  fetchRooms: async (page: number, size: number) => {
    const response = await api.get(`/marketing/post/all`, {
      params: { page, size },
    });
    return response.data;
  },

  deleteRoom: async (roomId: string) => {
    return api.delete(`/marketing/post/${roomId}`);
  },

  deletePromotional: async (roomId: string) => {
    return api.delete(`/marketing/promotional/${roomId}`);
  },

  addPromotional: async (roomId: string, fixPrice: number) => {
    return api.post("/marketing/promotional/create", { roomId, fixPrice });
  },
};
