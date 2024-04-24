function BasicInput({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 text-3xl">
        <input
          type={type}
          name={type}
          id={type}
          autoComplete="off"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input3 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-xl sm:leading-6 focus:border-black"

         
        />
      </div>
    </div>
  );
}

export default BasicInput;
