import { propertyRepository } from "../models/property.model.js";
import {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "../schemas/property.schema.js";

export const propertyService = {
  getAllProperties: async () => {
    const properties = await propertyRepository.findAll();
    return [...properties].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getPropertyById: async (id: string) => {
    const property = await propertyRepository.findById(id);
    if (!property) {
      throw new Error("NOT_FOUND");
    }
    return property;
  },

  createProperty: async (data: CreatePropertyInput) => {
    return await propertyRepository.create(data);
  },

  updateProperty: async (id: string, data: UpdatePropertyInput) => {
    const updated = await propertyRepository.update(id, data);
    if (!updated) {
      throw new Error("NOT_FOUND");
    }
    return updated;
  },

  deleteProperty: async (id: string) => {
    const deleted = await propertyRepository.delete(id);
    if (!deleted) {
      throw new Error("NOT_FOUND");
    }
    return { success: true };
  },
};
