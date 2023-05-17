import pg from "pg";
import dbconfig from "./config.js";

export const pool = new pg.Pool({
  connectionString: dbconfig.uri,
  ssl: { rejectUnauthorized: false },
});

export default function query(text, params) {
  console.log(text, params);
  return pool.query(text, params);
}
