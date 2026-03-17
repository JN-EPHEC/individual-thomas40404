export function validateUserRegistration(
  age: number,
  role: "admin" | "user" | "stagiaire",
  email: string
): boolean {

  if (isNaN(age)) {
    throw new Error("Âge invalide");
  }

  if (!["admin", "user", "stagiaire"].includes(role)) {
    throw new Error("Rôle invalide");
  }

  if (age > 120) {
    throw new Error("Âge invalide");
  }

  if (age < 18 && role !== "stagiaire") {
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  return true;
}