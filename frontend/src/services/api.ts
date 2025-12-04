import axios from "axios";
import { type Property, type PropertyFormValues } from "../types/index";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const propertyApi = {
  getAll: async () => {
    const { data } = await api.get<Property[]>("/items");
    return data;
  },
  getOne: async (id: string) => {
    const { data } = await api.get<Property>(`/items/${id}`);
    return data;
  },
  create: async (payload: PropertyFormValues) => {
    const { data } = await api.post<Property>("/items", payload);
    return data;
  },
  update: async (id: string, payload: PropertyFormValues) => {
    const { data } = await api.put<Property>(`/items/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    await api.delete(`/items/${id}`);
  },
};
