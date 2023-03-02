import { AutomateComplet } from "../modele/AutomateComplet";
import { GenericPair } from "../modele/GenericPair";

test("ok parenthèses au début", () => {
  const a = new AutomateComplet("(4+3)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses au début avec espaces ", () => {
  const a = new AutomateComplet("    (  4+3 )  =");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses pas au début", () => {
  const a = new AutomateComplet("5*(4+3)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses plusieurs", () => {
  const a = new AutomateComplet("5 *(4 +3 ) + ( 8/6*5-3) / ( 2 + 5 )=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses dans parenthèses", () => {
  const a = new AutomateComplet("5 * (4+3 + (7/5))=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses dans parenthèses", () => {
  const a = new AutomateComplet("5 * (4+3 + (7/5))=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses imbriquées droite", () => {
  const a = new AutomateComplet("5 * (4+(3 * 7/5))=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses imbriquées gauche", () => {
  const a = new AutomateComplet("5 * ((4+3 - 7/5) * 8)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses dans parenthèses ouvrantes expacées", () => {
  const a = new AutomateComplet("5 * ( (4+3 + (7/5))-2)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses dans parenthèses fermantes expacées", () => {
  const a = new AutomateComplet("5 * ((4+3 + (7/5)   )-2)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses et opérateur unaire", () => {
  const a = new AutomateComplet("5 * -(8 + 3)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses inutiles mais justes et opérateur unaire", () => {
  const a = new AutomateComplet("5 * -(8)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses inutiles mais justes et opérateur unaire avec réel", () => {
  const a = new AutomateComplet("5 * -(8.)=");
  expect(a.evalue()).toBe(true);
});

test("ok parenthèses inutiles mais justes et opérateur unaire avec autre réel", () => {
  const a = new AutomateComplet("5 * -(.85)=");
  expect(a.evalue()).toBe(true);
});

test("échoue 1 parenthèse ouvrante début", () => {
  const res = new AutomateComplet("(=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});

test("échoue 1 parenthèse fermante début", () => {
  const res = new AutomateComplet(")=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(0);
});

test("échoue parenthèses vides ", () => {
  const res = new AutomateComplet("()=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});

test("échoue parenthèse par fermée ", () => {
  const res = new AutomateComplet("(8+3=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(4);
});

test("échoue parenthèse fermante en trop après entier ", () => {
  const res = new AutomateComplet("(8+3))=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(5);
});

test("échoue parenthèse fermante manque après réel ", () => {
  const res = new AutomateComplet("(8+3.5=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(6);
});

test("échoue parenthèse fermante manque après nombre et espace ", () => {
  const res = new AutomateComplet("(8+3.5 =").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(7);
});

test("échoue parenthèses dos à dos", () => {
  const res = new AutomateComplet("(8+3)(5+1)=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(5);
});

test("échoue parenthèses ouvrante après .", () => {
  const res = new AutomateComplet("5.(8+3)=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("échoue parenthèses ouvrante après entier", () => {
  const res = new AutomateComplet("(8(5+3))=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("échoue parenthèses ouvrante après réel", () => {
  const res = new AutomateComplet("(8.5(5+3))=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(4);
});

test("échoue parenthèse fermante après - unaire", () => {
  const res = new AutomateComplet("(5+-)=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(4);
});

test("échoue parenthèse fermante  en trop après entier", () => {
  const res = new AutomateComplet("5+8)=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(3);
});

test("échoue parenthèse fermante  en trop après réel", () => {
  const res = new AutomateComplet("5+8.6)=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(5);
});

//// Les précédents copiés de AutomateAvecEspaces
test("ok espaces au début", () => {
  const a = new AutomateComplet("    -4=");
  expect(a.evalue()).toBe(true);
});

test("ok espaces après unaire début", () => {
  const a = new AutomateComplet("- 3=");
  expect(a.evalue()).toBe(true);
});

test("ok espaces après nombre flottant", () => {
  const a = new AutomateComplet("5 + 10.75  =");
  expect(a.evalue()).toBe(true);
});

test("ok espaces avant opérateur", () => {
  const a = new AutomateComplet("5    +10=");
  expect(a.evalue()).toBe(true);
});

test("echoue nombre après nombre", () => {
  const result = new AutomateComplet("5    10=").evalue();
  expect(result).not.toBe(true);
  expect((result as GenericPair<number, string>).first).toBe(5);
});

test("ok nombre positif", () => {
  const a = new AutomateComplet("8=");
  expect(a.evalue()).toBe(true);
});

test("ok nombre négatif", () => {
  const a = new AutomateComplet("-8=");
  expect(a.evalue()).toBe(true);
});

test("ok nombre négatif réel", () => {
  const a = new AutomateComplet("-.8=");
  expect(a.evalue()).toBe(true);
});

test("ok réel", () => {
  const a = new AutomateComplet("19.5478=");
  expect(a.evalue()).toBe(true);
});

test("ok réel abrupt droite", () => {
  const a = new AutomateComplet("19.=");
  expect(a.evalue()).toBe(true);
});

test("ok réel abrupt gauche", () => {
  const a = new AutomateComplet(".19=");
  expect(a.evalue()).toBe(true);
});

test("ok addition", () => {
  const a = new AutomateComplet("8+3=");
  expect(a.evalue()).toBe(true);
});

test("ok soustraction", () => {
  const a = new AutomateComplet("8-3=");
  expect(a.evalue()).toBe(true);
});

test("ok multiplication", () => {
  const a = new AutomateComplet("8*3=");
  expect(a.evalue()).toBe(true);
});

test("ok division", () => {
  const a = new AutomateComplet("8/3=");
  expect(a.evalue()).toBe(true);
});

test("ok opérande droite négatif", () => {
  const a = new AutomateComplet("8*-3=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre négatifs", () => {
  const a = new AutomateComplet("-8.5/-3.87=");
  expect(a.evalue()).toBe(true);
});

test("ok soustraction entre négatifs", () => {
  const a = new AutomateComplet("-8.5--3.87=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre réels", () => {
  const a = new AutomateComplet("8.5/3.87=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre réels abrupts droite", () => {
  const a = new AutomateComplet("8./3.=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre réels abrupts gauche", () => {
  const a = new AutomateComplet(".8/.3=");
  expect(a.evalue()).toBe(true);
});

test("ok complexe", () => {
  const a = new AutomateComplet("8.5/3.87*-2/5+-3.87=");
  expect(a.evalue()).toBe(true);
});

test("echoue réel", () => {
  const res = new AutomateComplet("8/3.5.4=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(5);
});

test("echoue double opérateur", () => {
  const res = new AutomateComplet("8/*3.5=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("echoue + unaire debut", () => {
  const res = new AutomateComplet("+8/*3.5=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(0);
});

test("echoue + unaire après opérateur", () => {
  const res = new AutomateComplet("8/+3.5=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("echoue = pas sur un état de satisfaction 0", () => {
  const res = new AutomateComplet("=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(0);
});

test("echoue = pas sur un état de satisfaction 1", () => {
  const res = new AutomateComplet("-=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});

test("echoue = pas sur un état de satisfaction 2", () => {
  const res = new AutomateComplet("8+=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("echoue . seul début", () => {
  const res = new AutomateComplet(".=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});

test("echoue . seul après opérateur", () => {
  const res = new AutomateComplet("5/.=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(3);
});

test("echoue caractère bizarre avant opérateur", () => {
  const res = new AutomateComplet("5z+3=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});
