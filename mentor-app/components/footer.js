const d = new Date();
let year = d.getFullYear();


export function Footer() {

  return (
    <footer>
      <p>{year}</p>
    </footer>
  );
}

export default Footer;
