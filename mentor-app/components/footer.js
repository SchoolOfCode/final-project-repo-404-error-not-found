const d = new Date();
let year = d.getFullYear();

export function footer() {
  return (
    <footer>
      <p>{year}</p>
    </footer>
  );
}
