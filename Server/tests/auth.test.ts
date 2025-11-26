import request from "supertest";
import app from "./src/app";

describe("Auth API", () => {
  it("should signup user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test",
        email: "test@mail.com",
        password: "12345678"
      });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe("test@mail.com");
  });
});
reateApp