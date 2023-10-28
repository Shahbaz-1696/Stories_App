import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((error) => console.log(error));
  };
  return(
    <button
    onClick={handleLogout}
    className="rounded-full px-6 py-2 duration-200 hover:bg-zinc-300 inline-block text-white hover:text-black"
    >Logout</button>
  )
}

export default LogoutBtn;
