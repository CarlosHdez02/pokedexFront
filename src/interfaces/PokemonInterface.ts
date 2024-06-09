export interface pokemonInterface {
    id: number;
    name: string;
    url: string;
    sprites: {
      front_default: string;
      // Add other sprite URLs if necessary
    };
    abilities: PokemonAbilities[];
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

export interface Abilities{
    name:string;
    url:string
}
export interface PokemonAbilities{
    ability:Abilities;
    is_hidden:boolean;
    slot:number
}