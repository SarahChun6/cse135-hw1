require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

app.get("/health", async (_, res) => {
  await pool.query("SELECT 1");
  res.json({ ok: true });
});

// GET all (add pagination so it’s not huge)
app.get("/api/static", async (req, res) => {
  const limit = Math.min(Number(req.query.limit || 50), 200);
  const offset = Number(req.query.offset || 0);

  const { rows } = await pool.query(
    `SELECT id, created_at, ip, user_agent, path, referrer, payload
     FROM static_logs
     ORDER BY id DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  res.json(rows);
});

// GET one
app.get("/api/static/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rows } = await pool.query(
    `SELECT id, created_at, ip, user_agent, path, referrer, payload
     FROM static_logs
     WHERE id = $1`,
    [id]
  );
  if (rows.length === 0) return res.status(404).json({ ok: false, error: "not_found" });
  res.json(rows[0]);
});

// POST create (server controls created_at/id)
app.post("/api/static", async (req, res) => {
  const body = req.body ?? {};
  const path = body.path ?? null;
  const referrer = body.referrer ?? null;
  const payload = body.payload ?? body; // allow either {payload:{...}} or raw event object

  const userAgent = body.user_agent ?? null;
  const ip = body.ip ?? null;

  const { rows } = await pool.query(
    `INSERT INTO static_logs (ip, user_agent, path, referrer, payload)
     VALUES ($1, $2, $3, $4, $5::jsonb)
     RETURNING id`,
    [ip, userAgent, path, referrer, JSON.stringify(payload)]
  );
  res.status(201).json({ ok: true, id: rows[0].id });
});

// PUT update (simple: only allow updating a few fields)
app.put("/api/static/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body ?? {};

  const path = body.path ?? null;
  const referrer = body.referrer ?? null;
  const payload = body.payload ? JSON.stringify(body.payload) : null;

  const { rowCount } = await pool.query(
    `UPDATE static_logs
     SET path = COALESCE($1, path),
         referrer = COALESCE($2, referrer),
         payload = COALESCE($3::jsonb, payload)
     WHERE id = $4`,
    [path, referrer, payload, id]
  );

  if (rowCount === 0) return res.status(404).json({ ok: false, error: "not_found" });
  res.json({ ok: true });
});

// DELETE
app.delete("/api/static/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query(`DELETE FROM static_logs WHERE id = $1`, [id]);
  if (rowCount === 0) return res.status(404).json({ ok: false, error: "not_found" });
  res.status(204).send();
});

const port = Number(process.env.REPORTING_PORT || 3001);
app.listen(port, () => console.log(`reporting listening on ${port}`));
