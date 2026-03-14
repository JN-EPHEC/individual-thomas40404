import { validatePassword } from "../utils/password";
describe("Password Validator - White Box Testing", () => {
    // Branch 1: mot de passe vide
    it("devrait rejeter un mot de passe vide", () => {
        expect(validatePassword("", 25)).toBe(false);
    });
    // Branch 2: mot de passe trop court
    it("devrait rejeter un mot de passe trop court", () => {
        expect(validatePassword("1234567", 25)).toBe(false);
    });
    // Branch 3: mot de passe trop long
    it("devrait rejeter un mot de passe trop long", () => {
        expect(validatePassword("Ce Mot De Passe Est Super L0ong C'est fou", 25)).toBe(false);
    });
    // Branch 4: enfant sans lowercase
    it("devrait rejeter un mot de passe sans lower pour enfant", () => {
        expect(validatePassword("MAJUSCULEEEEE", 10)).toBe(false);
    });
    // Branch enfant correct
    it("devrait accepter un mot de passe correct pour enfant", () => {
        expect(validatePassword("CestOKKKKKKKKKK", 10)).toBe(true);
    });
    // Branch 5: adulte sans majuscule, minuscule ou chiffre
    it("devrait rejeter un mot de passe adulte faible", () => {
        expect(validatePassword("motdepassenul", 25)).toBe(false);
    });
    // Branch 6: adulte sans caractère spécial
    it("devrait rejeter un mot de passe adulte sans caractère spécial", () => {
        expect(validatePassword("FortMaisPasAssez0", 25)).toBe(false);
    });
    // Adulte correct
    it("devrait accepter un mot de passe adulte correct", () => {
        expect(validatePassword("SuperF0rt?", 25)).toBe(true);
    });
    // Branch 7: senior sans chiffre ni majuscule
    it("devrait rejeter un mot de passe senior sans chiffre et sans majuscule", () => {
        expect(validatePassword("minusucleeee", 70)).toBe(false);
    });
    // Senior avec majuscule mais sans chiffre
    it("devrait accepter un mot de passe senior avec majuscule mais sans chiffre", () => {
        expect(validatePassword("PasDeChiffre", 70)).toBe(true);
    });
    // Senior avec chiffre mais sans majuscule
    it("devrait accepter un mot de passe senior avec chiffre mais sans majuscule", () => {
        expect(validatePassword("minusculemaisok1", 70)).toBe(true);
    });
    // Senior avec chiffre et majuscule
    it("devrait accepter un mot de passe senior avec majuscule et chiffre", () => {
        expect(validatePassword("CeMotDePasseEstT0P", 70)).toBe(true);
    });
});
//# sourceMappingURL=password.test.js.map