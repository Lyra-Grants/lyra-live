import { ApolloClient, InMemoryCache } from '@apollo/client'

const SUBGRAPH_URI =
  'https://api.thegraph.com/subgraphs/name/lyra-finance/mainnet'

export const apolloClient = new ApolloClient({
  uri: SUBGRAPH_URI,
  cache: new InMemoryCache(),
})