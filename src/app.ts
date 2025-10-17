import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createCourseRoute } from "./routes/create-course.ts";
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts";
import { getCoursesRoute } from "./routes/get-courses.ts";
import { loginRoute } from "./routes/login.ts";
import { createUserRoute } from "./routes/create-user.ts";

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

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Drizzle ORM",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "bluePlanet",
    },
  });
}

server.setValidatorCompiler(validatorCompiler); // valido os dados de entrada (ex: título do curso)
server.setSerializerCompiler(serializerCompiler); // converte os dados de saída de uma rota em um outro formato

server.register(createUserRoute);
server.register(loginRoute);
server.register(createCourseRoute);
server.register(getCourseByIdRoute);
server.register(getCoursesRoute);

export { server };
