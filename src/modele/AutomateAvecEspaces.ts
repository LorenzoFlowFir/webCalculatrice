/**
 * Class AutomateAvecEspaces
 *
 * Automate de vérification d'une formule définie comme suit :
 * - entiers ou réels
 * - opérateurs : * / + -
 * - les espaces surnuméraires sont acceptés
 *
 *
 */
import { Automate } from "./Automate";
import { GenericPair } from "./GenericPair";

export class AutomateAvecEspaces extends Automate {
  // Entrée : numérique ou - unaire ou . flottant ou espace
  public litEtat0(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === " ") {
      return this.litEtat0(idx + 1);
    }
    return super.litEtat0(idx);
  }

  // Entrée : numérique ou . flottant ou espace
  public litEtat1(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === " ") {
      return this.litEtat1(idx + 1);
    }
    return super.litEtat1(idx);
  }

  // Entrée : numérique, . flottant, opérateur, =, espace
  protected litEtat3(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === " ") {
      return this.litEtat5(idx + 1);
    }
    return super.litEtat3(idx);
  }

  // Entrée : numérique, opérateur, =, espace
  protected litEtat4(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === " ") {
      return this.litEtat5(idx + 1);
    }
    return super.litEtat4(idx);
  }

  // Entrée : opérateur, =, espace
  protected litEtat5(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === "*" || car === "/" || car === "+" || car == "-") {
      return this.litEtat0(idx + 1);
    }
    if (car === "=") {
      return true;
    }
    if (car === " ") {
      return this.litEtat5(idx + 1);
    }
    return new GenericPair(idx, "Attendu : numérique, opérateur, =");
  }
}
