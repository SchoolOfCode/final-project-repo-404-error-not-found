//will need to import db query function
import mentors from "../database/mock-data";

//get all users
export async function getAllMentors() {
  // let getUsers = await query("SELECT * FROM users ORDER BY userid;"); //id??
  // return getUsers.rows;
  return mentors;
}
