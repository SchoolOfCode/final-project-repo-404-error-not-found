import Link from "next/link";
import { Link as LinkS } from "react-scroll";
import LinkedinIcon from "./LinkedinIcon"
import GithubIcon from "./GithubIcon";
import TwitterIcon from "./TwitterIcon";
const d = new Date();
let year = d.getFullYear();


export function Footer() {

  return (
    <footer>
      <p>{year}</p>
      <LinkedinIcon/>
      <GithubIcon/>
      <TwitterIcon/>

    </footer>
  );
}

export default Footer;
