/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { type = "text", className = "", label, ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="w-full text-black">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        id={id}
        {...props}
        className={`${className} w-full inline-block duration-200 bg-zinc-300 text-black px-6 py-3 `}
      />
    </div>
  );
});

export default Input;
