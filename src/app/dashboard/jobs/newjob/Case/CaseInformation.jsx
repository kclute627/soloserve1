import { useDispatch } from "react-redux";
import BasicInput from "../../BasicInput";
import { handleCourtInfo } from "../../../../Redux/actions";
import { useSelector } from "react-redux";

function CaseInformation() {
  const dispatch = useDispatch()
  const {newJobInformation} = useSelector(state => state.newJob)

  


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
            value={newJobInformation.caseInformation.caseNumber}
            placeholder="Case Number"
            type="caseNumber"
            name = "caseNumber"
            onChange={(e)=>dispatch(handleCourtInfo(e.target.name, e.target.value))}
          />
        </div>
        {/* <div className="w-full md:w-1/3 mt-5">
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
        </div> */}
      </div>
    </div>
  );
}

export default CaseInformation;
