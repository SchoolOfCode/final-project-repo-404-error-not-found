import query from "../index.js";

async function createMentors() {
  let res = await query(`CREATE TABLE IF NOT EXISTS mentors (
        loginid TEXT,
        userid SERIAL PRIMARY KEY,
       firstname TEXT,
       surname TEXT,
       jobtitle TEXT,
       company TEXT,
       email TEXT,
       biography TEXT,
       socials jsonb,
       location TEXT,
       photourl TEXT,
       tagline TEXT,
       skills TEXT[],
       relationships jsonb
        );`);
  console.log("Created mentors table: ", res);
}

createMentors();
