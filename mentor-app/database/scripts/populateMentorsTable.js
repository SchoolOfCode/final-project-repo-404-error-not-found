import query from "../index.js";
import mentors from "../mock-data.js";

async function populateMentorsTable() {
  for (let i = 0; i < mentors.length; i++) {
    const {
      firstname,
      surname,
      jobtitle,
      company,
      email,
      biography,
      socials,
      location,
      photourl,
      tagline,
      skills,
      relationships,
    } = mentors[i];
    console.log(mentors[i]);
    const res = await query(
      "INSERT INTO mentors ( firstname, surname, jobtitle, company, email, biography, socials, location, photourl, tagline, skills, relationships) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        firstname,
        surname,
        jobtitle,
        company,
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
populateMentorsTable();
