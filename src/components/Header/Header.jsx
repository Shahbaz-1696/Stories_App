import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "..";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.userData);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      status: true,
    },
    {
      name: "Login",
      slug: "/login",
      status: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      status: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      status: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      status: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-stone-800">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="rounded-full px-6 py-2 duration-200 hover:bg-zinc-300 inline-block"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
