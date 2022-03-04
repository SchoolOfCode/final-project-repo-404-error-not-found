import { getAllMentors, createMentor } from "../../../models/mentors";

export default async function handler(req, res) {
  const HTTPMethod = req.method;

  switch (HTTPMethod) {
    case "GET":
      //call some imported function that handles logic/sql queries
      // try {
      const mentors = await getAllMentors();
      res.status(200).json(mentors);
      // } catch {
      //   res.status(405);
      // }
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
