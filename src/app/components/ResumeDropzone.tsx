"use client";
import { useState } from "react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FormData from "form-data";
import { Flex, useToast } from "@chakra-ui/react";
import { parseResumeFromPdf } from "../lib/parse-resume-from-pdf";
import fs from "fs";

import { useRouter } from "next/navigation";
// import addPdfSrc from "public/assets/add-pdf.svg";
import addPdfSrc from "../../../public/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "../lib/cx";
import { Spinner } from "@chakra-ui/react";
import ResumeData, { ResumeDataProps } from "./documentation/tableS";

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};
let data: ResumeDataProps = {
  personal_infos: {
    name: {
      first_name: "deen shah",
      last_name: "",
      raw_name: "Deen Shah",
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
export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
  show = false,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  playgroundView?: boolean;
  show?: boolean;
}) => {
  const toast = useToast();

  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeDataProps>(data);

  const hasFile = Boolean(file.name);

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl);
    }

    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ name, size, fileUrl });
    onFileUrlChange(fileUrl);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (newFile.name.endsWith(".pdf")) {
      setHasNonPdfFile(false);
      setNewFile(newFile);
    } else {
      setHasNonPdfFile(true);
    }
    setIsHoveredOnDropzone(false);
  };

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newFile = files[0];

    if (newFile.size > 1024 * 1024) {
      toast({
        title: "FILE SIZE ERROR",
        position: "top",
        description: "File size exceeds the maximum limit of 1MB.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    setNewFile(newFile);
    toast({
      title: "File Uploaded",
      position: "top",
      description:
        "Your file has been uploaded successfully. Analysis of your file is in progress. This may take a few moments.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    if (!show) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("providers", "senseloaf");
    formData.append("file", files[0]); // Append the file directly
    formData.append("fallback_providers", "");

    // Now you can send formData to the server using Axios or fetch

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/ocr/resume_parser",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_AUTH}`,

        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        if (response?.data?.senseloaf?.extracted_data) {
          setResumeData(response?.data?.senseloaf?.extracted_data);
        } else {
          setResumeData(response?.data?.["eden-ai"]?.extracted_data);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: "PARSING ERROR",
          position: "top",
          description: "SOME THING WENT WRONG !",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
        console.error(error);
      });
  };
  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const onImportClick = async () => {
    const resume = await parseResumeFromPdf(file.fileUrl);
  };

  return (
    <>
      <div
        className={cx(
          "flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 ",
          isHoveredOnDropzone && "border-sky-400",
          playgroundView ? "pb-6 pt-4" : "py-12",
          className
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setIsHoveredOnDropzone(true);
        }}
        onDragLeave={() => setIsHoveredOnDropzone(false)}
        onDrop={onDrop}
      >
        <div
          className={cx(
            "text-center",
            playgroundView ? "space-y-2" : "space-y-3"
          )}
        >
          {!playgroundView && (
            <Image
              src={"https://i.stack.imgur.com/Zpt8n.jpg"}
              className="mx-auto h-14 w-14"
              alt="Add pdf"
              aria-hidden="true"
              priority
            />
          )}
          {!hasFile ? (
            <>
              <p
                className={cx(
                  "pt-3 text-white-700",
                  !playgroundView && "text-lg font-semibold"
                )}
              >
                Browse a pdf file or drop it here
              </p>
              <p className="flex text-sm text-white-500">
                <LockClosedIcon className="mr-1 mt-1 h-3 w-3 text-white" />
                File data is used locally and never leaves your browser
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center gap-3 pt-3">
              <div className="pl-7 font-semibold text-white-900">
                {file.name} - {getFileSizeString(file.size)}
              </div>
              <button
                type="button"
                className="outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                title="Remove file"
                onClick={onRemove}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          )}
          <div className="pt-4">
            {!hasFile ? (
              <>
                <label
                  className={cx(
                    "within-outline-theme-purple cursor-pointer rounded-full px-6 pb-2.5 pt-2 font-semibold shadow-sm",
                    playgroundView ? "border" : "bg-primary"
                  )}
                >
                  Browse file
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf"
                    onChange={onInputChange}
                  />
                </label>
                {hasNonPdfFile && (
                  <p className="mt-6 text-red-400">
                    Only pdf file is supported
                  </p>
                )}
              </>
            ) : (
              <>
                {!playgroundView && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={onImportClick}
                  >
                    Import and Continue <span aria-hidden="true">→</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {show && !loading ? <ResumeData data={resumeData} /> : null}
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
};

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};
