import Nav from "@/src/components/nav";
import SideBar from "@/src/components/side-bar";
import { theme } from "@/src/theme";
import { ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lyra Live</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <ChakraProvider theme={theme}>
        <Nav />
        <Flex py={6} px={8}>
          <SideBar />
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
