import { HStack, Image, Text, Box } from "@chakra-ui/react";

const Logo = () => {
  return (
    <HStack height={"100%"}>
      <Image
        src="https://pbs.twimg.com/profile_images/1496137062688382984/YayvjkRp_400x400.jpg"
        alt="logo"
        height={"60%"}
        borderRadius={"50%"}
      />
      <Text fontFamily={"Audiowide"} fontSize={"4xl"}>
        Lyra Live
      </Text>
    </HStack>
  );
};

export default Logo;
