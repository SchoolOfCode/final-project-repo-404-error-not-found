//will need to import db query function
import mentors from "../database/mock-data";
import query from "../database/index.js";

//get all users
export async function getAllMentors() {
  let getUsers = await query("SELECT * FROM mentors;"); //id??
  return getUsers.rows;
}

export async function createMentor(mentor) {
  console.log(mentor);
  const {
    firstname,
    surname,
    email,
    bio,
    socials,
    location,
    photourl,
    tagline,
    skills,
    relationships,
  } = mentor;
  const res = await query(
    "INSERT INTO mentors ( firstname, surname,email,bio,socials, location,photourl, tagline,skills,relationships) VALUES ($1, $2, $3,$4, $5, $6,$7,$8,$9,$10)",
    [
      firstname,
      surname,
      email,
      bio,
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
  console.log("called in mentors");
  let deletedMentor = await query("DELETE FROM mentors WHERE userid = $1;", [
    id,
  ]);
  return deletedMentor;
}
