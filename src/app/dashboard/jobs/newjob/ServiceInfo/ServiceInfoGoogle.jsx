"use client";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

function ServiceInfoGoogle({ address, onAddressChange }) {
  const addressRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let autocomplete;

    if (window.google) {
      autocomplete = new window.google.maps.places.Autocomplete(
        addressRef.current,
        {
          componentRestrictions: { country: ["us", "ca"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        }
      );

      // Style the Autocomplete dropdown
      const style = document.createElement("style");
      style.innerHTML = `
        .pac-container::after {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      autocomplete.addListener("place_changed", () => fillInAddress(autocomplete));

      // Add keydown listener to prevent form submission on Enter
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      };

      if (addressRef.current) {
        addressRef.current.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        if (addressRef.current) {
          addressRef.current.removeEventListener("keydown", handleKeyDown);
        }
        const styleElement = document.querySelector("style");
        if (styleElement) {
          styleElement.remove();
        }
      };
    }
  }, []);

  const fillInAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    let parsedAddress = {
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      googleMapLink: "",
      lat: "",
      lng: "",
    };

    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number":
          parsedAddress.street = `${component.long_name} ${parsedAddress.street}`;
          break;
        case "route":
          // Add space if street already has a value
          if (parsedAddress.street !== "") {
            parsedAddress.street += " ";
          }
          parsedAddress.street += component.short_name;
          break;
        case "locality":
          parsedAddress.city = component.long_name;
          break;
        case "administrative_area_level_1":
          parsedAddress.state = component.short_name;
          break;
        case "postal_code":
          parsedAddress.zip = component.long_name;
          break;
        // You can parse other address components here as needed
        default:
          break;
      }
    }

    onAddressChange(parsedAddress);
  };

  const handleAddressChange = (e) => {
    const updatedAddress = { ...address, street: e.target.value };
    onAddressChange(updatedAddress);
  };

  const onFocus = (event) => {
    if (event.target.autocomplete) {
      event.target.autocomplete = "whatever";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onAddressChange({ ...address, [name]: value });
  };

  return (
    <div className="w-full md:w-2/3">
      <div className="">
        <div className="flex justify-between items-center">
          <label
            htmlFor="ship-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Street Address
          </label>
        </div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryGreen sm:text-sm sm:leading-6"
            id="ship-address"
            type="text"
            value={address.street || ""}
            autoComplete="off"
            onFocus={onFocus}
            ref={addressRef}
            onChange={handleAddressChange}
            onSelect={handleAddressChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceInfoGoogle;

