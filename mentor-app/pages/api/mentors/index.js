import { getAllMentors, createMentor } from "../../../models/mentors";
//database communication is handled by the functions in the models folder

export default async function handler(req, res) {
  const HTTPMethod = req.method;

  switch (HTTPMethod) {
    case "GET":
      //call some imported function that handles logic/sql queries
      const mentors = await getAllMentors();
      res.status(200).json(mentors);

      break;
    case "POST":
      //call some imported function that handles logic/sql queries
      const mentor = await createMentor(req.body);
      res.status(200).json(mentor);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);

      res
        .status(405)
        .end(JSON.stringify({ message: `Method ${HTTPMethod} not Allowed` }));
  }
}
