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

export function fetchTraderData() {
  let traderData: any = []

  fetch(`${API_URL}/data/traders`
  , { credentials: 'include', method: 'GET',  }
  )
  .then(resp => resp.json())
  .then(itemArray => {
    itemArray.forEach((item: any) => traderData.push(item))
  })

  return traderData
}

export function fetchSocialData() {
    let socialData: any = []
  
    fetch(`${API_URL}/data/social`
    , { credentials: 'include', method: 'GET',  }
    )
    .then(resp => resp.json())
    .then(itemArray => {
      itemArray.forEach((item: any) => socialData.push(item))
    })
  
    return socialData
  }

