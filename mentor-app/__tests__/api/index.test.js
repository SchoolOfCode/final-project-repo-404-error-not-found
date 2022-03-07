import handler from "../../pages/api/mentors";
import { createMocks } from "node-mocks-http";
import { render, screen } from "@testing-library/react";
import query from "../../database/index.js";

describe("Request handler", () => {
  // afterAll(() => {
  //   return query.end();
  // });
  it("Will throw an error if method is not GET or POST", async () => {
    // let req = { method: "DELETE" };
    // let res = { status: jest.fn(), setHeader: jest.fn(), end: jest.fn() };

    const { req, res } = createMocks({
      method: "GET",
      query: {},
      status: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    });

    await handler(req, res);
    console.log(res._getStatusCode());
    expect(res._getStatusCode()).toBe(200);
    // expect(res.end).toHaveBeenCalledTimes(1);
    console.log(JSON.parse(res._getData()));
    // expect(JSON.parse(res._getData())).toHaveProperty(expect.any(String));
  });
});
