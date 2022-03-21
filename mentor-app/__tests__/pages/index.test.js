import { render, screen } from "@testing-library/react";
import About from "../../components/About";
import Contact from "../../components/Contact";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("About", () => {
  it("renders a heading", () => {
    render(<About />);

    const heading = screen.getByText("About", {
      name: "About",
    });
    expect(heading).toBeInTheDocument;
  });
});

// describe("Contact", () => {
//   it("renders a submit button", () => {
//     render(<Contact />);
//     const submitButton = screen.getByRole("button");
//     expect(submitButton).toBeInTheDocument;
//   });

//   it("renders an image", () => {
//     render(<Contact />);
//     const img = screen.getByRole("img");
//     expect(img).toBeInTheDocument;
//   });
// });
