const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const TODO_STATUSES = require("../../shared/enums");

test("returns 404 when todo not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/todos/${id}`)
    .send({ status: TODO_STATUSES.COMPLETED })
    .expect(404);
});

test("returns 400 with invalid credentials", async () => {
  const res = await request(app).post("/api/todos").send({ title: "test" });

  await request(app)
    .put(`/api/todos/${res.body.id}`)
    .send({ title: "em" })
    .expect(400);
});

it("returns 200 with valid credentials", async () => {
  const res = await request(app).post("/api/todos").send({ title: "test" });

  await request(app)
    .put(`/api/todos/${res.body.id}`)
    .send({ title: "New Title" })
    .expect(200);

  const todo = await request(app)
    .get(`/api/todos/${res.body.id}`)
    .send()
    .expect(200);

  expect(todo.body.title).toEqual("New Title");
  expect(todo.body.status).toEqual(TODO_STATUSES.NOT_COMPLETED);
});
