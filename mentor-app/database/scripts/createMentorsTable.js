import query from "../index";

async function createMentors() {
  let res = await query(`CREATE TABLE IF NOT EXISTS mentors (
        userid SERIAL PRIMARY KEY,
       firstname TEXT,
       surname TEXT,
       email TEXT,
       bio TEXT,
       socials TEXT[],
       location TEXT,
       photourl 
        )`);
  console.log("Created mentors table: ", res);
}

createMentors();
