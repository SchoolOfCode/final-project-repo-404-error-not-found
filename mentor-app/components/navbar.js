import Link from "next/link";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Mentor App</h1>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/#about">
        <a>About</a>
      </Link>
      <Link href="/#contact">
        <a>Contact</a>
      </Link>
      <Link href="/allMentors">
        <a>Find a Mentor</a>
      </Link>
      <Link href="/login">
        <a>Log In</a>
      </Link>
    </nav>
  );
};
export default Navbar;
