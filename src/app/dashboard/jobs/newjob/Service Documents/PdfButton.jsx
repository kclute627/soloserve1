import React from "react";

import { saveAs } from "file-saver";
import { ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/24/solid";

/// note to self cors will need to be addressed when in prod i was able to work around and turn it off on the browser.. Maybe wont have any issues when both domains match and off local host

const PDFButtons = ({ pdfUrl, filename }) => {
  const saveFile = () => {
    saveAs(pdfUrl, filename);
  };

  const handleView = (e) => {
    e.preventDefault();
    window.open(pdfUrl, "_blank"); // Opens the PDF file in a new tab
  };

  return (
    <div className="flex space-x-2 mt-1">
      <div
        onClick={saveFile}
        className="py-2 px-4 bg-slate-700 cursor-pointer flex rounded-full drop-shadow-md text-white text-sm justify-center items-center space-x-2"
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <div className="">Download PDF</div>
      </div>

      <div
        onClick={handleView}
        className="py-2 px-4 bg-slate-700 cursor-pointer flex rounded-full drop-shadow-md text-white text-sm justify-center items-center space-x-2"
      >
        <EyeIcon className="h-4 w-4" />
        <div className="">View PDF</div>
      </div>
    </div>
  );
};

export default PDFButtons;
