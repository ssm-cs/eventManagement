import express from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

app.get('/api', async (_req: express.Request, res: express.Response) => {
  const { rows } = await pool.query('SELECT NOW()');
  res.json({ now: rows[0].now });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});