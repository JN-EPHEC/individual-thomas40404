// 1. Interface Observateur
export interface IOrderObserver {
  update(status: string): void;
}

// 2. Les services implémentent l'interface
export class PushNotificationService implements IOrderObserver {
  public update(status: string): void {
    console.log(`[PUSH] Votre commande est desormais : ${status}`);
  }
}

export class CRMService implements IOrderObserver {
  public update(status: string): void {
    console.log(`[CRM] Historique mis a jour avec le statut : ${status}`);
  }
}

export class EmailService implements IOrderObserver {
  public update(status: string): void {
    console.log(`[EMAIL] Email envoye : Statut de commande = ${status}`);
  }
}

// 3. Le Sujet refactoré
export class OrderTracker {
  private status: string = "EN_ATTENTE";
  private observers: IOrderObserver[] = [];

  public attach(observer: IOrderObserver): void {
    this.observers.push(observer);
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.status);
    }
  }

  public setStatus(newStatus: string): void {
    this.status = newStatus;
    console.log(`\n--- Le statut de la commande passe a : ${this.status} ---`);
    this.notifyObservers();
  }
}

// 4. Execution
const tracker = new OrderTracker();
tracker.attach(new PushNotificationService());
tracker.attach(new CRMService());
tracker.attach(new EmailService());
tracker.setStatus("EXPEDIEE");