export abstract class Entity {
  static get path() {
    return this.name.toLowerCase();
  }
  id: number;
}
