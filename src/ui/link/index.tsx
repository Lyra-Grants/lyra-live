import { ChakraProps, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

const Linked = ({
  href,
  label,
  sx,
}: {
  href: string;
  label: ReactNode;
  sx?: ChakraProps["sx"];
}) => {
  return (
    <Link href={href} passHref>
      <ChakraLink sx={sx}>{label}</ChakraLink>
    </Link>
  );
};

export default Linked;
