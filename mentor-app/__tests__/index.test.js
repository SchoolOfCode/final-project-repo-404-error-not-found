import { render, screen } from "@testing-library/react";
import About from "../components/About";

describe("About", () => {
  it("renders a heading", () => {
    render(<About />);

    const heading = screen.getByText("About", {
      name: "About",
    });
    expect(heading).toBeInTheDocument;
  });
});
