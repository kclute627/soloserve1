function InputForm({
  value,
  onChange,
  label,
  id,

  type,
  autoComplete,
  required,
  placeHolder,
  classNameInput = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryGreen sm:text-sm sm:leading-6",
  classNameLabel = "block text-sm font-medium leading-6 text-gray-900",

  children,
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <label htmlFor={id} className={classNameLabel}>
          {label}
        </label>
        {children}
      </div>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className={classNameInput}
          placeholder={placeHolder || ""}
        />
      </div>
    </>
  );
}

export default InputForm;
