import BasicInput from "../../BasicInput";

function CaseInformation() {
  return (
    <div>
      <div className="flex w-full mt-10">
        <div className="w-full md:w-2/3 ">
          <label
            htmlFor="cover-photo"
            className="block text-lg md:text-2xl font-bold leading-6 text-gray-900"
          >
            Case Information
          </label>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <div className="w-full md:w-1/3 mt-5">
          <BasicInput
            label="Case Number"
            placeholder="Case Number"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/3 mt-5">
          <BasicInput
            label="Plaintiff(s)"
            placeholder="Plaintiff(s)"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/3 mt-5">
          <BasicInput
            label="Defendant(s)"
            placeholder="Defendant(s)"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}

export default CaseInformation;
