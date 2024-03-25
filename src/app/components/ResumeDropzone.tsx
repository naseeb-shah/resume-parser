import { useState } from "react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FormData from "form-data";

import { parseResumeFromPdf } from "../lib/parse-resume-from-pdf";
import fs from "fs";

import { useRouter } from "next/navigation";
// import addPdfSrc from "public/assets/add-pdf.svg";
import addPdfSrc from "../../../public/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "../lib/cx";
import { deepClone } from "../lib/deep-clone";

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  playgroundView?: boolean;
}) => {
  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState(false);

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

    setNewFile(newFile);
    const formData = new FormData();
    formData.append("providers", "senseloaf");
    formData.append("file", files[0]); // Append the file directly
    formData.append("fallback_providers", "eden-ai");

    // Now you can send formData to the server using Axios or fetch

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/ocr/resume_parser",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZDJhZDdiYWUtMmVjMi00YWI2LTljOWMtNmE4YzBkY2ZhZmJmIiwidHlwZSI6ImFwaV90b2tlbiJ9.FLCt2hahNBSD3t-PIfBkh3Pw_2nLvxJpzXhsDUZGGgY",

        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    console.log("lien 222");
    // axios
    //   .request(options)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const onImportClick = async () => {
    const resume = await parseResumeFromPdf(file.fileUrl);
  };

  return (
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
                <p className="mt-6 text-red-400">Only pdf file is supported</p>
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
