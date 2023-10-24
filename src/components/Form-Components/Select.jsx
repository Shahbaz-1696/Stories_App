/* eslint-disable react/prop-types */
import React, {useId} from 'react'

function Select({
  label,
  options=[],
  className="",
  ...props
}, ref) {

  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select className={`${className}`} ref={ref} id={id} {...props}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select);
