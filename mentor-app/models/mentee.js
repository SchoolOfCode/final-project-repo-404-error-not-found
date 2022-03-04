0.0 //will need to import db query function
import query from '../database/index.js'

//get all users
export async function getAllMentees() {
  let getUsers = await query('SELECT * FROM mentees;')
  return getUsers.rows
}

//get an mentor
export async function getMentee(id) {
  let getMentee = await query('SELECT * FROM mentees WHERE loginid = $1;', [id])
  return getMentee.rows
}

export async function createMentee(mentee) {
  console.log(mentee)
  const {
    loginid,
    firstname,
    surname,
    email,
    biography,
    aims,
    socials,
    location,
    photourl,
    tagline,
    skills,
    relationships,
  } = mentee
  const res = await query(
    'INSERT INTO mentees (loginid, firstname, surname,email,biography,aims,socials, location,photourl, tagline,skills,relationships) VALUES ($1, $2, $3,$4, $5, $6,$7,$8,$9,$10,$11, $12)',
    [
      loginid,
      firstname,
      surname,
      email,
      biography,
      aims,
      socials,
      location,
      photourl,
      tagline,
      skills,
      relationships,
    ]
  )
  return res.rows
}

//delete mentee
export async function deleteMentee(id) {
  let deletedMentee = await query('DELETE FROM mentees WHERE userid = $1;', [
    id,
  ])
  return deletedMentee
}

//version to update multiple fields (from profile setup page)

export async function updateMentee(id, objectToUpdate) {
  const keys = Object.keys(objectToUpdate)

  for (let i = 0; i < keys.length; i++) {
    const columnName = keys[i]
    const stringUpdate = `UPDATE mentees SET ${keys[i]} = ($1) WHERE loginid = ($2);`
    const editMentee = await query(stringUpdate, [
      objectToUpdate[columnName],
      id,
    ])
  }
  const updatedMentee = await query(
    `SELECT * FROM mentees WHERE loginid = $1`,
    [id]
  )
  return updatedMentee
}
