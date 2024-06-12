import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setJobDueDate } from "../../../../Redux/Actions/jobActiontypes";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

function stripTime(date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const dispatch = useDispatch();
  const { newJobInformation } = useSelector((state) => state.newJob);

  useEffect(() => {
    const date = new Date();

    //get job status
    switch (newJobInformation.jobPriority) {
      case "routine":
        date.setDate(date.getDate() + 7);
        handleDateSelect(date);
        break;
      case "rush":
        date.setDate(date.getDate() + 2);
        handleDateSelect(date);
        break;
      case "nextday":
        date.setDate(date.getDate() + 1);
        handleDateSelect(date);
        break;
      case "sameday":
        date.setDate(date.getDate());
        handleDateSelect(date);
        break;
      default:
        break;
    }
  }, [newJobInformation.jobPriority]);

  const days = useMemo(() => {
    const generateDaysForMonth = (year, month) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      const firstDayOfMonth = new Date(year, month, 1);
      const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday

      const numberOfDays = new Date(year, month + 1, 0).getDate();
      const numberOfDaysInPreviousMonth = new Date(year, month, 0).getDate();

      const daysFromPreviousMonth = startDayOfWeek;

      const daysArray = [];

      for (let i = 0; i < daysFromPreviousMonth; i++) {
        const date = formatDate(
          year,
          month - 1,
          numberOfDaysInPreviousMonth - daysFromPreviousMonth + i + 1
        );
        daysArray.push({
          date,
          isCurrentMonth: false,
          isToday: false,
          isSelected: false,
        });
      }

      for (let i = 1; i <= numberOfDays; i++) {
        const date = formatDate(year, month, i);
        const isToday =
          year === currentYear && month === currentMonth && i === currentDay;
        const isSelected = newJobInformation.jobDueDate === date;
        daysArray.push({ date, isCurrentMonth: true, isToday, isSelected });
      }

      const remainingDays = 42 - daysArray.length;

      for (let i = 1; i <= remainingDays; i++) {
        const date = formatDate(year, month + 1, i);
        daysArray.push({
          date,
          isCurrentMonth: false,
          isToday: false,
          isSelected: false,
        });
      }

      return daysArray;
    };

    return generateDaysForMonth(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
  }, [currentMonth, newJobInformation.jobDueDate]);

  const handleDateSelect = (date) => {
    const adjustedDate = stripTime(new Date(date));
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    const currentDate = stripTime(new Date());

    if (adjustedDate >= currentDate) {
      const selectedMonth = adjustedDate.getMonth();
      const currentMonthObj = currentMonth.getMonth();

      if (selectedMonth < currentMonthObj) {
        // If the selected date is in the previous month
        setCurrentMonth(
          new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
        );
      } else if (selectedMonth > currentMonthObj) {
        // If the selected date is in the next month
        setCurrentMonth(
          new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
        );
      }

      // This will trigger the useMemo hook to update days
      dispatch(setJobDueDate(date));

    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  return (
    <div className="flex justify-start w-[20rem]">
      <div className="mt-10 text-center w-[20rem]">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto text-sm font-semibold">{monthName}</div>
          <button
            type="button"
            onClick={goToNextMonth}
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day, dayIdx) => (
            <button
              key={day.date}
              type="button"
              onClick={() => handleDateSelect(day.date)}
              className={classNames(
                "py-1.5 hover:bg-gray-100 focus:z-10",
                day.isToday && "bg-indigo-900",
                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                (day.isSelected || day.isToday) && "font-semibold  ",
                day.isSelected && "text-white",
                !day.isSelected &&
                  day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-900",
                !day.isSelected &&
                  !day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-400",
                day.isToday && !day.isSelected && "text-white",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === days.length - 7 && "rounded-bl-lg",
                dayIdx === days.length - 1 && "rounded-br-lg",
                
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  day.isSelected && "bg-gray-900"
                )}
              >
                {day.date.split("-").pop().replace(/^0/, "")}
              </time>
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
}
