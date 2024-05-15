import { Provider, useDispatch, useSelector } from "react-redux";

function UploadProgress() {
  const { uploadProgress } = useSelector((state) => state.newJob);
  return (
    <div className="mt-4">
      <div className="w-full md:w-2/3 bg-gray-200 rounded">
        <div className="font-bold text-lg mb-1 p-2">
          <div className="">{uploadProgress.numberOfFiles} Total Files</div>
        </div>
        <div
          className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded transition-all "
          style={{
            width: `${uploadProgress.uploadProgress}%`,
            transition: "width 1s ease",
          }}
        >
          {uploadProgress.uploadProgress}%
        </div>
      </div>
    </div>
  );
}

export default UploadProgress;
