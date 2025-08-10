// server.js — servidor simple con Express
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// almacenamiento en memoria (solo para demo)
const appointments = [];

app.get("/api/appointments", (req, res) => {
  // devolver copia ordenada por fecha
  res.json(
    appointments.slice().sort((a, b) => a.datetime.localeCompare(b.datetime))
  );
});

app.post("/api/appointments", (req, res) => {
  const { owner, pet, type, datetime, notes } = req.body;
  if (!owner || !pet || !datetime)
    return res.status(400).json({ error: "Campos requeridos" });
  const id = Date.now().toString(36);
  appointments.push({ id, owner, pet, type, datetime, notes });
  res.status(201).json({ ok: true });
});

app.listen(PORT, () =>
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
);
