// firsttest.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { server } from "../../config";

describe("Homepage large CTA buttons", () => {
  it("Mentor button should lead to mentor sign up page", () => {
    cy.visit(`${server}`);
    cy.contains("Bringing the joy of programming to everyone, everywhere");
    cy.get("[data-cy=mentor_btn]").click({ force: true });
    cy.url().should("include", "/login/mentor");
  });
  it("Mentee button should lead to mentee sign up page", () => {
    cy.visit(`${server}`);
    cy.contains("Bringing the joy of programming to everyone, everywhere");
    cy.get("[data-cy=mentee_btn]").click({ force: true });
    cy.url().should("include", "/login/mentee");
  });
});
