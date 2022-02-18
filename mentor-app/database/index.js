import pg from 'pg'
// import dbconfig from '../config.js'

const pool = new pg.Pool({
  connectionString:
    'postgres://yqgylvqdjysrtw:9af32f073fb4c107e27917efa9b8c1895e2e8abcdf2e331a3147b94130ec74ca@ec2-54-171-25-232.eu-west-1.compute.amazonaws.com:5432/de4173lka0g0gm',
  ssl: { rejectUnauthorized: false },
})

export default function query(text, params) {
  return pool.query(text, params)
}
