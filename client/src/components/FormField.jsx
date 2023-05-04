import React from "react";

function FormField({ labelName, placeholder,isTextArea, inputType, value, handleChange, step, max }) {
  return (
    <label className="flex-1 w-full flex flex-col m-1">
      {labelName && (
        <span className="font-epilogue font-medium text-sm leading-[22px] text-[#808191] mb-2">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={9}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[12px] outline-none border-[1px] border-[#3a3a43] font-epilogue font-medium text-sm leading-[22px] placeholder:text-[#4b5264] text-[#808191] bg-transparent rounded-xl sm:min-w-[360px]"
        />
      ) : (
        <input 
        required
        value={value}
        onChange={handleChange}
        type={inputType}
        step={step}
        max="2"
        placeholder={placeholder}
        className="py-[15px] sm:px-[25px] px-[12px] outline-none border-[1px] border-[#3a3a43] font-epilogue font-medium text-sm leading-[22px] placeholder:text-[#4b5264] text-[#808191] bg-transparent rounded-xl sm:min-w-[360px]"
      />
      )}
    </label>
  );
}

export default FormField;
