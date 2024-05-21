import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setJobPriority } from "../../../../Redux/Actions/jobActiontypes";

const notificationMethods = [
    { id: 'sameday', title: 'Same-Day' },
    { id: 'nextday', title: 'Next-Day' },
    { id: 'rush', title: 'Rush' },
    { id: 'routine', title: 'Routine' },
  ]
  
  export default function JobPriority() {

    const dispatch = useDispatch()
    const { newJobInformation } = useSelector((state) => state.newJob);

    const handlePriorityChange = (priorityId) => {
     
      
      dispatch(setJobPriority(priorityId));

    };
    return (
      <div>
        <label className="text-base font-semibold text-gray-900">Priority</label>
        <p className="text-sm text-gray-500">Set the Priority and Due Date of this Job</p>
        <fieldset className="mt-4">
          <legend className="sr-only">Notification method</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.id} className="flex items-center">
                <input
                  id={notificationMethod.id}
                  onChange={()=>handlePriorityChange(notificationMethod.id)}
                  name="notification-method"
                  type="radio"
                  checked={notificationMethod.id === newJobInformation.jobPriority}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    )
  }
  
