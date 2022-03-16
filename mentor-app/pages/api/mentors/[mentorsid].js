import { deleteMentor, updateMentor, getMentor } from "../../../models/mentors";

export default async function handler(req, res) {
  const HTTPMethod = req.method;
  let id = req.query.mentorsid;
  let objectToUpdate = req.body;

  // {email: simon@prato}

  switch (HTTPMethod) {
    case "GET":
      const mentor = await getMentor(id);
      res.status(200).json(mentor);
      break;

    case "PATCH":
      id = String(id);
      console.log("ID:" + id, " Body: " + objectToUpdate);
      const editMentor = await updateMentor(id, objectToUpdate);
      res.status(200).json(editMentor);
      break;

    case "DELETE":
      console.log(id);
      const mentorToDelete = await deleteMentor(id);
      res.status(200).json(mentorToDelete);
      break;

    default:
      //only allows these methods on this route - handle others with error message
      res.setHeader("Allow", ["PATCH", "DELETE", "GET"]);
      res.status(405).end(`Method ${HTTPMethod} not Allowed`);
  }
}
