import query from '../index.js'

async function deleteMentors() {
  let res = await query(`DROP TABLE mentors`)
  console.log('DROP mentors table', res)
}

deleteMentors()
