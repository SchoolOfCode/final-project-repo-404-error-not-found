import { deleteMentee, updateMentee, getMentee } from '../../../models/mentee'

export default async function (req, res) {
  const HTTPMethod = req.method
  let id = req.query.menteesid
  let objectToUpdate = req.body

  // {email: simon@prato}

  switch (HTTPMethod) {
    case 'GET':
      const mentee = await getMentee(id)
      //call some imported function that handles logic/sql queries
      res.status(200).json(mentee)
      break
    case 'PATCH':
      id = String(id)
      console.log('ID:' + id, ' Body: ' + objectToUpdate)

      const editMentee = await updateMentee(id, objectToUpdate)
      //call some imported function that handles logic/sql queries
      res.status(200).json(editMentee)
      break
    case 'DELETE':
      //call some imported function that handles logic/sql queries
      // let id = req.params.mentorsid;
      console.log(id)
      const menteeToDelete = await deleteMentee(id)
      res.status(200).json(menteeToDelete)
      break
    default:
      res.setHeader('Allow', ['PATCH', 'DELETE', 'GET'])
      res.status(405).end(`Method ${HTTPMethod} not Allowed`)
  }
}
