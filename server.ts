import fastify from "fastify";
import { eq } from "drizzle-orm";
import { db } from "./src/database/client.ts";
import { courses } from "./src/database/schema.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.get("/courses", async (request, reply) => {
  const result = await db
    .select({
      id: courses.id,
      title: courses.title,
    })
    .from(courses);

  return reply.send({ courses: result });
});

server.get("/courses/:id", async (request, reply) => {
  type Params = {
    id: string;
  };

  const params = request.params as Params;
  const courseId = params.id;

  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId));

  if (result.length > 0) {
    return { course: result[0] };
  }

  return reply.status(404).send();
});

server.post("/courses", async (request, reply) => {
  type Body = {
    title: string;
  };

  const body = request.body as Body;
  const courseTitle = body.title;

  if (!courseTitle) {
    return reply.status(400).send({ message: "Título obrigatório." });
  }

  const result = await db
    .insert(courses)
    .values({ title: courseTitle })
    .returning();

  reply.status(201).send({ id: result[0].id });
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
