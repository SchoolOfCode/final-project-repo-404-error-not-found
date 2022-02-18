import mentors from '../../../database/mock-data'
import { getAllMentors, createMentor } from '../../../models/mentors'

export default async function (req, res) {
  const HTTPMethod = req.method

  switch (HTTPMethod) {
    case 'GET':
      //call some imported function that handles logic/sql queries
      const mentors = await getAllMentors()
      res.status(200).json(mentors)
      break
    case 'POST':
      //call some imported function that handles logic/sql queries
      const mentor = await createMentor(req.body)
      res.status(200).json(mentor)
      break
    case 'PATCH':
      //call some imported function that handles logic/sql queries
      res.status(200).json(mentors)
      break
    case 'DELETE':
      //call some imported function that handles logic/sql queries
      res.status(200).json({})
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${HTTPMethod} not Allowed`)
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
