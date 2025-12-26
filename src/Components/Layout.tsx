import {type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="app-root">
      <header className="top-bar">
        <div className="logo">
          <div className="logo-circle">LB</div>
          <div>
            <div className="logo-title">Library Manager</div>
            <div className="logo-subtitle">React + Vite + TypeScript</div>
          </div>
        </div>

        <nav className="nav-links">
          <Link
            to="/books"
            className={location.pathname.startsWith("/books") ? "active" : ""}
          >
            Books
          </Link>
          <Link
            to="/add"
            className={location.pathname.startsWith("/add") ? "active" : ""}
          >
            Add Book
          </Link>
        </nav>
      </header>

      <main className="content-card">{children}</main>
    </div>
  );
};

export default Layout;