export interface Property {
  id: string;
  title: string;
  city: string;
  price: number;
  surface: number;
  description?: string;
}

// j'ai utilisé Zod ici aussi pour valider les formulaires côté client
import { z } from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(5, "Titre trop court (min 5)"),
  city: z.string().min(2, "Ville requise"),
  price: z.number({ message: "Prix requis" }).positive(),
  surface: z.number({ message: "Surface requise" }).positive(),
  description: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
