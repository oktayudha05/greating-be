/**
 * Handler untuk endpoint /sapa
 * Menangani greeting dari user
 */

const handleSapa = (req, res) => {
  const nama = req.query.nama || "Teman";
  
  res.json({
    status: "success",
    message: `Halo ${nama}! Selamat datang di Greeting BE 🎉`,
    timestamp: new Date().toISOString()
  });
};

module.exports = handleSapa;
