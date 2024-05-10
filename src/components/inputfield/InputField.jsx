import React from "react";

const InputField = ({ label, type, name, value, onChange, onBlur }) => {
  return (
    <div className="flex flex-col my-1">
      <label className="text-sm font-semibold font-[YACgEQNAr7w O]" htmlFor="">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="border-[1px] border-[#d2d5d8] outline-none p-1 rounded-md"
      />
    </div>
  );
};

export { InputField };
