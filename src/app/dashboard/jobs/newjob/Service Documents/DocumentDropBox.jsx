"use client"

import { PhotoIcon } from "@heroicons/react/24/solid";

function DocumentDropBox({handleDrop, handleDragOver, handleDragEnter, handleDragLeave, handleFileSelect}) {
    return (
        <div>
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
                  className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
        </div>
    )
}

export default DocumentDropBox
