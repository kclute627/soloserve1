"use client";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

const commonDocuments = [
  "Summons",
  "Complaint",
  "Answer",
  "Motion",
  "Discovery",
];

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
  const baseClass = `px-4 py-4 h-[10rem] w-full md:w-[35rem] rounded-xl border border-slate-700 p-5 drop-shadow-xl flex bg-slate-200 relative z-0`;

  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(file.displayName || "");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [clickedInput, setClickedInput] = useState(0);
  const [index, setIndex] = useState(i); // Add a state to force re-render
  const [baseZ, setBaseZ] = useState(9);
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
    // setClickedInput(i);
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
    // setClickedInput(i);
    setSuggestions([]);
    // Optionally, you can call your handler here to update the display name
    handleFileDisplayNameChange({ target: { value: suggestion } }, file.id);
  };
  const clearDisplayName = () => {
    console.log("clicked!!!!")
    setInputValue("");
    handleFileDisplayNameChange({ target: { value: "" } }, file.id);
  };
  const handleZ = () => {
    setClickedInput((prevIndex) => (prevIndex === index ? prevIndex : index));
    setBaseZ((prev) => prev + 1);
    setIndex((prevIndex) => prevIndex);
    console.log(index, "handleZ i", clickedInput, "Clicked input ");
  };
  return (
    /// to do only make the dropdown open for one docuemnt

    <div
      className={`${baseClass} ${i == 0 ? "bg-yellow-200" : "bg-slate-300"}`}
      key={file.id}
    >
      <div className="w-3/4">
        <label
          htmlFor="displayName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Affidavit Text
        </label>
        <div className="mt-1 relative z-0">
          <div
            className="absolute top-1.5 right-2 z-[90] h-6 w-6"
            onClick={clearDisplayName}
          >
            <XCircleIcon />
          </div>
          <input
            name="displayName"
            key={`${file.id}-input`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 relative z-[9] pr-10"
            placeholder="Affidavit Text"
            onKeyDown={handleKeyDown}
            autoComplete="off"
            onClick={() => handleZ(i)}
            onFocus={() => handleZ(i)}
            onInput={() => handleZ(i)}
          />

          <div className="relative z-[99999999999999999]">
            <AutoCompleteDoc
              suggestions={suggestions}
              selectedSuggestionIndex={selectedSuggestionIndex}
              handleSelectSuggestion={handleSelectSuggestion}
              i={i}
            />
          </div>
        </div>

        {newFile && (
          <div className=" mt-2 text-sm font-medium leading-6 text-gray-900">
            <div className="flex overflow-x-auto">
              <div className="mr-2 text-nowrap">File Name:</div>
              <div className="text-gray-700 text-nowrap overflow-hidden overflow-ellipsis ">
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
      {i !== 0 && (
        <div className="absolute bottom-2 right-2 justify-between -z-10">
          <div className=""></div>
          <div className="">Make Main Document</div>
        </div>
      )}
      <div className="">
        {/* {suggestions.length > 0 && inputValue.trim() !== "" && ( */}

        {/* )} */}
      </div>
    </div>
  );
};

export default FileComponent;

const AutoCompleteDoc = ({
  suggestions,
  selectedSuggestionIndex,
  handleSelectSuggestion,
  i,
}) => {
  return (
    <ul
      className={`absolute z-20 top-full left-0 w-full bg-gray-200 rounded-sm overflow-y-auto border-solid shadow-2xl transition ease-in-out `}
    >
      {suggestions.map((suggestion, index) => (
        <li
          className={
            index === selectedSuggestionIndex
              ? "bg-gray-700 text-white p-4 "
              : "bg-gray-200 p-2 "
          }
          key={index}
          onClick={() => handleSelectSuggestion(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};
