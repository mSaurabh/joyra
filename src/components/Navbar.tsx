import { Link } from "react-router-dom";
import Temple from "../assets/joyra.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import "./Navbar.css";

interface INavbarProps {}

const logoSize = 55;
const Navbar = (props: INavbarProps) => {
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img
            src={Temple}
            alt="joyra logo"
            width={logoSize}
            height={logoSize}
          />
          <span>The Joyra Site</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button className="btn" onClick={logout} disabled={isPending}>
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
