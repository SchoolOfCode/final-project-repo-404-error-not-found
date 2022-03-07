import { createConnection, updateStatus } from "../../../models/connection";

export default async function (req, res) {
  const HTTPMethod = req.method

  switch (HTTPMethod) {
    case 'POST':
      // create new connection between both DB
      const response = await createConnection(req.body)
      res.status(200).json(response)
      break
    case 'PUT':
      // updating status 
      const response = await updateStatus(req.body)
      res.status(200).json(response)
      break
    default:
      res.setHeader('Allow', ['POST', 'PUT'])
      res.status(405).end(`Method ${HTTPMethod} not Allowed`)
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
