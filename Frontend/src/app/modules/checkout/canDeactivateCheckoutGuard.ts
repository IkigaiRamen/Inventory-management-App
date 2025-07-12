import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { CheckoutComponent } from "./checkout.component";
import { Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
@Injectable({
    providedIn: 'root',
  })
export class CanDeactivateCheckoutGuard implements CanDeactivate<CheckoutComponent> {
    constructor(private confirmationService: ConfirmationService) {}

    canDeactivate(
      component: CheckoutComponent
    ): Observable<boolean> | Promise<boolean> | boolean {
      if (component.navigationThroughButton) {
        return true;
      }
  
      return new Observable<boolean>((observer) => {
        this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir quitter et annuler la commande en cours ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            component.deleteCommandeIfExists(); // Call your method to delete the commande
            observer.next(true); // User accepted to leave
            observer.complete(); // Complete the observable
          },
          reject: () => {
            observer.next(false); // User rejected to leave
            observer.complete(); // Complete the observable
          },
        });
      });
    }
  }