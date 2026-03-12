import { validateUserRegistration } from "../utils/userValidator";

describe("User Registration Validator", () => {

  // Age non valide
  it("devrait lancer une erreur si age n'est pas un nombre valide", () => {
    expect(() =>
      validateUserRegistration("dix" as any, "user", "test@test.com")
    ).toThrow("Âge invalide");
  });

  // Age > 120
  it("devrait lancer une erreur si age > 120", () => {
    expect(() =>
      validateUserRegistration(1000, "user", "test@test.com")
    ).toThrow("Âge invalide");
  });

  // Role invalide
  it("devrait lancer une erreur si role invalide", () => {
    expect(() =>
      validateUserRegistration(25, "chef des troupes" as any, "test@test.com")
    ).toThrow("Rôle invalide");
  });

  // Mineur non stagiaire
  it("devrait refuser un mineur non stagiaire", () => {
    expect(
      validateUserRegistration(16, "user", "test@test.com")
    ).toBe(false);
  });

  // Mineur stagiaire
  it("devrait accepter un mineur stagiaire", () => {
    expect(
      validateUserRegistration(16, "stagiaire", "test@test.com")
    ).toBe(true);
  });

  // Email sans @
  it("devrait refuser email sans @", () => {
    expect(
      validateUserRegistration(25, "user", "testtest.com")
    ).toBe(false);
  });

  // Email sans .
  it("devrait refuser email sans point", () => {
    expect(
      validateUserRegistration(25, "user", "test@testcom")
    ).toBe(false);
  });

  // Cas valide user
  it("devrait accepter un utilisateur valide", () => {
    expect(
      validateUserRegistration(25, "user", "test@test.com")
    ).toBe(true);
  });

  // Cas valide admin
  it("devrait accepter un admin valide", () => {
    expect(
      validateUserRegistration(40, "admin", "admin@test.com")
    ).toBe(true);
  });
// ----- facultatif pour tester les ages extremes  ----
  // Age limite 18
  it("devrait accepter age 18", () => {
    expect(
      validateUserRegistration(18, "user", "test@test.com")
    ).toBe(true);
  });

  // Age limite 120
  it("devrait accepter age 120", () => {
    expect(
      validateUserRegistration(120, "user", "test@test.com")
    ).toBe(true);
  });

});