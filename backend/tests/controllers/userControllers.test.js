/* eslint-disable no-undef */
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../../src/app");

describe("POST /users", () => {
  it("should create a user", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: "1234",
      is_admin: false,
    };

    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toEqual(201);
    expect(response.body.id).not.toEqual(undefined);
  });

  it("should return an error if email is not valid", async () => {
    const newUser = {
      email: "bad-email",
      password: "1234",
      is_admin: false,
    };

    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toEqual(400);
  });
});

describe("GET /users", () => {
  it("should return an error when not authenticated", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toEqual(401);
  });
});
