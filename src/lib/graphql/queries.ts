import { gql } from "@apollo/client"


export type TradesQueryType = {
  __typename: string
  id: string
  trader: string
}


export const GET_TRADES = gql`
  query Trades($lastID: String) {
    trades(first: 1000, where: { id_gt: $lastID}) {
      id
      trader
    }
  }
`