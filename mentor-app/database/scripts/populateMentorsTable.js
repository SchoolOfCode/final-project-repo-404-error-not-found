import mentors from '../mock-data'
import query from '../index.js'

async function populateMentorsTable() {
  for (let i = 0; i < users.length; i++) {
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
    } = mentors[i]

    const res = await query(
      'INSERT INTO mentors ( firstname, surname,email,bio,socials, location,photourl, tagline,skills,relationships) VALUES ($1, $2, $3,$4, $5, $6,$7,$8,$9,$10)',
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
    )
  }
}
populateMentorsTable()
