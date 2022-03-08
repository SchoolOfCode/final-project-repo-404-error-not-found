import query from '../index.js'

async function createRelation() {
  let res = await query(`CREATE TABLE IF NOT EXISTS connection (
       id SERIAL PRIMARY KEY,
       mentor_id TEXT,
       mentee_id TEXT,
       status TEXT
 );`)
  console.log('Created CONNECTION table: ', res)
}

createRelation()
