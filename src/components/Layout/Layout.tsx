import { ReactNode } from "react";
import { NavigationBar } from "../../components";

import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

const links = [
  { path: "/movies", text: "Movies" },
  { path: "/sandbox", text: "Sandbox" },
];

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavigationBar links={links} />
      <div>{children}</div>
    </div>
  );
};
