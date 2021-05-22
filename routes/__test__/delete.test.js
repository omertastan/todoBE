const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

it("Returns 404 when not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).delete(`/api/orders/${id}`).send().expect(404);
});

it("User can delete the todo", async () => {
  const todo = await request(app)
    .post("/api/todos")
    .send({ title: "test" })
    .expect(201);

  await request(app).delete(`/api/todos/${todo.body.id}`).send().expect(200);
});
