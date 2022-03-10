import query from '../index.js'

async function deleteConnections() {
  let ressecond = await query(`DROP TABLE connection`)
  console.log('DROP connection table', ressecond)
}

deleteConnections()
