describe('User App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });
const nameInput = () => cy.get('input[name="name"]');
const emailInput = () => cy.get('input[name="email"]');
const passwordInput = () => cy.get('input[name="password"]');
const checkInput = () => cy.get('input[name="terms"]');
const submitBtn = () => cy.get('button[id="submitButton"]');

it('sanity test to make sure our tests work', () => {
    expect(1+2).to.equal(3);
    expect(2+2).not.to.equal(5);
});
it('can type inputs', () => {
    nameInput()
        .should("have.value", "")
        .type("Bailey")
        .should("have.value", "Bailey");

    emailInput()
        .should("have.value", "")
        .type("bailey@random.com")
        .should("have.value", "bailey@random.com");
    
    passwordInput()
        .should("have.value", "")
        .type("password")
        .should("have.value", "password");
});
it('can check checkbox', () => {
    checkInput()
        .should("not.be.checked")
        .click()
        .should("be.checked");
});
it('submit button disabled until all fields are filled in', () => {
    submitBtn().should("be.disabled")
    nameInput().type("NAME")
    submitBtn().should("be.disabled")
    nameInput().clear()
    emailInput().type("EMAIL@EMAIL.COM")
    submitBtn().should("be.disabled")
    emailInput().clear()
    passwordInput().type("PASSWORD")
    submitBtn().should("be.disabled")
    passwordInput().clear()
    checkInput().check()
    submitBtn().should("be.disabled")
    nameInput().type("NAME")
    emailInput().type("EMAIL@EMAIL.COM")
    passwordInput().type("PASSWORD")
    submitBtn().should("not.be.disabled")
});
it('can submit form', () => {
    nameInput().type("NAME")
    emailInput().type("EMAIL@EMAIL.COM")
    passwordInput().type("PASSWORD")
    checkInput().check()
    submitBtn().click()
    cy.contains("NAME")
});
it('receive error message if input is left empty', () => {
    nameInput().type("NAME")
    nameInput().clear()
    cy.contains("name is required")
    emailInput().type("EMAIL")
    cy.contains("Must be a valid email address")
    emailInput().clear()
    emailInput().type("EMAIL@EMAIL.COM")
    emailInput().clear()
    cy.contains("Email is required")
    passwordInput().type("PA")
    cy.contains("this must be at least 3 characters")
    emailInput().clear()
    emailInput().type("EMAIL@EMAIL.COM")
    emailInput().clear()
    checkInput().click()
    checkInput().click()
    cy.contains("You must accept the terms and condition")


})
});