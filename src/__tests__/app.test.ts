import request from "supertest";
import app from "../app";

describe("App", () => {
  it("should respond with 200 for the health check endpoint", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "OK",
      message: "Service is healthy",
    });

    // Add a small delay to ensure all operations have completed
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
});
