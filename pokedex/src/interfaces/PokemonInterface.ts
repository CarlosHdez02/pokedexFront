export  interface pokemonInterface{
    id:string;
    name:string;
    url:string;
    sprites: Sprites

}
export interface pokemonResults{
    results: pokemonInterface[]
}

export interface Sprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  }