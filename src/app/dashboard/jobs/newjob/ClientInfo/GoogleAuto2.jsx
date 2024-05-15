import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleClientInput3, setGoogleAddress } from "../../../../Redux/actions";

function GoogleAuto2({ address }) {
  const addressRef = useRef(null);
  let autocomplete;

  const dispatch = useDispatch();
 
  const newClientInfo = useSelector(state => state.newClient)

  useEffect(() => {
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
    autocomplete.addListener("place_changed", fillInAddress);

    return () => {
      // Clean up autocomplete instance
      //   window.google.maps.event.clearInstanceListeners(addressRef.current);
    };
  }, []);

  const fillInAddress = () => {
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
        console.log(component)
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
  

    dispatch(setGoogleAddress({...parsedAddress}))
  };

  const handelAddressChange = (e) => {

    dispatch(handleClientInput3("street", e.target.value))

  };

  const onFocus = (event) => {
    if (event.target.autocomplete) {
      event.target.autocomplete = "whatever";
    }
  };

  return (
    <div className="w-2/3">
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
            value={
              address.client_address.street ? address.client_address.street : ""
            }
            autoComplete="off"
            onFocus={onFocus}
            ref={addressRef}
            onChange={handelAddressChange}
            onSelect={handelAddressChange}
          />
        </div>
      </div>
    </div>
  );
}

export default GoogleAuto2;
