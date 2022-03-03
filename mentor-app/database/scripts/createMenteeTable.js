import query from '../index.js'

async function createMentee() {
  let res = await query(`CREATE TABLE IF NOT EXISTS mentees (
        loginid TEXT UNIQUE,
        userid SERIAL PRIMARY KEY,
       firstname TEXT,
       surname TEXT,
       jobtitle TEXT,
       aims TEXT,
       email TEXT,
       biography TEXT,
       socials jsonb,
       location TEXT,
       photourl TEXT,
       tagline TEXT,
       skills TEXT[],
       relationships jsonb
        );`)
  console.log('Created mentees table: ', res)
}

createMentee()
