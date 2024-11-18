import { api, apiNonToken } from "./api";

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
  fetchFeaturedRooms: async (page: number, size: number) => {
    const response = await apiNonToken.get(
      `/marketing/featured/list-featured`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },

  addFeaturedRoom: async (roomId: string) => {
    const response = await api.post(`/marketing/featured/create`, { roomId });
    return response.data;
  },

  removeFeaturedRoom: async (roomId: string) => {
    const response = await api.delete(`/marketing/featured/${roomId}`);
    return response.data;
  },
};
