import * as mockUser from "../fixtures/auth-user.json";
import { server } from "../../config";

describe("The login page", () => {
  it("Should login with email and password", () => {
    const { email, password } = mockUser;
    cy.visit(`${server}/login/mentor`);
    cy.contains("Sign in with email").click();
    cy.get("input[type=email]").type(email);
    cy.contains("Next").click();
    cy.get("input[type=password]").type(password);
    cy.get("button[type=submit]").click();
    cy.contains("Edit profile").should("exist");
    cy.logout();
  });
});
