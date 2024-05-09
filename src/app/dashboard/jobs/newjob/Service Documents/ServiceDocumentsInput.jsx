"use client";
import {
  ArrowPathRoundedSquareIcon,
  BanknotesIcon,
  PlusIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UploadProgress from "./UploadProgress";
import DocuemntDropBox from "./DocumentDropBox";
import FileComponent from "./FileComponent";
import AddDocumentButton from "./AddDocumentButton";
import { pdfjs } from "react-pdf";
import { SparklesIcon } from "@heroicons/react/24/outline";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function ServiceDocumentUpload({
  setSelectedFiles,
  selectedFiles,
  handleFileDisplayNameChange,
  handleDeleteFile,
}) {
  const [uploadProgress, setUploadProgress] = useState(0);

  const getPageNumber = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const fileInfo = file;

      if (fileInfo) {
        reader.onload = function () {
          var typedArray = new Uint8Array(this.result);

          const task = pdfjs.getDocument(typedArray);

          task.promise.then((pdf) => {
            console.log(pdf.numPages, "NUM PAGES");
            resolve(pdf.numPages);
          });
        };

        reader.readAsArrayBuffer(fileInfo);
      } else {
        reject(new Error("No file provided"));
      }
    });
  };
  const handleFileSelect = async (e) => {
    const files = e.target.files;

    const fileArray = await Promise.all(
      Array.from(files).map(async (file) => {
        const pageNum = await getPageNumber(file);
        
        return {
          file: file,
          displayName: file.name,
          id: uuidv4(),
          numPages: pageNum ? pageNum : "NA",
        };
      })
    );

    setSelectedFiles((cur) => [...cur, ...fileArray]);
    handleUpload(fileArray.map((cur) => cur.file));
  };

  const handleAddNoFile = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();

      return;
    }
    e.preventDefault();
    const newArrayItem = {
      file: null,
      displayName: "",
      id: uuidv4(),
      numPages: 0,
    };

    setSelectedFiles((cur) => [...cur, newArrayItem]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileSelect({ target: { files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    // Add any visual indication when drag enters, like changing the background color
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Remove any visual indication when drag leaves
  };

  const handleUpload = (files) => {
    const totalSize = files.reduce((acc, file) => {
      return acc + file.size;
    }, 0);

    let uploadSize = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        uploadSize += file.size;
        const progress = Math.round((uploadSize / totalSize) * 100);

        setUploadProgress(progress);
      };

      reader.readAsDataURL(file);
    });

    setTimeout(() => {
      setUploadProgress(0);
    }, 2000);
  };

  return (
    <div className=" ">
      <div className="flex">
        <div className="w-full md:w-2/3 ">
          <DocuemntDropBox
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleFileSelect={handleFileSelect}
          />
          {selectedFiles.length > 0 ? (
            <div className={`flex flex-wrap gap-4 py-4 relative ${selectedFiles.length <= 2 ? 'pb-[15rem]': ""}`}>
              {selectedFiles.map((file, i) => {
                return (
                  <div className={`relative `} key={file.id}>
                    <FileComponent
                      file={file}
                      handleFileDisplayNameChange={handleFileDisplayNameChange}
                      key={file.id}
                      i={i}
                      length={selectedFiles.length}
                      handleDeleteFile={handleDeleteFile}
                      handleAddNoFile={handleAddNoFile}
                      style={{ zIndex: 1 }} // Add z-index to each FileComponent
                    />
                  </div>
                );
              })}
              <div className="absolute right-0 top-0">
                <div className="flex flex-col justify-start items-center w-[15rem] ">
                  <div className="h-16 w-16 text-white bg-indigo-600 mt-4 rounded-full flex  justify-center items-center mb-2">
                    <div className="h-10 w-10 text-white m-auto  ">
                      <SparklesIcon />
                    </div>
                  </div>
                  <div className="">
                    <div className="">AI Data Entry 28 Credits Left</div>
                    <div className=""></div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center w-[15rem]">
                  <div className="h-16 w-16 text-white bg-indigo-600 mt-4 rounded-full flex  justify-center items-center mb-2">
                    <div className="h-10 w-10 text-white m-auto  ">
                      <ArrowPathRoundedSquareIcon />
                    </div>
                  </div>
                  <div className="">
                    <div className="">Merge Documents into one PDF</div>
                    <div className=""></div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center w-[15rem] pb-10">
                  <div className="h-16 w-16 text-white bg-indigo-600 mt-4 rounded-full flex  justify-center items-center mb-2">
                    <div className="h-10 w-10 text-white m-auto  ">
                      <BanknotesIcon />
                    </div>
                  </div>
                  <div className="">
                    <div className="">Add 54 Pages to Invoice</div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <AddDocumentButton handleAddNoFile={handleAddNoFile} />
          )}

          {uploadProgress > 0 && (
            <UploadProgress uploadProgress={uploadProgress} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDocumentUpload;
