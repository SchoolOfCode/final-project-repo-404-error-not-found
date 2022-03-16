import query from "../index.js";

async function createMentors() {
  let res = await query(`CREATE TABLE IF NOT EXISTS mentors (
        loginid TEXT UNIQUE,
        userid SERIAL PRIMARY KEY,
       firstname TEXT,
       surname TEXT,
       jobtitle TEXT,
       company TEXT,
       email TEXT,
       biography TEXT,
       socials jsonb,
       location TEXT,
       photourl TEXT DEFAULT 'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png',
       tagline TEXT,
       skills TEXT[],
       relationships jsonb,
       role TEXT DEFAULT 'mentor'
        );`);
  console.log("Created mentors table: ", res);
}

createMentors();
