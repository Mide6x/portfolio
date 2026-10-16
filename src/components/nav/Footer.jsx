import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="foot-letter">
      <p className="foot-letter__close">Until next time,<br /><span>Olumide 💕</span></p>
      <p className="foot-letter__ps">P.S. — letters back are always welcome at <a href="mailto:adewoleolumide05@gmail.com">adewoleolumide05@gmail.com</a>.</p>
      <div className="foot-letter__meta">
        <Link to="/thoughts">Journal</Link>
        <Link to="/work">Work</Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
