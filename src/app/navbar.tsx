import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="rgb(31,42,55)"
      color="text"
    >
      <Text
        as={Link}
        href="/"
        fontSize="xl"
        fontWeight="bold"
        css={{
          background: "linear-gradient(45deg, #3498db, #2ecc71)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontSize: "24px",
        }}
      >
        RESUME PARSER
      </Text>
      <Flex
        align="center"
        fontWeight="bold"
        w={"30%"}
        justifyItems={"space-between"}
        justifyContent={"space-between"}
      >
        <Text mr="4" as={Link} href="/resume-parser">
          Resume Parser -A
        </Text>
        <Text mr={"8"} as={Link} href={"/parser-1"}>
          Resume Parser -B
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
