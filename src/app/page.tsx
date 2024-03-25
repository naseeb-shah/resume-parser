import { Box, Button, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Home = () => {
  return (
    <Box p={4} w={"95%"} margin={"auto"}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Welcome to ResumeParser!
      </Text>
      <Text fontSize="lg" mb={6}>
        ResumeParser is an innovative tool designed to simplify the process of
        parsing and organizing resume data. With ResumeParser, you can
        effortlessly extract vital information from resumes, including personal
        details, education history, work experience, skills, and more.
      </Text>
      <Text fontSize="lg" mb={6}>
        Whether you re a recruiter looking to streamline your hiring process or
        an individual aiming to present your qualifications effectively,
        ResumeParser is here to help.
      </Text>
      <Button colorScheme="blue" mr={4}>
        <NextLink href="https://github.com/naseeb-shah" passHref>
          <Link textDecoration="none" isExternal>
            View on GitHub
          </Link>
        </NextLink>
      </Button>
      <Button colorScheme="blue">
        <NextLink
          href="https://www.linkedin.com/in/naseeb-khan-deenshah/"
          passHref
        >
          <Link textDecoration="none" isExternal>
            Connect on LinkedIn
          </Link>
        </NextLink>
      </Button>
      <Text fontSize="lg" mt={6}>
        For inquiries or collaborations, feel free to email me at{" "}
        <Link href="mailto:shahnaseeb1010@gmail.com" textDecoration="underline">
          shahnaseeb1010@gmail.com
        </Link>
        .
      </Text>
      <Text fontSize="lg" mt={6}>
        We re constantly working on improving ResumeParser to better serve your
        needs. Whether it s enhancing parsing accuracy, adding new features, or
        providing better user experience, your feedback is invaluable to us. Don
        t hesitate to reach out with suggestions or feature requests!
      </Text>
      <Text fontSize="lg" mt={6}>
        Ready to get started? Upload your resume now and experience the
        convenience of automated resume parsing with ResumeParser!
        <Button colorScheme="blue" m={5}>
          <NextLink href="/resume-parser" passHref>
            <Link textDecoration="none">Get Started</Link>
          </NextLink>
        </Button>
      </Text>
    </Box>
  );
};

export default Home;
