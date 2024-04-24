import { useRef } from "react";
import { useState } from "react";
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from "react-google-places-autocomplete";

function GoogleAuto({ value, onChange }) {
  const handleOnChange = async (value) => {


    


    const address= await geocodeByAddress(value.value.description)
    const latLng = await getLatLng(address[0])
    const {lat, lng} = latLng

    // const latLng = await getLatLng(value.value.description)


  };
  const handleSelect = async (value) => {


   


    // const address= await geocodeByAddress(value.value.description)
    // const latLng = await getLatLng(address[0])
    // const {lat, lng} = latLng

    // // const latLng = await getLatLng(value.value.description)

    // console.log(lat, lng)
  };

  return (
    <div>
      <GooglePlacesAutocomplete
      apiKey="AIzaSyAIOxB7XBVlzjuseYy2jlHAEVnWgDLVbWY"
        selectProps={{
          value: value,
          onChange: onChange,
          placeholder: "Start Typing Address",
     
          styles: {
            input: (provided) => {
         
            return {
                
              ...provided,
              color: "blue",
            }},
            option: (provided) => ({
              ...provided,
              color: "blue",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "blue",
            }),
          },
        }}
      />
       
    </div>
  );
}

export default GoogleAuto;
