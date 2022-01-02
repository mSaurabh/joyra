import { Link } from "react-router-dom";
import Temple from "../assets/joyra.svg";
import "./Navbar.css";

interface INavbarProps {}

const logoSize = 45;
const Navbar = (props: INavbarProps) => {
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
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
