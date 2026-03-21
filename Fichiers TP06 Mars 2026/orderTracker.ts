// --- Les services existants ---
class PushNotificationService {
  public sendPush(status: string): void {
    console.log(`[PUSH] Votre commande est desormais : ${status}`);
  }
}

class CRMService {
  public updateHistory(status: string): void {
    console.log(`[CRM] Historique mis a jour avec le statut : ${status}`);
  }
}

class EmailService {
  public sendEmail(status: string): void {
    console.log(`[EMAIL] Email envoye : Statut de commande = ${status}`);
  }
}

// --- Le Suivi de Commande (Fortement couple !) ---
export class OrderTracker {
  private status: string = "EN_ATTENTE";

  // La classe instancie elle-meme ses dependances (Mauvaise pratique)
  private pushService = new PushNotificationService();
  private crmService = new CRMService();
  private emailService = new EmailService();

  public setStatus(newStatus: string): void {
    this.status = newStatus;
    console.log(`\n--- Le statut de la commande passe a : ${this.status} ---`);

    // Notifications directes (Couplage fort)
    this.pushService.sendPush(this.status);
    this.crmService.updateHistory(this.status);
    this.emailService.sendEmail(this.status);
  }
}

// Execution actuelle
const tracker = new OrderTracker();
tracker.setStatus("EXPEDIEE");
