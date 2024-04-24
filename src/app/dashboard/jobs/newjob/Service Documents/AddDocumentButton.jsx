"use client";
import { PlusIcon } from "@heroicons/react/24/solid";

function AddDocumentButton({ handleAddNoFile }) {
  const handleKeyDown = (event) => {
    console.log("running");
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action of the Enter key
    }
  };
  return (
    <div
      className="flex flex-col justify-start items-center w-[15rem]"
      onKeyDown={handleKeyDown}
    >
      <div
        onClick={handleAddNoFile}
        onKeyDown={handleKeyDown} // Add the onKeyDown event listener
        className="h-16 w-16 text-white bg-indigo-600 mt-4 rounded-full flex  justify-center items-center mb-2"
      >
        <div className="h-10 w-10 text-white m-auto  ">
          <PlusIcon />
        </div> 
      </div>
      <div className="">
        <div className="">Add Service Documents</div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default AddDocumentButton;
