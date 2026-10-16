import { Link } from "react-router-dom";
import Projects from "./Projects";
import Experience from "./Experience";

export default function Work() {
  return (
    <main className="work-page">
      <p className="eyebrow">Work, in brief</p>
      <h1>I build thoughtful digital systems.</h1>
      <p className="work-page__lede">
        My professional work sits across artificial intelligence, software engineering, research,
        and product thinking. This page keeps the practical bits in one place, without asking them
        to speak for the whole of me.
      </p>
      <div className="work-links">
        <a href="#projects">Selected projects <span>→</span></a>
        <a href="#experience">Experience <span>→</span></a>
        <Link to="/cv">CV <span>→</span></Link>
      </div>
      <Link className="text-link work-page__back" to="/">Back to the rest of the story <span>→</span></Link>
      <div className="work-archive">
        <Projects />
        <Experience />
      </div>
    </main>
  );
}
