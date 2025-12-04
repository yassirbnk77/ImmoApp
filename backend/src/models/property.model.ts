import {
  Property,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "../schemas/property.schema.js";
import { randomUUID } from "crypto";

class PropertyRepository {
  // On simule une base de données avec 4 annonces réalistes
  private properties: Property[] = [
    {
      id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
      title: "Magnifique Loft Industriel",
      city: "Paris 11ème",
      price: 750000,
      surface: 85,
      description:
        "Ancien atelier transformé en loft lumineux avec grande hauteur sous plafond. Proche métro et commerces.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "a4a70900-24e6-42da-9b14-99602b70f5e1",
      title: "Maison familiale avec jardin",
      city: "Lyon",
      price: 520000,
      surface: 120,
      description:
        "Belle maison de 5 pièces située dans un quartier calme. Grand jardin arboré et garage double.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      title: "Studio étudiant rénové",
      city: "Bordeaux",
      price: 145000,
      surface: 22,
      description:
        "Idéal investisseur. Studio entièrement refait à neuf, vendu meublé. Proche universités.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Appartement vue mer",
      city: "Marseille",
      price: 320000,
      surface: 65,
      description:
        "T3 traversant avec terrasse et vue imprenable sur la mer. Résidence sécurisée avec piscine.",
      createdAt: new Date().toISOString(),
    },
  ];

  async findAll(): Promise<Property[]> {
    return this.properties;
  }

  async findById(id: string): Promise<Property | undefined> {
    return this.properties.find((p) => p.id === id);
  }

  async create(data: CreatePropertyInput): Promise<Property> {
    const newProperty: Property = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.properties.push(newProperty);
    return newProperty;
  }

  async update(
    id: string,
    data: UpdatePropertyInput
  ): Promise<Property | undefined> {
    const index = this.properties.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const updatedProperty = { ...this.properties[index], ...data };
    this.properties[index] = updatedProperty;
    return updatedProperty;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.properties.length;
    this.properties = this.properties.filter((p) => p.id !== id);
    return this.properties.length !== initialLength;
  }
}

export const propertyRepository = new PropertyRepository();
