const d = new Date();
let year = d.getFullYear();

function footer() {
  return (
    <footer>
      <p>{year}</p>
    </footer>
  );
}
