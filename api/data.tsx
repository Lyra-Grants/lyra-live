// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

const API_URL = 'https://'

export function fetchUserData() {
  let userData: any = []

  fetch(`${API_URL}/data`
  , { credentials: 'include', method: 'GET',  }
  )
  .then(resp => resp.json())
  .then(itemArray => {
    itemArray.forEach((item: any) => userData.push(item))
  })

  return userData
}

