import React, { useEffect, useState, Fragment, KeyboardEvent} from 'react';
import { createUseStyles, ThemeProvider, useTheme } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PokemonInfoBadges } from './PokemonInfoBadges';
import Masonry from '@mui/lab/Masonry';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import _ from 'lodash'

type Pkmn = {
  id: string,
  name: string,
  types: Array<string>;
}

type Stats = {
  minimum: string;
  level: string;
}

interface Pokemon {
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
}

interface PokemonItemProps {
  index: number;
  pkmn: Pokemon;
}

interface CustomTheme {
  height1: string,
  height2: string
}

const theme: CustomTheme = {
  height1: "200px",
  height2: "250px"
};

const useStyles = createUseStyles(
  {
    content: {
      display: 'flex',
      width: '216px',
    },
    imageContainer: {
      width: '-webkit-fill-available',
      height: '110px',
      borderRadius: '5px',
      borderTopRightRadius: '5px',
      borderTopLeftRadius: '0px',
      borderBottomRightRadius: '5px',
      borderBottomLeftRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '15px',
    },
    name: {
      display: 'flex',
      justifyContent: 'center',
      color: '#3ABFF8',
      fontSize: '24px',
      fontWeight: '700'
    },
    num: {
      color: '#0f1729',
      fontSize: '22px',
      fontWeight: '900'
    },
    numberContainer: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      backgroundColor: '#3ABFF8',
      width: '30px',
      height: '120px',
      borderTopLeftRadius: '3px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '22px',
      fontWeight: '900',
      borderBottomRightRadius: '5px',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative',
    },
    cardBody: {
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'column',
      height: 'inherit',
      justifyContent: 'space-between'
    },
    pokemonImage: {
      height: '100px',
      width: '100px',
      borderRadius: '50%',
      border: '5px solid #3ABFF8',
    },
    masonryCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0f1729',
      position: 'relative',
      border: '2px solid #3ABFF8',
      borderRadius: '5px',
      margin: '7px !important',
      zIndex: '0',
      height: '225px',
    },
    hoverDiv: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      backgroundColor: 'rgba(130, 141, 248, 0.5)',
      right: '0px',
      zIndex: '2',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    hoverDivText: {
      fontSize: '32px',
      fontWeight: '900',
    },
    type: {
      backgroundColor: '#3ABFF8',
      display: 'inline-block',
      padding: {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10,
      },
      margin: {
        right: 10
      },
      borderRadius: '1.9rem',
      color: '#000'
    }
  }, { name: 'PokemonItem'}
);


type Badges = {
  id: string,
  badges: string[]
}


const PokemonItem: React.FC<PokemonItemProps> = ({ children, ...props }) => {
  const theme = useTheme<CustomTheme>();
  const classes = useStyles({ ...props, theme });
  const navigate = useNavigate();
  const location = useLocation();
  const [numArr, setNumArr] = useState<string[]>([]);
  const [badges, setBadges] = useState<{title: string; badges: string[]}[]>(
    [],
  );
  const [showHoverDiv, setShowHoverDiv] = useState<boolean>(false)
  useEffect(() => {
    if (props.pkmn !== undefined) {
      let numArr = props.pkmn.number.split('')
      numArr.unshift('#')
      setNumArr(numArr)
      setBadges(getBadges(props.pkmn))
    }
  }, [props.pkmn])
  const openModal = () => (
    navigate(`/${props.pkmn.id}/${props.pkmn.name}`, {
      state: {
        background: location
      }
    })
  )


  const getBadges = (pkmn: Pkmn) => {
    return [
      {
        title: 'TYPES:',
        badges: pkmn.types
      }
    ]
  }


  return (
    <div 
      className={classes.masonryCard} 
      onMouseEnter={() => setShowHoverDiv(true)} 
      onMouseLeave={() => setShowHoverDiv(false)}
      onClick={() => openModal()}
    >
      {showHoverDiv ?  
      <div className={classes.hoverDiv}>
        <div className={classes.hoverDivText}>See More</div>
      </div> : <div></div>}

      <div className={classes.numberContainer}>
        {numArr.map((num) => {
          return (
            <div className={classes.num}>{num}</div>
          )
        })}
      </div>
      <div className={classes.cardHeader}>
        <div className={classes.imageContainer}>
          <img className={classes.pokemonImage} src={props.pkmn.image}/>
        </div>
      </div>
      <div className={classes.cardBody}>
        <div className={classes.name}>
          {props.pkmn.name}
        </div>
        <PokemonInfoBadges id={props.pkmn.id} info={badges} fromModal={false}/>
      </div>
    </div>    
  );
};


type SearchState = {
  activeSuggestion: number,
  filteredSuggestions: Array<string> | never[],
  showSuggestions: boolean,
  userInput: string
}


export const PokemonList = () => {
  const classes = usePokemonListStyles();
  const { pokemons, loading, names } = useGetPokemons();
  const { windowSize } = useWindowSize();
  const [filteredResults, setFilteredResults] = useState<Pokemon[]>(pokemons);
  const initialSearchState = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ''
  }
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState)
  useEffect(() => {
      if (!loading && searchState.userInput === '') {
        setFilteredResults(pokemons)
      }
  })

  const getFilteredResults = (searchInput: string) => {
    let filteredResults = pokemons.filter(function(pokemon) {
      return pokemon.name === searchInput; });

    return filteredResults
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value
      const suggestions = names.filter(
        name =>
          name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      
      setSearchState({
        ...searchState,
        activeSuggestion: 0,
        filteredSuggestions: suggestions,
        showSuggestions: true,
        userInput: value
      })
      
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        setSearchState({
          ...searchState,
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: searchState.filteredSuggestions[searchState.activeSuggestion]
        })
    } else if (e.key === 'Up') {
      if (searchState.activeSuggestion === 0) {
        return;
      }
      setSearchState({
        ...searchState,
        activeSuggestion: searchState.activeSuggestion - 1
      })
    } else if (e.key === 'Down') {
      if (searchState.activeSuggestion - 1 === searchState.filteredSuggestions.length) {
        return;
      }
      setSearchState({
        ...searchState,
        activeSuggestion: searchState.activeSuggestion + 1
      })
    }
  }

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setSearchState({
      ...searchState,
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
    const updatedResults = filteredResults.filter(
      pokemon =>
        {
          return pokemon.name === e.currentTarget.innerText
        }
    );
    setFilteredResults(updatedResults)
  }

  const clearSearchState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSearchState({
      ...searchState,
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
  }
  
  const getColumns = () => {
    if (windowSize?.width && typeof windowSize.width === 'number') {
      if (windowSize?.width <= 600) {
        return 1
      } else if (windowSize?.width > 600 && windowSize?.width <= 760) {
        return 2
      } else if (windowSize?.width > 760 && windowSize?.width <= 989) {
        return 3
      } else if (windowSize?.width > 989) {
        return 4
      }
    } else {
      return 3
    }
  }

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      <Fragment>
        <div className={classes.inputContainer}>
          <div className={classes.searchIcon}>
            <SearchTwoToneIcon/>
          </div>
          <div className={classes.resetIcon} onClick={(e) => clearSearchState(e)}>
            <ClearTwoToneIcon/>
          </div>
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Type here"
            onChange={(e) => onChange(e)}
            onKeyDown={(e) => onKeyDown(e)}
            value={searchState.userInput}
          />
        </div>
        <div>
          {searchState.filteredSuggestions.length > 0 && 
             <ul className={classes.suggestions}>
             {searchState.filteredSuggestions.map((suggestion, index) => {
      
 
               return (
                 <li key={suggestion} onClick={(e) => onClick(e)}>
                   {suggestion}
                 </li>
               );
             })}
           </ul>
          }
        </div>
      </Fragment>
      <Masonry columns={getColumns()} className={classes.masonry}>
          <ThemeProvider theme={theme}>
            {filteredResults.map((pkmn, index) => {
              return (
                <>
                  <PokemonItem key={pkmn.id} pkmn={pkmn} index={index}/>
                  <Outlet/>
                </>
              )
            })}
            </ThemeProvider>
        </Masonry>
    </div>
  );
};



const usePokemonListStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      '& input:focus-visible': {
        outline: 'none'
      },
      '& ul': {
        paddingInlineStart: '0'
      }
    },
    inputContainer: {
      position: 'relative'
    },
    suggestions: {
      // border: '1px solid #3ABFF8',
      borderTop: 'none',
      borderLeft: '2px solid #3ABFF8',
      borderBottom: '2px solid #3ABFF8',
      borderRight: '2px solid #3ABFF8', 
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      listStyle: 'none',
      margin: {
        left: 3,
        top: 0
      },
      maxHeight: '143px',
      overflowY: 'auto',
      textAlign: 'left',
      '& li': {
        margin: {
          top: 5,
          bottom: 5
        },
        padding: '0.5rem'
      },
      '& li:hover': {
        backgroundColor: '#828DF8',
        color: 'white'
      }
    },
    searchIcon: {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      width: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    resetIcon: {
      position: 'absolute',
      top: '0',
      bottom: '0',
      right: '0',
      width: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchInput: {
      color: '#B3C5EF',
      backgroundColor: '#1D283A',
      height: '48px',
      padding: {
        top: 0,
        left: 40,
        right: 16,
        bottom: 0
      },
      fontSize: '16px',
      border: '2px solid #3ABFF8',
      borderRadius: '5px',
      width: '-webkit-fill-available',
      fontWeight: '500',
      margin: {
        left: 3
      }
    },
    masonry: {
      marginTop: '20px !important',
    },
    autocomplete: {

    },
    searchBar: {
      marginBottom: '20px',
      '& input': {
        color: "white"
      }
    },
    stack: {
      borderRadius: '5px',
      border: '3px solid #828DF8',
      marginBottom: '20px',
      '& input': {
        color: '#fff',
      }
    },
    suggestionField: {
      color: 'white'
    }
  }, {name: 'PokemonList'}
)
