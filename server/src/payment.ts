// ============================================================================
// --- INIT - Code initial sans Adapter ---
// ============================================================================

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

// ============================================================================
// --- CORRECTION : La nouvelle classe Adapter ---
// ============================================================================

export class StripeAdapter implements IPaymentProcessor {
  private stripeApi: StripeModernAPI;

  constructor(stripeApi: StripeModernAPI) {
    this.stripeApi = stripeApi;
  }

  // On respecte le contrat de NOTRE application
  public pay(amountInEuros: number): void {
    // On adapte les donnees pour le systeme externe
    const amountInCents = amountInEuros * 100;
    const currency = "EUR";

    // On delegue le vrai travail a l'API Stripe
    this.stripeApi.charge(amountInCents, currency);
  }
}

// --- Execution corrigee ---

// 1. On instancie la nouvelle librairie incompatible
const stripeSystem = new StripeModernAPI();

// 2. On l'enveloppe dans notre Adaptateur
const adapter = new StripeAdapter(stripeSystem);

// 3. On passe l'adaptateur a notre service (qui n'y voit que du feu !)
const checkoutStripe = new CheckoutService(adapter);

checkoutStripe.checkout(50);
// Affiche : Validation du panier...
// Affiche : Paiement de 50 EUR via Stripe.