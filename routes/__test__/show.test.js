const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const TODO_STATUSES = require("../../shared/enums");

it("returns 404 when not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/todos/${id}`).send().expect(404);
});

it("returns todo when found", async () => {
  const title = "test";

  const res = await request(app).post("/api/todos").send({ title }).expect(201);

  const todoResponse = await request(app)
    .get(`/api/todos/${res.body.id}`)
    .send()
    .expect(200);

  expect(todoResponse.body.title).toEqual(title);
  expect(todoResponse.body.status).toEqual(TODO_STATUSES.NOT_COMPLETED);
});
