import { z } from "zod";

// Schéma de base
export const propertySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
  city: z.string().min(2, "La ville est requise"),
  price: z.number().positive("Le prix doit être positif"),
  surface: z.number().positive("La surface doit être positive"),
  description: z.string().optional(),
  createdAt: z.string(), // Pour la date ISO
});

// DTO pour la création
export const createPropertySchema = propertySchema.omit({
  id: true,
  createdAt: true,
});

// DTO pour la mise à jour (tout est optionnel)
export const updatePropertySchema = createPropertySchema.partial();

export type Property = z.infer<typeof propertySchema>;
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
