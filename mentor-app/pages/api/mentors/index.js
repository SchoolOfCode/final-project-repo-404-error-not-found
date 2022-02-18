// export default async function (req, res) {
//   const HTTPMethod = req.method

//   switch (HTTPMethod) {
//     case 'GET':
//       res.status(200).send('hey there')
//       break
//     case 'POST':
//       const newItem = {
//         id: id,
//         title: title,
//         author: author,
//       }
//       db.push(newItem)
//       res.status(200).json({ id: id, title: title, author: author })
//       break
//     default:
//       res.setHeader('Allow', ['GET', 'POST'])
//       res.status(405).end(`Method ${HTTPMethod} not Allowed`)
//   }
// }

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
