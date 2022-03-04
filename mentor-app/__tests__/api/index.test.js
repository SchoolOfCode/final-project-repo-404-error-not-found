import handler from "../../pages/api/mentors";
import { createMocks } from "node-mocks-http";
import { render, screen } from "@testing-library/react";

describe("Request handler", () => {
  it("Will throw an error if method is not GET or POST", async () => {
    // let req = { method: "DELETE" };
    // let res = { status: jest.fn(), setHeader: jest.fn(), end: jest.fn() };

    const { req, res } = createMocks({
      method: "GET",
      query: {},
    });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledWith(expect.any(String));
  });
});
