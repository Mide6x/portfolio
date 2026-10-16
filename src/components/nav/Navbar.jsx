import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="nav-diary">
      <Link className="nav-diary__name" to="/">Olumide Adewole</Link>
      <div className="nav-diary__links" aria-label="Primary navigation">
        <Link className={pathname.startsWith("/thoughts") ? "is-active" : ""} to="/thoughts">Journal</Link>
        <Link className={pathname === "/work" ? "is-active" : ""} to="/work">Work</Link>
        {!onHome && <Link to="/">Home</Link>}
      </div>
    </header>
  );
}
