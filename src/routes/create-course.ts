import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import z from "zod";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        body: z.object({
          title: z
            .string()
            .min(5, "Título precisa ter pelo menos 5 caracteres"),
        }),
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title;

      const result = await db
        .insert(courses)
        .values({ title: courseTitle })
        .returning();

      reply.status(201).send({ id: result[0].id });
    }
  );
};
