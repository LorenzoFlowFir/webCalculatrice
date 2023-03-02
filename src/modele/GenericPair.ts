export class GenericPair<T, U> {
  private _first: T;
  private _second: U;

  constructor(first: T, second: U) {
    this.first = first;
    this.second = second;
  }

  public get first(): T {
    return this._first;
  }

  public set first(first: T) {
    this._first = first;
  }

  public get second(): U {
    return this._second;
  }

  public set second(second: U) {
    this._second = second;
  }

  public toString(): string {
    return this._first + ", " + this._second;
  }
}
