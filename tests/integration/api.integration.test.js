/**
 * Integration Tests - API Endpoints
 *
 * Menguji endpoint Express secara end-to-end menggunakan supertest
 * (HTTP request nyata ke app, tanpa membuka port).
 */

const request = require("supertest");
const app = require("../../app");

describe("Integration Tests: API Endpoints", () => {
  // ----- Integration Test 1: GET /sapa -----
  describe("GET /sapa", () => {
    test("IT-01: merespons 200 dengan body JSON yang valid saat nama diberikan", async () => {
      const res = await request(app)
        .get("/sapa")
        .query({ nama: "Faiza" });

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toMatch(/application\/json/);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toContain("Faiza");
      expect(res.body.timestamp).toBeDefined();
    });

    test("IT-01b: menggunakan nama default 'Teman' bila query nama kosong", async () => {
      const res = await request(app).get("/sapa");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain("Teman");
    });
  });

  // ----- Integration Test 2: GET /health -----
  describe("GET /health", () => {
    test("IT-02: merespons 200 dengan teks konfirmasi kesehatan server", async () => {
      const res = await request(app).get("/health");

      expect(res.statusCode).toBe(200);
      expect(res.text).toBeTruthy();
      expect(res.text.length).toBeGreaterThan(0);
    });
  });

  // ----- Endpoint lain -----
  describe("GET /", () => {
    test("root endpoint merespons 200 dengan pesan sambutan", async () => {
      const res = await request(app).get("/");

      expect(res.statusCode).toBe(200);
      expect(res.text).toBeTruthy();
    });
  });

  describe("Endpoint tidak dikenal", () => {
    test("merespons 404 untuk route yang tidak ada", async () => {
      const res = await request(app).get("/tidak-ada-endpoint-ini");

      expect(res.statusCode).toBe(404);
    });
  });
});
