import { Link, Outlet } from "react-router-dom";
import { NavigationInterface } from "../../interfaces/NavigationInterface";
import classes from "./Navigation.module.css";
import logo from '../../assets/logo.svg';

// Define an array of routes
const navLinks: NavigationInterface[] = [
  {
    id: 1,
    path: "/",
    name: "Home", // Add a name property for display
  },
  {
    id: 2,
    path: "/trainers",
    name: "Trainers", // Add a name property for display
  },
  {
    id:3,
    path:"/pokemon",
    name:"Pokemon",
  }
 
];

const Navigation = () => {
  return (
    <>
      <nav className={classes.navigation}>
        <Link className={classes.logoContainer} to="/">
          <img src={logo} alt="Pokemon logo" />
        </Link>

        <ul className={classes.linkContainer}>
          {navLinks.map((link) => (
            <ul key={link.id}>
              <Link className={classes.navLink} to={link.path}>
                {link.name} {/* Display the link name */}
              </Link>
            </ul>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
