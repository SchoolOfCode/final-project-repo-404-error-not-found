import handler from "../../pages/api/mentors";
import { render, screen } from "@testing-library/react";

describe("Return a list of mentors", () => {
  it("Returns a list of mentors", () => {
    const req = {
      method: "GET",
    };
    const res = {
      status: "",
      json: "",
    };

    const actual = handler(req, res);

    expect(actual).not.toBeNull;
  });
});
