"use client";
import { useState, useEffect } from "react";

import { readPdf } from "../lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "../lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "../lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "../lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "../lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "../components/ResumeDropzone";

import { ResumeTable } from "../resume-parser/ResumeTable";
import Link from "next/link";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import ResumeData, {
  ResumeDataProps,
} from "../components/documentation/tableS";
let data: ResumeDataProps = {
  personal_infos: {
    name: {
      first_name: "Naseeb",
      last_name: "Khan",
      raw_name: "Naseeb Khan",
      middle: "",
      title: "",
      prefix: null,
      sufix: null,
    },
    address: {
      formatted_location: "Haryana India",
      postal_code: "",
      region: "Haryana",
      country: "India",
      country_code: "+0",
      raw_input_location: null,
      street: "",
      street_number: null,
      appartment_number: null,
      city: "",
    },
    self_summary:
      "SUMMARY SUMMARY Results - driven Full Stack Developer with expertise in React , React Native , Express , Node.js , and MongoDB . Proven ability to design , develop , and deploy end - to - end applications , specializing in responsive interfaces and cross - platform mobile development . Skilled in problem - solving and collaboration within Agile methodologies . Eager to contribute technical proficiency and passion for innovation to create exceptional solutions .",
    objective: "",
    date_of_birth: null,
    place_of_birth: null,
    phones: ["08396990092"],
    mails: ["lineo3551@gmail.com"],
    urls: [
      "https://play.google.com/store/apps/details?id=com.aekatra.customers",
      "https://quickiii.com/",
      "https://shahstore.vercel.app/",
      "https://seller.quickiii.com/dashboard",
      "https://medicallaboratorytechnology-naseeb-shah.vercel.app/",
      "https://naseeb-shah.github.io/Portfolio-/",
    ],
    fax: [],
    current_profession: "Full   stack Web Developer",
    gender: null,
    nationality: null,
    martial_status: null,
    current_salary: null,
  },
  education: {
    total_years_education: null,
    entries: [
      {
        title: "Full Stack Web",
        start_date: "01-05-2021",
        end_date: "01-07-2022",
        location: {
          formatted_location: "Bengaluru  India",
          postal_code: null,
          region: null,
          country: null,
          country_code: null,
          raw_input_location: null,
          street: null,
          street_number: null,
          appartment_number: null,
          city: null,
        },
        establishment: "Masai School",
        description: null,
        gpa: "",
        accreditation: "",
      },
      {
        title: "Bachelor of Commerce",
        start_date: "01-06-2018",
        end_date: "01-07-2021",
        location: {
          formatted_location: "Haryana  India",
          postal_code: null,
          region: null,
          country: null,
          country_code: null,
          raw_input_location: null,
          street: null,
          street_number: null,
          appartment_number: null,
          city: null,
        },
        establishment: "Kurukshetra University",
        description: null,
        gpa: "",
        accreditation: "",
      },
    ],
  },
  work_experience: {
    total_years_experience: "1.4",
    entries: [
      {
        title: "Full   stack Web Developer",
        start_date: "01-11-2022",
        end_date: null,
        company: "Aekatr Technology and Services Pvt . Ltd.   Quickiii",
        location: {
          formatted_location: "Panipat , India",
          postal_code: null,
          region: null,
          country: null,
          country_code: null,
          raw_input_location: null,
          street: null,
          street_number: null,
          appartment_number: null,
          city: null,
        },
        description: "",
        industry: null,
      },
    ],
  },
  languages: [
    {
      name: "English",
      code: null,
    },
    {
      name: "Hindi",
      code: null,
    },
  ],
  skills: [
    {
      name: "Html",
      type: "Hard Skills",
    },
    {
      name: "Cascading Style Sheets",
      type: "Hard Skills",
    },
    {
      name: "Javascript",
      type: "Hard Skills",
    },
    {
      name: "React",
      type: "Hard Skills",
    },
    {
      name: "Redux (Javascript Library)",
      type: "Hard Skills",
    },
    {
      name: "Node Js",
      type: "Hard Skills",
    },
    {
      name: "React Native",
      type: "Hard Skills",
    },
    {
      name: "Data Base Management System Software",
      type: "Hard Skills",
    },
    {
      name: "Github",
      type: "Hard Skills",
    },
    {
      name: "Postman",
      type: "Hard Skills",
    },
    {
      name: "Typescript",
      type: "Hard Skills",
    },
    {
      name: "Communication",
      type: "Soft Skills",
    },
    {
      name: "Teamwork",
      type: "Soft Skills",
    },
    {
      name: "Problem Solving",
      type: "Soft Skills",
    },
    {
      name: "Time Management",
      type: "Soft Skills",
    },
    {
      name: "Language",
      type: "Soft Skills",
    },
    {
      name: "Solution Stack",
      type: "Hard Skills",
    },
    {
      name: "Software Development",
      type: "Hard Skills",
    },
    {
      name: "Node.Js",
      type: "Hard Skills",
    },
    {
      name: "Design",
      type: "Hard Skills",
    },
    {
      name: "Application Software",
      type: "Hard Skills",
    },
    {
      name: "Api",
      type: "Hard Skills",
    },
    {
      name: "Collaboration",
      type: "Soft Skills",
    },
    {
      name: "Agile Software Development",
      type: "Hard Skills",
    },
    {
      name: "Innovation",
      type: "Soft Skills",
    },
    {
      name: "Web Developer",
      type: "Hard Skills",
    },
    {
      name: "React.Js",
      type: "Hard Skills",
    },
    {
      name: "Web Applications",
      type: "Hard Skills",
    },
    {
      name: "Code",
      type: "Hard Skills",
    },
    {
      name: "Management",
      type: "Soft Skills",
    },
    {
      name: "Web Server",
      type: "Hard Skills",
    },
    {
      name: "Database Administration",
      type: "Hard Skills",
    },
    {
      name: "Express.Js",
      type: "Hard Skills",
    },
  ],
};

const defaultFileUrl = "/example/a.pdf";
export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);

  const [resumeData, setResumeData] = useState<ResumeDataProps>(data);

  const [status, setStatus] = useState<"nodata" | "data" | "show">();
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function test() {
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
    }
    test();
  }, [fileUrl]);

  return (
    <>
      <Text
        fontSize="xl"
        fontWeight="bold"
        textAlign={"center"}
        css={{
          background: "linear-gradient(45deg, #3498db, #2ecc71)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontSize: "24px",
        }}
      >
        PARSER - A
      </Text>
      <Flex
        textAlign={"center"}
        textDecor={"underline"}
        color="blue.600"
        justifyContent={"center"}
      >
        <Link href={"/parser"}>Use Parser - B Click Here</Link>
      </Flex>
      <div
        className="mt-4"
        style={{ width: "80%", margin: "auto", marginTop: 50 }}
      >
        <ResumeDropzone
          onFileUrlChange={(fileUrl) => setFileUrl(fileUrl || defaultFileUrl)}
          playgroundView={true}
          show={false}
        />
      </div>
      <Flex w={"80%"} m={"auto"}>
        <ResumeTable resume={resume} />
      </Flex>
    </>
  );
}
