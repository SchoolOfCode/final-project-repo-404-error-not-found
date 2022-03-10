import query from '../index.js'

async function deleteMentees() {
  let ressecond = await query(`DROP TABLE mentees`)
  console.log('DROP mentees table', ressecond)
}

deleteMentees()
