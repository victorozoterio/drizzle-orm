import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { users } from "../database/schema.ts";
import z from "zod";
import { eq } from "drizzle-orm";
import { hash } from "argon2";

export const createUserRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        summary: "Create a user.",
        body: z.object({
          name: z.string(),
          email: z.email(),
          password: z.string(),
          role: z.enum(["student", "manager"]),
        }),
        response: {
          201: z
            .object({ userId: z.uuid() })
            .describe("Usuário criado com sucesso."),
          409: z
            .object({ message: z.string() })
            .describe("Usuário já cadastrado."),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body;

      const passwordHash = await hash(password);

      const userAlreadyExists = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (userAlreadyExists.length > 0) {
        reply.status(409).send({ message: "Usuário já cadastrado" });
      }

      const result = await db
        .insert(users)
        .values({ name, email, password: passwordHash, role })
        .returning();

      reply.status(201).send({ userId: result[0].id });
    }
  );
};
