const request = require("supertest");
const app = require("../../app");

const createTodo = async () => {
  return request(app).post("/api/todos").send({ title: "test" });
};

test("has a route handler listening to /api/todos", async () => {
  const res = await request(app).get("/api/todos").send();

  expect(res.status).not.toBe(404);
});

test("shows all the todos", async () => {
  await createTodo();
  await createTodo();
  await createTodo();

  const res = await request(app).get("/api/todos").send().expect(200);

  expect(res.body.length).toEqual(3);
});
