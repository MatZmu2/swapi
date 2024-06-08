export interface Person {
    name: string;
    mass: string;
}

export interface Starship {
    name: string;
    passengers: string;
}

export class DetailedGameResource {
    name: string;
    detailAttribute: string; 
  
    constructor(name: string, detailAttribute: string) {
      this.name = name;
      this.detailAttribute = detailAttribute;
    }
}
  
export type GameMode = 'people' | 'starships';
  
export type DetailedGameResourceByMode = {
    [key in GameMode]: DetailedGameResource[];
};