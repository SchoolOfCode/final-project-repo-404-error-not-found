import Link from "next/link";
import { Link as LinkS } from "react-scroll";
import LinkedinIcon from "./LinkedinIcon";
import GithubIcon from "./GithubIcon";
import TwitterIcon from "./TwitterIcon";
const d = new Date();
let year = d.getFullYear();

export function Footer() {
  return (
    <footer>
      <LinkedinIcon />
      <GithubIcon />
      <TwitterIcon />
      <p>{year}</p>
    </footer>
  );
}

export default Footer;
