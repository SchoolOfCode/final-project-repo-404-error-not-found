import Link from "next/link";
import { Link as LinkS } from "react-scroll";
import LinkedinIcon from "./LinkedinIcon";
import GithubIcon from "./GithubIcon";
import TwitterIcon from "./TwitterIcon";
import { StylesProvider } from "@chakra-ui/react";

const d = new Date();
let year = d.getFullYear();

export function Footer() {
  return (
    <footer>
      <di>
        <p> © {year}</p>
      </di>

      <div className="socials">
        <LinkedinIcon />
        <GithubIcon />
        <TwitterIcon />
      </div>

    </footer>
  );
}

export default Footer;
