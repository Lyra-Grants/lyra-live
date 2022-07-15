import { HStack, Text, Box } from "@chakra-ui/react"
import Image from "next/image"

import LyraLogo from '../../assets/png/lyra-logo.png'

const Logo = () => {
  return (
    <HStack>
      <Image
        src={ LyraLogo }
        alt="logo"
        height={ '50px' }
        width={ '50px' }
      />
      <Text fontFamily={ "Audiowide" } fontSize={ "4xl" }>
        Lyra Live
      </Text>
    </HStack>
  )
}

export default Logo
