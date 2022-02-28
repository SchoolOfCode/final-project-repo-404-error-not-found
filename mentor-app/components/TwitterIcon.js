import { AiFillTwitterCircle } from "react-icons/ai";
import css from "./socialIcon.module.css";

export default function TwitterIcon({ handle }) {
  let url = `https://twitter.com/${handle}`;
  return (
    <a href={url} className={css.socialIcon}>
      <AiFillTwitterCircle handle={handle} />
    </a>
  );
}
