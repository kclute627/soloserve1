"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FileComponent from "./FileComponent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { pdfjs } from "react-pdf";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { resolve } from "styled-jsx/css";

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    setSelectedFiles(reorder(selectedFiles, source.index, destination.index));
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="flex">
        <div className="w-full md:w-2/3 ">
          <label
            htmlFor="cover-photo"
            className="block text-lg md:text-2xl font-bold leading-6 text-gray-900"
          >
            Service Documents
          </label>
          <div
            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload Service Files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    multiple
                    type="file"
                    className="sr-only"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PDF, JPG</p>
            </div>
          </div>

          {selectedFiles.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedFiles.map((file, i) => {
                return (
                  <div className={`relative z-[${1000 - i}]`}>
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
            </div>
          ) : (
            <></>
          )}

          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded">
                <div
                  className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDocumentUpload;
