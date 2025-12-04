import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  propertySchema,
  createPropertySchema,
  updatePropertySchema,
} from "../schemas/property.schema.js";
import { propertyService } from "../services/property.service.js";

export async function propertyRoutes(app: FastifyInstance) {
  // On type l'instance pour bénéficier de l'inférence Zod
  const server = app.withTypeProvider<ZodTypeProvider>();

  // GET /items
  server.get(
    "/items",
    {
      schema: {
        tags: ["Properties"],
        response: {
          200: z.array(propertySchema),
        },
      },
    },
    async () => {
      return await propertyService.getAllProperties();
    }
  );

  // GET /items/:id
  server.get(
    "/items/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        response: {
          200: propertySchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        return await propertyService.getPropertyById(request.params.id);
      } catch (e) {
        return reply.status(404).send({ message: "Propriété introuvable" });
      }
    }
  );

  // POST /items
  server.post(
    "/items",
    {
      schema: {
        body: createPropertySchema, // Validation automatique du body
        response: {
          201: propertySchema,
        },
      },
    },
    async (request, reply) => {
      const newProperty = await propertyService.createProperty(request.body);
      return reply.status(201).send(newProperty);
    }
  );

  // PUT /items/:id [cite: 53]
  server.put(
    "/items/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        body: updatePropertySchema,
        response: {
          200: propertySchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        return await propertyService.updateProperty(
          request.params.id,
          request.body
        );
      } catch (e) {
        return reply.status(404).send({ message: "Propriété introuvable" });
      }
    }
  );

  // DELETE /items/:id [cite: 54]
  server.delete(
    "/items/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        response: {
          204: z.null(),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        await propertyService.deleteProperty(request.params.id);
        return reply.status(204).send();
      } catch (e) {
        return reply.status(404).send({ message: "Propriété introuvable" });
      }
    }
  );
}
