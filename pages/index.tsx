import Linked from "@/src/ui/link"
import { Box, Text } from "@chakra-ui/react"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <Box>
      <Text variant="heading">Lyra Live</Text>

      <Box layerStyle={ "card" } p={ 4 } my={ 4 }>
        <Linked href="/leaderboard" label="Leaderboard" />
      </Box>
    </Box>
  )
}

export default Home
