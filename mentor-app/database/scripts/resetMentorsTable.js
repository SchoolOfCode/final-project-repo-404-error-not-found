import query from "../index.js";

async function deleteMentors() {
  let res = await query(`DROP TABLE mentors`);
  console.log("DROP mentors table", res);
  let ressecond = await query(`DROP TABLE mentees`);
  console.log("DROP mentors table", ressecond);
}

deleteMentors();
