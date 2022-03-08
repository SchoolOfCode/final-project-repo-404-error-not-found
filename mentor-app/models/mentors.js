//will need to import db query function
import query from "../database/index.js";

//get all users
export async function getAllMentors() {
  let getUsers = await query("SELECT * FROM mentors;");
  return getUsers.rows;
}

//get an mentor
export async function getMentor(id) {
  let getMentor = await query("SELECT * FROM mentors WHERE loginid = $1;", [
    id,
  ]);
  return getMentor.rows;
}

export async function createMentor(mentor) {
  console.log(mentor);
  const {
    loginid,
    firstname,
    surname,
    email,
    biography,
    socials,
    location,
    photourl,
    tagline,
    skills,
    relationships,
  } = mentor;
  const res = await query(
    "INSERT INTO mentors (loginid, firstname, surname,email,biography,socials, location,photourl, tagline,skills,relationships) VALUES ($1, $2, $3,$4, $5, $6,$7,$8,$9,$10,$11)",
    [
      loginid,
      firstname,
      surname,
      email,
      biography,
      socials,
      location,
      photourl,
      tagline,
      skills,
      relationships,
    ]
  );
  return res.rows;
}

//delete mentor
export async function deleteMentor(id) {
  let deletedMentor = await query("DELETE FROM mentors WHERE userid = $1;", [
    id,
  ]);
  return deletedMentor;
}

//edit mentor
//original - one field at a time
// export async function updateMentor(id, objectToUpdate) {
//   const keys = Object.keys(objectToUpdate)
//   const columnName = keys[0]
//   const stringUpdate = `UPDATE mentors SET ${keys[0]} = ($1) WHERE userid = ($2);`
//   const editMentor = await query(stringUpdate, [objectToUpdate[columnName], id])
//   return editMentor
// }

//version to update multiple fields (from profile setup page)

export async function updateMentor(id, objectToUpdate) {
  const keys = Object.keys(objectToUpdate);

  for (let i = 0; i < keys.length; i++) {
    const columnName = keys[i];
    const stringUpdate = `UPDATE mentors SET ${keys[i]} = ($1) WHERE loginid = ($2);`;
    const editMentor = await query(stringUpdate, [
      objectToUpdate[columnName],
      id,
    ]);
  }
  const updatedMentor = await query(
    `SELECT * FROM mentors WHERE loginid = $1`,
    [id]
  );
  return updatedMentor;
}
