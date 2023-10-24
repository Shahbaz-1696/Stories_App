/* eslint-disable react/prop-types */
import React, { useId } from "react";

function Select({ label, options = [], className = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={`${className} w-full inline-block px-6 py-3 border border-gray-50 bg-white text-black duration-200 hover:bg-zinc-300`}
        ref={ref}
        id={id}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
