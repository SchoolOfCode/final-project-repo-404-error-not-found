import { server } from "../../config";

describe("All mentors page", () => {
  it("Should display a list of Mentors, each with a view profile button", () => {
    cy.visit(`${server}/allMentors`);
    cy.contains("Mentors").should("exist");
    cy.get("[data-cy=mentorDisplayCard]").each((item, index) => {
      cy.wrap(item).should("contain.text", "View Profile");
    });
  });
});
