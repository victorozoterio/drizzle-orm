import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
import { getCoursesRoute } from "./src/routes/get-courses.ts";

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
}).withTypeProvider<ZodTypeProvider>();

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Drizzle ORM",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.setValidatorCompiler(validatorCompiler); // valido os dados de entrada (ex: título do curso)
server.setSerializerCompiler(serializerCompiler); // converte os dados de saída de uma rota em um outro formato

server.register(createCourseRoute);
server.register(getCourseByIdRoute);
server.register(getCoursesRoute);

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
