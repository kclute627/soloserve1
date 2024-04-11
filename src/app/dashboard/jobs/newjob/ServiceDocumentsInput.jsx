"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { TransitionGroup, CSSTransition } from "react-transition-group";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function ServiceDocumentUpload({
  setSelectedFiles,
  selectedFiles,
  handleFileDisplayNameChange,
  handleDeleteFile,
}) {
  const [uploadProgress, setUploadProgress] = useState(0);

  const getPageNumber = async (file) => {
    const reader = new FileReader();
    const fileInfo = file;

    if (fileInfo) {
      reader.readAsBinaryString(fileInfo);
      try {
        const count = await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const pageCount =
              reader.result.match(/\/Type[\s]*\/Page[^s]/g)?.length || 0;
            resolve(pageCount);
          };
          reader.onerror = reject;
        });
        console.log(count, "count");
        return count;
      } catch (error) {
        console.log(error);
      }
    }
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
          <TransitionGroup className="flex flex-wrap gap-4 items-center mt-4 relative z-10">
            {selectedFiles.length > 0 ? (
              <DragDropContext onDragEnd={handleDragEnd} className="bg-gray-800">
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided) => (
                    <div
                      className=""
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        alignItems: "center",
                        marginTop: "5px",
                      }}
                    >
                      {selectedFiles.map((file, i) => {
                        return (
                          <Draggable
                            key={file.id}
                            index={i}
                            draggableId={file.id}
                           
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CSSTransition
                                  timeout={500}
                                  classNames="file "
                                  key={file.id}
                                >
                                  <FileComponent
                                    file={file}
                                    handleFileDisplayNameChange={
                                      handleFileDisplayNameChange
                                    }
                                    key={file.id}
                                    i={i}
                                    length={selectedFiles.length}
                                    handleDeleteFile={handleDeleteFile}
                                    handleAddNoFile={handleAddNoFile}
                                  />
                                </CSSTransition>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <></>
            )}
          </TransitionGroup>

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
        <div className="flex justify-center items-center w-1/3">
          <div className="h-20 w-20 bg-slate-600"></div>
        </div>
      </div>
    </div>
  );
}

// add some animation
// ai button filled if one
// + button only on the last one
// drag to the top
// add toast for progrss

const FileComponent = ({
  file,
  handleFileDisplayNameChange,
  i,
  length,
  handleDeleteFile,
  handleAddNoFile,
}) => {
  const newFile = file.file;
  const { displayName } = file;
  const baseClass = `px-4 py-4 w-full md:w-[32rem] rounded-xl border border-slate-700 p-5 flex drop-shadow-xl cursor-grab relative   `;

  const commonDocuments = [
    "Summons",
    "Complaint",
    "Answer",
    "Motion",
    "Discovery",
    "Summons 3",
    "Summons 8"
  ];
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(file.displayName || "");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSuggestionIndex !== -1) {
        handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
      }
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
   
    //Display only 5 docuemnts
    if (inputValue.trim() !== "") {
      setSuggestions(
        commonDocuments
          .filter((doc) => doc.toLowerCase().includes(inputValue.toLowerCase()))
          .slice(0, 2) // Limit to first 5 suggestions
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    // Optionally, you can call your handler here to update the display name
    handleFileDisplayNameChange({ target: { value: suggestion } }, file.id);
  };

  return (
    <div
      className={
        i == 0 ? baseClass + " bg-yellow-200  " : baseClass + " bg-slate-200"
      }
      key={file.id}
    >
      <div className="w-3/4 relative z-[10] ">
        <label
          htmlFor="displayName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Affidavit Text
        </label>
        <div className="mt-1 relative" >
          <input
            name="displayName"
            key={`${file.id}-input`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 relative z-[300]"
            placeholder="Affidavit Text"
            onKeyDown={handleKeyDown}
          />
          {suggestions.length > 0 && inputValue.trim() !== "" && (
            <ul className="absolute top-full left-0 z-[99999999] w-full bg-white border-red-100 rounded-sm py-4 max-h-[150px] overflow-y-auto border-solid">
              {suggestions.map((suggestion, index) => (
                <li
                  className=""
                  style={{
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderBottom: "1px solid #ccc",
                    backgroundColor:
                      index === selectedSuggestionIndex
                        ? "#f0f0f0"
                        : "transparent",
                  }}
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {newFile && (
          <div className=" mt-2 text-sm font-medium leading-6 text-gray-900">
            <div className="flex">
              <div className="mr-2">File Name:</div>
              <div className="text-gray-700 line-clamp-1">
                {newFile ? newFile.name : ""}
              </div>
            </div>
            {file.numPages == "NA" ? (
              <div className="font-bold">Page Count Error</div>
            ) : file.numPages ? (
              <div className="font-bold">{`${file.numPages} Page${
                file.numPages > 1 ? "s" : ""
              }`}</div>
            ) : (
              <div className=""></div>
            )}
          </div>
        )}
      </div>
      <div className="left flex justify-center px-4">
        <div className="flex justify-around items-center h-full space-x-1  cursor-default">
          <button onClick={(e) => handleDeleteFile(e, file.id)}>
            <div className="text-red-500 hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </button>
          {i === 0 && (
            <button>
              <div className="text-teal-700 hover:text-teal-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>
            </button>
          )}

          {i === length - 1 && (
            <button onClick={(e) => handleAddNoFile(e)}>
              <div className="text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <div className=""></div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function Input() {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Email
      </label>
      <div className="mt-2">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
          aria-describedby="email-description"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        We'll only use this for spam.
      </p>
    </div>
  );
}

export default ServiceDocumentUpload;
