/**
 * Unit Tests - handlers/greeting/sapa.js
 *
 * Menguji logika handler sapa secara terisolasi (tanpa HTTP request nyata)
 * menggunakan mock req/res object.
 */

const handleSapa = require("../../handlers/greeting/sapa");

// Helper untuk membuat mock request dan response
function makeMockReqRes(query = {}) {
  const req = { query };
  const res = {
    _json: null,
    json(data) {
      this._json = data;
      return this;
    },
  };
  return { req, res };
}

describe("Unit Tests: handleSapa handler", () => {
  // ----- Unit Test 1 -----
  test("UT-01: mengembalikan status 'success'", () => {
    const { req, res } = makeMockReqRes({ nama: "Budi" });
    handleSapa(req, res);

    expect(res._json.status).toBe("success");
  });

  // ----- Unit Test 2 -----
  test("UT-02: menyapa dengan nama yang diberikan via query", () => {
    const { req, res } = makeMockReqRes({ nama: "Siti" });
    handleSapa(req, res);

    expect(res._json.message).toContain("Siti");
  });

  // ----- Unit Test 3 -----
  test("UT-03: menggunakan nama default 'Teman' jika query nama tidak ada", () => {
    const { req, res } = makeMockReqRes({}); // tidak ada query nama
    handleSapa(req, res);

    expect(res._json.message).toContain("Teman");
  });

  // ----- Unit Test 4 -----
  test("UT-04: respons mengandung field 'timestamp' berformat ISO 8601", () => {
    const { req, res } = makeMockReqRes({ nama: "Andi" });
    handleSapa(req, res);

    expect(res._json.timestamp).toBeDefined();
    // Validasi format ISO 8601
    expect(() => new Date(res._json.timestamp).toISOString()).not.toThrow();
  });

  // ----- Unit Test 5 -----
  test("UT-05: respons memiliki struktur objek yang benar (status, message, timestamp)", () => {
    const { req, res } = makeMockReqRes({ nama: "Dodi" });
    handleSapa(req, res);

    expect(res._json).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        message: expect.any(String),
        timestamp: expect.any(String),
      })
    );
  });

  // ----- Unit Test 6 (bonus) -----
  test("UT-06: pesan selalu mengandung kata 'Halo'", () => {
    const { req, res } = makeMockReqRes({ nama: "Rizky" });
    handleSapa(req, res);

    expect(res._json.message.toLowerCase()).toMatch(/halo/i);
  });
});
