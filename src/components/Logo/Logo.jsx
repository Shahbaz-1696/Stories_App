/* eslint-disable react/prop-types */
import logo from "../../assets/storiesLogo.png";

function Logo({ width = "100px" }) {
  return (
    <div width={width}>
      <img src={logo} alt="Logo"className="w-12" />
      <h1 className="text-white font-bold">Stories</h1>
    </div>
  )
}

export default Logo
