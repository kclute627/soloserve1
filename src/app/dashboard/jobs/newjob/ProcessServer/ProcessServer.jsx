import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import NewContractorModal from "./NewContractorModal";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Contractor2 from "./Contractor2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setServerType } from "../../../../Redux/Actions/jobActiontypes";

function ProcessServer({

  setContractInformation,
  handleClientSuggestions,
  handleAddNewClient

}) {
  const [openNewContractorModal, setOpenNewContractorModal] = useState(false);
  const [matchingArray, setMatchingArray] = useState([]);

  


  const dispatch = useDispatch()
  const {newJobInformation} = useSelector(state => state.newJob)

  return (
    <>
      <div>
        <div className="flex w-full mt-1">
          <div className="w-full md:w-2/3 ">
            <label
              htmlFor="cover-photo"
              className="block text-lg md:text-2xl font-bold leading-6 text-gray-900"
            >
              Server Information
            </label>
          </div>
        </div>

        <div className="flex px-2 py-4 w-full md:w-[24rem] justify-between items-center relative rounded-md shadow-lg mt-2 text-xl transition-all ease-in-out duration-1000">
          <div
            className={`z-10 h-full w-1/2 bg-indigo-600 absolute top-0 rounded-md transition-transform duration-300 ease-in-out ${
              newJobInformation.serverType == "contractor"
                ? "translate-x-full"
                : "translate-x-0"
            }`}
          ></div>
          <div
            className={`left cursor-pointer relative z-30 pl-10 pr-10 transition-colors duration-300 ease-in-out ${
              newJobInformation.serverType === "employee" ? "text-white" : "text-black"
            }`}
            onClick={() => dispatch(setServerType("employee"))}
          >
            Employee
          </div>
          <div
            className={`left cursor-pointer relative z-30 pl-10 pr-10 transition-colors duration-300 ease-in-out ${
              newJobInformation.serverType === "contractor" ? "text-white" : "text-black"
            }`}
            onClick={() => dispatch(setServerType("contractor"))}
          >
            Contractor
          </div>
        </div>
        <div className="w-full md:w-2/3 mt-4">
          <div
            className="transition-opacity duration-500 ease-in-out w-[14rem]"
            style={{ opacity: newJobInformation.serverType === "employee" ? 1 : 0 }}
          >
            {newJobInformation.serverType === "employee" && <ProcessServerDropDown />}
          </div>
          <div
            className="transition-opacity duration-500 ease-in-out"
            style={{ opacity: newJobInformation.serverType === "contractor" ? 1 : 0 }}
          >
            {newJobInformation.serverType === "contractor" && (
              <Contractor2
              handleClientSuggestions={handleClientSuggestions}
              handleAddNewClient={handleAddNewClient}
               
              />
            )}
          </div>
        </div>
      </div>
      <NewContractorModal
        open={openNewContractorModal}
        setOpen={setOpenNewContractorModal}
        setClientInformation={setContractInformation}
      />
    </>
  );
}

export default ProcessServer;



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProcessServerDropDown() {
  
  const {user} = useSelector(state => state.user)
  const [employees, setEmployees] = useState([]);


  /// make redux function
  const [selected, setSelected] = useState({ id: 0, firstName: "--Blank--", lastName: ""});
  let people = []

  useEffect(()=> {

    setEmployees(cur => {
      people = [
        { id: 0, firstName: "--Blank--", lastName: ""},
        ...user.employees
    
      ];

      return people
      
    })
    /// filter to select the primaryr
    // setSelected(employees[1])
   
  }, [])

  

  

 

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Employee
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{`${selected.firstName} ${selected.lastName}`}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {employees.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {`${person.firstName} ${person.lastName}` }
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

const ContractorInput = () => {
  return <input />;
};
