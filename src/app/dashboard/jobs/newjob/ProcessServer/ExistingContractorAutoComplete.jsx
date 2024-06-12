import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

function ExistingContractorAutoComplete({ data, handleSelectedClient }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  console.log("data", data);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" && selectedIndex > 0) {
      // Move selection up
      event.preventDefault();
      setSelectedIndex(selectedIndex - 1);
    } else if (event.key === "ArrowDown" && selectedIndex < data.length - 1) {
      // Move selection down
      event.preventDefault();
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex < data.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (event.key === "Enter" && selectedIndex !== null) {
      event.preventDefault();
      handleSelectedClient(data[selectedIndex]);
    }
  };

  useEffect(() => {
    const onKeyDown = (event) => handleKeyDown(event);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, data]);

  return (
    <div className="absolute w-full md:w-2/3 left-0 z-[99] bg-gray-200 rounded-sm">
      {data.map((item, i) => (
        <ClientBox
          data={item}
          i={i}
          isSelected={selectedIndex === i}
          key={i}
          handleSelectedClient={handleSelectedClient}
        />
      ))}
    </div>
  );
}

export default ExistingContractorAutoComplete;

const ClientBox = ({ data, i, isSelected, handleSelectedClient }) => {
  return (
    <div
      tabIndex="0"
      className={`w-[10] px-2 py-4 ${
        i % 2 !== 0 && !isSelected
          ? "bg-gray-100"
          : isSelected
          ? "bg-blue-200"
          : ""
      } ${data.id !== 4 ? "cursor-pointer" : ""}`}
      onClick={data.name !== "No Results Found" ? () => handleSelectedClient(data) : null}
    >
      <div className="text-xl font-bold mb-2">{data.name}</div>
      {data.contacts.length > 0 && (
        <div>
          {`${data.contacts[0].firstName} ${data.contacts[0].lastname}`}
        </div>
      )}
      {data.addresses.length > 0 && (
        <>
          <div>{`${data.addresses[0].city}, ${data.addresses[0].state}`}</div>
          <div className="mt-2">
            {data.prepay && <PrePayBadge text={"Prepay Client"} />}
          </div>
        </>
      )}
    </div>
  );
};

const PrePayBadge = ({ text, type = "danger" }) => {
  return (
    type === "danger" && (
      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        <div className="h-6 w-6">
          <ExclamationTriangleIcon />
        </div>
        <div className="ml-1">{text}</div>
      </span>
    )
  );
};

