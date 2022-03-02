import { getAllMentees, createMentee } from '../../../models/mentee'

export default async function (req, res) {
  const HTTPMethod = req.method

  switch (HTTPMethod) {
    case 'GET':
      //call some imported function that handles logic/sql queries
      const mentees = await getAllMentees()
      res.status(200).json(mentees)
      break
    case 'POST':
      //call some imported function that handles logic/sql queries
      const mentee = await createMentee(req.body)
      res.status(200).json(mentee)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${HTTPMethod} not Allowed`)
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
