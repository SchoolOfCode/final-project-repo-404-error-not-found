import handler from "../../../pages/api/mentors/[mentorsid]";
import { createMocks } from "node-mocks-http";
import { render, screen } from "@testing-library/react";
import query from "../../../database/index.js";
import { pool } from "../../../database/index";

//this should be the loginid of the first mentor in the database
const firstMentorID = "99whatever";

afterAll(async () => {
  await pool.end();
});

describe("Request handler", () => {
  it("Will throw an error if method is POST", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: {},
      status: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    });

    await handler(req, res);
    console.log(res._getStatusCode());
    expect(res._getStatusCode()).toBe(405);
  });

  it("Will throw an error if method is PUT", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      query: {},
      status: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    });

    await handler(req, res);
    console.log(res._getStatusCode());
    expect(res._getStatusCode()).toBe(405);
  });

  it("Will respond with status 200 to GET request", async () => {
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
    console.log(JSON.parse(res._getData()));
  });

  it("Will respond to a get request by sending back a record with a loginid property", async () => {
    //tests the first mentor in the database - see const firstMentorID at top of page
    const { req, res } = createMocks({
      method: "GET",
      query: { mentorsid: firstMentorID },
      status: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    });

    await handler(req, res);
    console.log(res._getStatusCode());
    expect(res._getStatusCode()).toBe(200);
    console.log(JSON.parse(res._getData()));
    // console.log(res.body);
    expect(JSON.parse(res._getData())[0]).toHaveProperty("loginid");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("userid");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("firstname");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("surname");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("jobtitle");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("company");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("email");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("biography");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("socials");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("location");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("photourl");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("tagline");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("skills");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("relationships");
    expect(JSON.parse(res._getData())[0]).toHaveProperty("role");
  });
});
