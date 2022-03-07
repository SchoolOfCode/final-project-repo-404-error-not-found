import Profile from "../../../pages/profile/mentor";
import { render, screen } from "@testing-library/react";
// import { useAuthState } from "../__mocks__/react-firebase-hooks/auth";
// import { useAuthState } from "../__mocks__/react-firebase-hooks/auth";
import firebase from "../../../firebase/clientApp";

const mockAuth = jest.fn();
jest.mock("react-firebase-hooks/auth", () => {
  return jest.fn().mockImplementation(() => {
    return { useAuthState: mockAuth };
  });
});

const mockFirebase = jest.fn(() => {
  auth: jest.fn();
});
jest.mock("../../../firebase/clientApp", () => {
  return jest.fn().mockImplementation(() => {
    return { firebase: mockFirebase };
  });
});

const auth = jest.fn();

describe("Mentor Profile", () => {
  it("should render an h1 containing firstname and surname", () => {
    render(<Profile />);
    const profileName = screen.getByTestId("profileName");
    expect(profileName).toBeInTheDocument();
  });
});
