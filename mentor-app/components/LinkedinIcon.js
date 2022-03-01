import { AiFillLinkedin } from "react-icons/ai";
import css from "./socialIcon.module.css";

export default function LinkedinIcon({ handle }) {
  let url = `https://www.linkedin.com/in/${handle}`;
  return (
    <a href={url}>
      <AiFillLinkedin handle={handle} className={css.socialIcon} />
    </a>
  );
}
