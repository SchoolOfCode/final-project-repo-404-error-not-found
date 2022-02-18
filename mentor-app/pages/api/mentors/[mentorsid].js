import { deleteMentor } from "../../../models/mentors";

export default async function (req, res) {
  const HTTPMethod = req.method;
  let id = req.query.mentorsid;

  switch (HTTPMethod) {
    case "PATCH":
      //call some imported function that handles logic/sql queries
      res.status(200).json(mentors);
      break;
    case "DELETE":
      //call some imported function that handles logic/sql queries
      // let id = req.params.mentorsid;
      console.log(id);
      const mentorToDelete = await deleteMentor(id);
      res.status(200).json(mentorToDelete);
      break;
    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).end(`Method ${HTTPMethod} not Allowed`);
  }
}
