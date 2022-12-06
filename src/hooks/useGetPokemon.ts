import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type Stats = {
    minimum: string;
    level: string;
}

export type Pkmn = {
   [key: string]: any;
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
    image?: string;
}

export type PkmnOption = {
    value: Pkmn['id'];
    number: Pkmn['number'];
    label: Pkmn['name'];
    weight: Pkmn['weight'];
    height: Pkmn['height'];
    classification: Pkmn['classification'];
    types: Pkmn['types'];
    resistant: Pkmn['resistance'];
    weaknesses: Pkmn['weaknesses'];
    fleeRate: Pkmn['fleeRate'];
    maxCP: Pkmn['maxCP'];
    maxHP: Pkmn['maxHP'];
    image: Pkmn['image'];
}


export const GET_POKEMON = gql`
    query pokemon($id: String, $name: String){
        pokemon(id: $id, name: $name){
            id
            number
            name
            weight{
                minimum
                maximum
            }
            height{
                minimum
                maximum
            }
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            maxHP
            image
        }
    }  
`;

export const useGetPokemon = (id: string | undefined, name: string | undefined) => {
    const { data, ...queryRes } = useQuery(GET_POKEMON, {
        variables: { 
            id: id,
            name: name,
         }
    })

    const pkmn = useMemo(() => data?.pokemon, [data])

    return {
        pkmn,
        ...queryRes
    }
}