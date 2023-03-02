import { AutomateAvecEspaces } from "../modele/AutomateAvecEspaces";
import { GenericPair } from "../modele/GenericPair";

test("ok espaces au début", () => {
  const a = new AutomateAvecEspaces("    -4=");
  expect(a.evalue()).toBe(true);
});

test("ok espaces après unaire début", () => {
  const a = new AutomateAvecEspaces("- 3=");
  expect(a.evalue()).toBe(true);
});

test("ok espaces après nombre flottant", () => {
  const a = new AutomateAvecEspaces("5 + 10.75  =");
  expect(a.evalue()).toBe(true);
});

test("ok espaces avant opérateur", () => {
  const a = new AutomateAvecEspaces("5    +10=");
  expect(a.evalue()).toBe(true);
});

test("echoue nombre après nombre", () => {
  const result = new AutomateAvecEspaces("5    10=").evalue();
  expect(result).not.toBe(true);
  expect((result as GenericPair<number, string>).first).toBe(5);
});

//// Les précédents copiés de Automate
test("ok nombre positif", () => {
  const a = new AutomateAvecEspaces("8=");
  expect(a.evalue()).toBe(true);
});

test("ok nombre négatif", () => {
  const a = new AutomateAvecEspaces("-8=");
  expect(a.evalue()).toBe(true);
});

test("ok nombre négatif réel", () => {
  const a = new AutomateAvecEspaces("-.8=");
  expect(a.evalue()).toBe(true);
});

test("ok réel", () => {
  const a = new AutomateAvecEspaces("19.5478=");
  expect(a.evalue()).toBe(true);
});

test("ok réel abrupt droite", () => {
  const a = new AutomateAvecEspaces("19.=");
  expect(a.evalue()).toBe(true);
});

test("ok réel abrupt gauche", () => {
  const a = new AutomateAvecEspaces(".19=");
  expect(a.evalue()).toBe(true);
});

test("ok addition", () => {
  const a = new AutomateAvecEspaces("8+3=");
  expect(a.evalue()).toBe(true);
});

test("ok soustraction", () => {
  const a = new AutomateAvecEspaces("8-3=");
  expect(a.evalue()).toBe(true);
});

test("ok multiplication", () => {
  const a = new AutomateAvecEspaces("8*3=");
  expect(a.evalue()).toBe(true);
});

test("ok division", () => {
  const a = new AutomateAvecEspaces("8/3=");
  expect(a.evalue()).toBe(true);
});

test("ok opérande droite négatif", () => {
  const a = new AutomateAvecEspaces("8*-3=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre négatifs", () => {
  const a = new AutomateAvecEspaces("-8.5/-3.87=");
  expect(a.evalue()).toBe(true);
});

test("ok soustraction entre négatifs", () => {
  const a = new AutomateAvecEspaces("-8.5--3.87=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre réels", () => {
  const a = new AutomateAvecEspaces("8.5/3.87=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre réels abrupts droite", () => {
  const a = new AutomateAvecEspaces("8./3.=");
  expect(a.evalue()).toBe(true);
});

test("ok opération entre réels abrupts gauche", () => {
  const a = new AutomateAvecEspaces(".8/.3=");
  expect(a.evalue()).toBe(true);
});

test("ok complexe", () => {
  const a = new AutomateAvecEspaces("8.5/3.87*-2/5+-3.87=");
  expect(a.evalue()).toBe(true);
});

test("echoue réel", () => {
  const res = new AutomateAvecEspaces("8/3.5.4=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(5);
});

test("echoue double opérateur", () => {
  const res = new AutomateAvecEspaces("8/*3.5=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("echoue + unaire debut", () => {
  const res = new AutomateAvecEspaces("+8/*3.5=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(0);
});

test("echoue + unaire après opérateur", () => {
  const res = new AutomateAvecEspaces("8/+3.5=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("echoue = pas sur un état de satisfaction 0", () => {
  const res = new AutomateAvecEspaces("=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(0);
});

test("echoue = pas sur un état de satisfaction 1", () => {
  const res = new AutomateAvecEspaces("-=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});

test("echoue = pas sur un état de satisfaction 2", () => {
  const res = new AutomateAvecEspaces("8+=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(2);
});

test("echoue . seul début", () => {
  const res = new AutomateAvecEspaces(".=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});

test("echoue . seul après opérateur", () => {
  const res = new AutomateAvecEspaces("5/.=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(3);
});

test("echoue caractère bizarre avant opérateur", () => {
  const res = new AutomateAvecEspaces("5z+3=").evalue();
  expect(res).not.toBe(true);
  expect((res as GenericPair<number, string>).first).toBe(1);
});
