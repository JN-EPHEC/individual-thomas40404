export class OrderManager {
  public processOrder(
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    userPhone: string,
    userStreet: string,
    userCity: string,
    userZip: string,
    userCountry: string,
    productId: number,
    productName: string,
    productPrice: number,
    productStock: number,
    quantity: number,
    discountCode: string,
  ): number {
    // 1. Validation de l'utilisateur
    if (!userEmail.includes("@") || userFirstName === "") {
      throw new Error("Utilisateur invalide");
    }

    // 2. Vérification de l'inventaire
    if (quantity > productStock) {
      throw new Error("Stock insuffisant");
    }

    // 3. Calcul du prix
    let basePrice = productPrice * quantity;
    let finalPrice = basePrice;

    if (discountCode === "SUMMER20") {
      finalPrice = finalPrice - finalPrice * 0.2;
    } else if (discountCode === "WELCOME10") {
      finalPrice = finalPrice - finalPrice * 0.1;
    }

    finalPrice = finalPrice + finalPrice * 0.21; // Ajout de 21% de TVA

    // 4. Mise à jour du stock (Simulation)
    productStock = productStock - quantity;

    // 5. Envoi de l'email de confirmation
    console.log("Connexion au serveur SMTP...");
    console.log(
      `Envoi de l'email à ${userEmail}: Votre commande pour ${quantity}x ${productName} est confirmée. Total: ${finalPrice}€.`,
    );

    return finalPrice;
  }

  // Méthode pour calculer un remboursement
  public calculateRefund(
    productPrice: number,
    quantity: number,
    discountCode: string,
  ): number {
    let basePrice = productPrice * quantity;
    let refundAmount = basePrice;

    if (discountCode === "SUMMER20") {
      refundAmount = refundAmount - refundAmount * 0.2;
    } else if (discountCode === "WELCOME10") {
      refundAmount = refundAmount - refundAmount * 0.1;
    }

    refundAmount = refundAmount + refundAmount * 0.21; // Ajout de 21% de TVA

    console.log("Connexion au serveur SMTP...");
    console.log(
      `Envoi de l'email de remboursement. Montant: ${refundAmount}€.`,
    );

    return refundAmount;
  }
}
