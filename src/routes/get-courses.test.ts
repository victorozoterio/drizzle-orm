import { test, expect } from "vitest";
import { randomUUID } from "node:crypto";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.factory.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-user.factory.ts";

test("get courses filter by title", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("manager");
  const titleId = randomUUID();
  await makeCourse(titleId);

  const response = await request(server.server)
    .get(`/courses?search=${titleId}`)
    .set("Authorization", token);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      },
    ],
  });
});
