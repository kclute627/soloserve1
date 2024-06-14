import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { CalendarDaysIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { handleJobNotes } from "../../../../Redux/actions";
import { useSelector } from "react-redux";

const assignees = [
  { name: "Unassigned", value: null },
  {
    name: "Wade Cooper",
    value: "wade-cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More items...
];
const labels = [
  { name: "Unlabelled", value: null },
  { name: "Engineering", value: "engineering" },
  // More items...
];
const dueDates = [
  { name: "No due date", value: null },
  { name: "Today", value: "today" },
  // More items...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function JobNotes() {
  const [assigned, setAssigned] = useState(assignees[0]);
  const [labelled, setLabelled] = useState(labels[0]);
  const [dated, setDated] = useState(dueDates[0]);

  const dispatch = useDispatch()
  const {newJobInformation} = useSelector(state => state.newJob)

  return (
    <div className="">
      <div className="flex w-full pb-4">
        <div className="w-full md:w-2/3 ">
          <label
            htmlFor="cover-photo"
            className="block text-lg md:text-2xl font-bold leading-6 text-gray-900"
          >
            Job Instructions
          </label>
        </div>
      </div>
      <form action="#" className="relative w-full md:w-1/2">
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <label htmlFor="title" className="sr-only">
            Job Instructions
          </label>

          <label htmlFor="instructions" className="sr-only">
            Instructions
          </label>
          <textarea
            rows={4}
            name="instructions"
            id="instructions"
            className="block w-full resize-none border-0 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-lg sm:leading-6"
            placeholder="Instructions for the server..."
            value = {newJobInformation.jobNotes}
            onChange={(e) => dispatch(handleJobNotes(e.target.value))}
          />

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
            <div className="py-2">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-x-px bottom-0">
        <div className="h-0.5 w-full bg-slate-300  px-2"></div>
          <div className="flex flex-nowrap justify-start space-x-2 px-2 py-2 sm:px-3 ">
          
            <InstructionBadge title="Personal Service Only" icon={<UserCircleIcon/>} bg="bg-teal-800" />
            <InstructionBadge title="No Sunday Service" icon={<NoSymbolIcon/>} bg="bg-red-600" />
          </div>
        </div>
      </form>
    </div>
  );
}

const InstructionBadge = ({title, icon, bg})=> {


    return (
        <div className={`flex py-2 px-4 rounded-full text-sm items-center space-x-2 ${bg} text-white`}>
            <div className="icon h-4 w-4">
            {icon}
            </div>
            <div className="title">
                {title}
            </div>

        </div>
    )
}

