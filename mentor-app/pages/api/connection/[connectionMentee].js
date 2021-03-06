import {
  getConnectionMentee,
  deleteConnection,
} from '../../../models/connection'

export default async function (req, res) {
  const HTTPMethod = req.method
  let id = req.query.connectionMentee

  switch (HTTPMethod) {
    case 'GET':
      const actionMentee = await getConnectionMentee(id)
      // fetching relation/connection of the mentor
      res.status(200).json(actionMentee)
      break
    case 'DELETE':
      const actionDelete = await deleteConnection(id)
      // request to delete that connection
      res.status(200).json(actionDelete)
      break

    default:
      res.setHeader('Allow', ['DELETE', 'GET'])
      res.status(405).end(`Method ${HTTPMethod} not Allowed`)
  }
}
