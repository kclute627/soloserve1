function UploadProgress({uploadProgress}) {
  return (
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
  );
}

export default UploadProgress;
