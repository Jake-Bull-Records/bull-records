import { NavLink } from "react-router-dom";
import logo from "../assets/logo.JPG";
import "./nav-bar.css";

function NavBar({ session }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo">
          <img src={logo}></img>
          Bull Records
        </NavLink>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/crate-digger">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/About">About</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <NavLink to="/Profile" className="user-icon">
          <img src="/profile-user-account.svg"></img>
        </NavLink>
        {session && (
          <button onClick={async () => await supabase.auth.signOut()}>
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
