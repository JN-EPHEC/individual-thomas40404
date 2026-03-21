// 1. Interface attendue par notre application
export interface IPaymentProcessor {
  pay(amountInEuros: number): void;
}

// 2. Ancien systeme (Compatible avec notre interface)
export class LegacyPaypal implements IPaymentProcessor {
  public pay(amountInEuros: number): void {
    console.log(`Paiement de ${amountInEuros}€ via Paypal (Legacy).`);
  }
}

// 3. NOUVEAU systeme externe (INCOMPATIBLE !)
// Vous n'avez pas le droit de modifier cette classe car elle
// provient d'une librairie externe (npm install stripe).
export class StripeModernAPI {
  public charge(amountInCents: number, currency: string): void {
    console.log(`Paiement de ${amountInCents / 100} ${currency} via Stripe.`);
  }
}

// 4. Notre service metier
export class CheckoutService {
  private paymentProcessor: IPaymentProcessor;

  constructor(processor: IPaymentProcessor) {
    this.paymentProcessor = processor;
  }

  public checkout(cartTotal: number): void {
    console.log("Validation du panier...");
    // Le service ne sait utiliser QUE la methode pay()
    this.paymentProcessor.pay(cartTotal);
  }
}

// --- Execution actuelle ---
const paypalProcessor = new LegacyPaypal();
const checkout = new CheckoutService(paypalProcessor);
checkout.checkout(50); // Fonctionne parfaitement
