import handler from "../../pages/api/mentors";
import { render, screen } from "@testing-library/react";

describe("Return a list of mentors", () => {
  it("Returns a list of mentors", () => {
    const req = {
      method: "GET",
    };

    const json = jest.fn();
    const status = jest.fn(() => {
      return {
        json,
      };
    });
    const res = {
      status,
    };

    const actual = handler(req, res);
    console.log(json.mock.calls);
    // expect(actual).not.toBeNull;
  });
});
