import { NavLink } from "react-router-dom";
import { NavigationModel } from "../../models";

import "./NavigationBar.css";

interface NavigationBarProp {
  links: NavigationModel[];
}

export const NavigationBar = ({ links }: NavigationBarProp) => {
  return (
    <header className="header">
      <nav>
        <ul>
          {links.map((nav) => (
            <li>
              <NavLink to={nav.path}>{nav.text}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
