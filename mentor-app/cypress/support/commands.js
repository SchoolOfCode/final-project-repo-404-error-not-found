// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from "../../firebase/clientApp";
const firebaseConfig = {
  apiKey: "AIzaSyDPuRlh4lUZE-e2qEG-GWflZblx56UNef0",
  authDomain: "mentoree-1ab01.firebaseapp.com",
  projectId: "mentoree-1ab01",
  storageBucket: "mentoree-1ab01.appspot.com",
  messagingSenderId: "35053699656",
  appId: "1:35053699656:web:6c8b738652ff8c1ecf8e7d",
};

firebase.initializeApp(firebaseConfig);

// allow automatic login and logout for testing with custom commands cy.login and cy.logout
Cypress.Commands.add(
  "login",
  (email = "bob@mentor.com", password = "123456") => {
    return firebase.default.auth().signInWithEmailAndPassword(email, password);
  }
);

Cypress.Commands.add("logout", () => {
  return firebase.auth().signOut();
});
