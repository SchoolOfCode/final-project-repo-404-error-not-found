import query from "../index.js";
import mentees from "../mentees-sample-data.js";

async function populateMenteeTable() {
  for (let i = 0; i < mentees.length; i++) {
    const {
      loginid,
      firstname,
      surname,
      jobtitle,
      aims,
      email,
      biography,
      socials,
      location,
      photourl,
      tagline,
      skills,
      relationships,
    } = mentees[i];
    console.log(mentees[i]);
    const res = await query(
      "INSERT INTO mentees ( loginid, firstname, surname, jobtitle, aims, email, biography, socials, location, photourl, tagline, skills, relationships) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
      [
        loginid,
        firstname,
        surname,
        jobtitle,
        aims,
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
  }
}
populateMenteeTable();
