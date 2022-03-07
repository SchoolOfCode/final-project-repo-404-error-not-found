import {
  getConnectionMentor,
  deleteConnection,
} from '../../../models/connection'

export default async function (req, res) {
  const HTTPMethod = req.method
  let id = req.query.getConnectionMentor

  switch (HTTPMethod) {
    case 'GET':
      const actionMentor = await getConnectionMentor(id)
      // fetching relation/connection of the mentor
      res.status(200).json(actionMentor)
      break
    case 'DELETE':
      const deleteConnection = await deleteConnection(id)
      // request to delete that connection
      res.status(200).json(deleteConnection)
      break

    default:
      res.setHeader('Allow', ['DELETE', 'GET'])
      res.status(405).end(`Method ${HTTPMethod} not Allowed`)
  }
}
