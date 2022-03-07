import query from '../database/index.js'

//get all connections for mentor
export async function getConnectionMentor(id) {
  const response = await query(
    'SELECT * FROM connection WHERE mentor_id = $1;',
    [id]
  )
  return response.rows
}
//get all connections for mentee
export async function getConnectionMentee(id) {
  const response = await query(
    'SELECT * FROM connection WHERE mentee_id = $1;',
    [id]
  )
  return response.rows
}
// create connection from mentee side
export async function createConnection(data) {
  const { mentee_id, mentor_id } = data
  const status = 'pending'
  const res = await query(
    'INSERT INTO connection (mentee_id, mentor_id, status) VALUES ($1, $2, $3)',
    [mentee_id, mentor_id, status]
  )
  return res.rows
}

//delete connection
export async function deleteConnection(id) {
  let response = await query('DELETE FROM connection WHERE id = $1;', [id])
  return response
}

export async function updateStatus(data) {
  const {id} = data
  const status = 'accepted'
  const response = await query(
    `UPDATE connection SET status = ($1) WHERE id = ($2);`,
    [status, id]
  )
  return response
}
