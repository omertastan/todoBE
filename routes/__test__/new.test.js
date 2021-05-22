const request = require("supertest");
const app = require("../../app");
const Todo = require("../../models/Todos");

test("has a route handler listening to /api/todos for post req", async () => {
  const res = await request(app).post("/api/todos").send({});

  expect(res.status).not.toBe(404);
});

test("returns error with invalid title", async () => {
  await request(app)
    .post("/api/todos")
    .send({ title: "", status: "completed" })
    .expect(400);
});

test("creates todo with valid credentials", async () => {
  let todos = await Todo.find({});
  expect(todos.length).toEqual(0);

  await request(app).post("/api/todos").send({ title: "test" }).expect(201);

  todos = await Todo.find({});
  expect(todos.length).toEqual(1);
  expect(todos[0].title).toBe("test");
});
