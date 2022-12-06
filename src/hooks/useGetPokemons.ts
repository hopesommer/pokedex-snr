import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type Stats = {
  minimum: string;
  level: string;
}

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: Array<Stats>;
  height: Array<Stats>;
  classification: string;
  types: Array<string>;
  resistant: Array<string>;
  weaknesses: Array<string>;
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
  image: Pokemon['image'],
  number: Pokemon['number'];
  types: Pokemon['types'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name,
      number,
      image,
      types
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name, number: p.number, types: p.types, image: p.image  })),
    [pokemons]
  );
  const names = pokemons.map(function(pokemon) {
    return pokemon['name'];
  });

  return {
    pokemons,
    pokemonOptions,
    names,
    ...queryRes,
  };
};
