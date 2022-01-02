import { NavLink } from "react-router-dom";
// styles & images
import AddIcon from "../assets/add_icon.svg";
import DashboardIcon from "../assets/dashboard_icon.svg";
import "./Sidebar.css";

const iconSize = 25;

interface ISidebarProps {}
//https://randomized-avatar-api.herokuapp.com/getRandomAvatar
const Sidebar = (props: ISidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* avatar & username here later */}
          <p>Hey user</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img
                  src={DashboardIcon}
                  alt="dashboard icon"
                  width={iconSize}
                  height={iconSize}
                />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img
                  src={AddIcon}
                  alt="add project icon"
                  width={iconSize}
                  height={iconSize}
                />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
