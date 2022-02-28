import { AiFillGithub } from "react-icons/ai";
import css from "./socialIcon.module.css";

export default function GithubIcon({ handle }) {
  let url = `https://www.github.com/${handle}`;
  return (
    <a href={url} className={css.socialIcon}>
      <AiFillGithub handle={handle} />
    </a>
  );
}
