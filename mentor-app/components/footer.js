const d = new Date();
let year = d.getFullYear();

function Footer() {
  return (
    <footer>
      <p>{year}</p>
    </footer>
  );
}

export default Footer;
