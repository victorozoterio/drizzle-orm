import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.factory.ts";
import { randomUUID } from "node:crypto";

test("create a course", async () => {
  await server.ready();

  const course = await makeCourse();
  const response = await request(server.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("return 404 for non existing courses", async () => {
  await server.ready();

  const courseId = randomUUID();
  const response = await request(server.server).get(`/courses/${courseId}`);

  expect(response.status).toEqual(404);
});
