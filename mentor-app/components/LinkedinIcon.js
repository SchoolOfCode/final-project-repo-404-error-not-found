import { AiFillLinkedin } from "react-icons/ai";
import css from "./socialIcon.module.css";

export default function LinkedinIcon({ handle }) {
  let url = `https://www.linkedin.com/in/${handle}`;
  return (
    <a href={url} className={css.socialIcon}>
      <AiFillLinkedin handle={handle} />
    </a>
  );
}
