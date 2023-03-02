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
import { AutomateAvecEspaces } from "./AutomateAvecEspaces";
import { GenericPair } from "./GenericPair";

export class AutomateComplet extends AutomateAvecEspaces {
  private _nbParentheses: number;
  constructor(chaine: string) {
    super(chaine);
    this._nbParentheses = 0;
  }
  // Entrée : numérique ou - unaire ou . flottant ou espace ou (
  public litEtat0(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === "(") {
      this._nbParentheses++;
      return this.litEtat0(idx + 1);
    }
    return super.litEtat0(idx);
  }

  // Entrée : numérique ou . flottant ou (
  public litEtat1(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === "(") {
      this._nbParentheses++;
      return this.litEtat1(idx + 1);
    }
    return super.litEtat1(idx);
  }

  // Entrée : numérique, . flottant, opérateur, =, espace, )
  protected litEtat3(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === ")") {
      this._nbParentheses--;
      if (this._nbParentheses < 0) {
        return new GenericPair(idx, "parenthèse fermante inatendue.");
      }
      return this.litEtat5(idx + 1);
    }
    if (car === "=" && this._nbParentheses > 0) {
      return new GenericPair(idx, "fin d'expression sans avoir fermé toutes les parenthèses.");
    }
    return super.litEtat3(idx);
  }

  // Entrée : numérique, opérateur, =, espace, )
  protected litEtat4(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === ")") {
      this._nbParentheses--;
      if (this._nbParentheses < 0) {
        return new GenericPair(idx, "parenthèse fermante inatendue.");
      }
      return this.litEtat5(idx + 1);
    }
    if (car === "=" && this._nbParentheses > 0) {
      return new GenericPair(idx, "fin d'expression sans avoir fermé toutes les parenthèses.");
    }
    return super.litEtat4(idx);
  }

  // Entrée : opérateur, =, espace, )
  protected litEtat5(idx: number): GenericPair<number, string> | boolean {
    const car = this.chaine.charAt(idx);
    if (car === ")") {
      this._nbParentheses--;
      if (this._nbParentheses < 0) {
        return new GenericPair(idx, "parenthèse fermante inatendue.");
      }
      return this.litEtat5(idx + 1);
    }
    if (car === "=" && this._nbParentheses > 0) {
      return new GenericPair(idx, "fin d'expression sans avoir fermé toutes les parenthèses.");
    }
    return super.litEtat5(idx);
  }
}
