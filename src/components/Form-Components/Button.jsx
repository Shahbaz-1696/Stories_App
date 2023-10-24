/* eslint-disable react/prop-types */


function Button({
  children,
  type,
  textColor,
  bgColor,
  className="",
  ...props
}) {
  return (
    <button type={type} {...props} className={`w-full inline-block px-6 py-3 ${bgColor} ${textColor} ${className}`}>
      {children}
    </button>
  )
}

export default Button
