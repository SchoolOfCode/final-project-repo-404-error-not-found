import { getConnectionMentee, deleteConnection} from "../../../models/connection";

export default async function (req, res) {
  const HTTPMethod = req.method
  let id = req.query.getConnectionMentee

  switch (HTTPMethod) {
    case 'GET':
      const response = await getConnectionMentee (id)
      // fetching relation/connection of the mentor
      res.status(200).json(response)
      break
    case 'DELETE':
     
      const response = await deleteConnection(id)
      // request to delete that connection
      res.status(200).json(response)
      break
    
    default:
      res.setHeader('Allow', ['DELETE', 'GET'])
      res.status(405).end(`Method ${HTTPMethod} not Allowed`)
  }
}
