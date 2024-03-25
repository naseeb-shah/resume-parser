"use client";
import { useState, useEffect } from "react";

import { readPdf } from "../lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "../lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "../lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "../lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "../lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "../components/ResumeDropzone";
import { cx } from "../lib/cx";
import { Link, Paragraph } from "../components/documentation";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import ResumeData, {
  ResumeDataProps,
} from "../components/documentation/tableS";

const defaultFileUrl = "https://";
export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);

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
      <div
        className="mt-4"
        style={{ width: "80%", margin: "auto", marginTop: 50 }}
      >
        <ResumeDropzone
          onFileUrlChange={(fileUrl) => setFileUrl(fileUrl || defaultFileUrl)}
          playgroundView={true}
          show={true}
        />
      </div>
      <Flex w={"100%"} p={"2%"} m={"auto"}>
        <Box w={"45%"} mr={"3%"} ml={"3%"}></Box>
        <Box w={"45%"}></Box>
      </Flex>
    </>
  );
}
