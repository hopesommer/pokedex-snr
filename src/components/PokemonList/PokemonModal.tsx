import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createUseStyles } from 'react-jss';
import { useGetPokemon } from '../../hooks/useGetPokemon'
import { PokemonInfoBadges } from './PokemonInfoBadges';
import { PokemonStatTiles } from "./PokemonStatTiles";
import { useWindowSize } from '../../hooks/useWindowSize';
import CloseIcon from '@mui/icons-material/Close';

import { 
  Button, 
  Divider, 
  Grid 
} from '@mui/material';

type Weight = {
  minimum: string,
  maximum: string,
}

interface Stats {
  minimum: string;
  level: string;
}

export type Tiles = {
  tite: string,
  value: string
}

export type Pkmn = {
   [key: string]: any;
    id: string;
    number: number;
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

type Badges = {
  id: string,
  badges: string[]
}


export const PokemonModal = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { isMobile } = useWindowSize();
    const params = useParams();
    const [numArr, setNumArr] = useState<string[]>([]);
    const [tiles, setTiles] = useState<{title: string; value: number}[]>(
      [],
    );
    const [badges, setBadges] = useState<{title: string; badges: string[]}[]>(
      [],
    );
    const {pkmn, loading} = useGetPokemon(params.id, params.name);
    useEffect(() => {
      if (pkmn !== undefined) {
        let numArr = pkmn.number.split('')
        numArr.unshift('#')
        setNumArr(numArr)
        setTiles(getTiles(pkmn))
        setBadges(getBadges(pkmn))
      }
    }, [pkmn])

    const getBadges = (pkmn: Pkmn) => {
      return [
        {
          title: 'TYPES:',
          badges: pkmn.types,
        },
        {
          title: 'RESISTANT:',
          badges: pkmn.resistant,
        },
        {
          title: 'WEAKNESSES:',
          badges: pkmn.weaknesses,
        }
      ]
    }

    const getTiles = (pkmn: Pkmn) => {
      return [
        {
          title: 'Flee Rate',
          value: pkmn.fleeRate,
        },
        {
          title: 'Max CP',
          value: pkmn.maxCP,
        },
        {
          title: 'Max HP',
          value: pkmn.maxHP
        }
      ]
    }

    const formatHeight = (height: Weight) => {
        let min = Number(height.minimum.slice(0, -1))
        let max = Number(height.maximum.slice(0, -2))
        let average = ((min + max) / 2).toFixed(2)
        return `${average} m`
    }
    
    const formatWeight = (weight: Weight) => {
      let min = Number(weight.minimum.slice(0, -2))
      let max = Number(weight.maximum.slice(0, -2))
      let average = ((min + max) / 2).toFixed(2)
      return `${average} kg` 
    }

    const getClassification = () => {
      if (isMobile) {
        let nameArr = pkmn.classification.split(' ')
        return nameArr[0]

      } else {
        return pkmn.classification
      }
    }

    return (
      <div className={classes.modalDiv}>
        {loading && <div>Loading...</div>}
        {!loading && <div className={isMobile ? classes.mobileModal : classes.modal}>
          <div className={classes.gradientContainer}/>
          <div className={classes.numberContainer}>
            {numArr.map((num) => {
              return (
                <div className={classes.num}>{num}</div>
              )
            })}
          </div>
          <div className={classes.closeButton} onClick={() => navigate(-1)}>
            <CloseIcon/>
          </div>
          <div className={classes.modalHeader}>
              <img className={classes.image} src={pkmn.image}/>
          </div>
          <div className={isMobile ? classes.mobileModalContent: classes.modalContent}>
            <div className={classes.modalBody}>
              <Grid className={classes.grid} container spacing={2}>
                <Grid xs={6}>
                  <div className={isMobile ? classes.mobileTitle : classes.title}>{pkmn.name}</div>
                  <div className={isMobile ? classes.mobileSubtitle : classes.subtitle}>{getClassification()}</div>
                </Grid>
                {!isMobile && <Grid xs={1}>
                  <Divider orientation="vertical"/>
                </Grid>}
                <Grid xs={isMobile ? 6 : 5} className={classes.measurements}>
                    <div className={classes.measurement}>Height: {formatHeight(pkmn.height)}</div>
                    <div className={classes.measurement}>Weight: {formatWeight(pkmn.weight)}</div>
                  </Grid>
              </Grid>
              <PokemonStatTiles tiles={tiles} isMobile={isMobile}/>
              <PokemonInfoBadges id={pkmn.id} info={badges} fromModal={true}/>
            </div>
          </div>
        </div>}
      </div>
    )
}

const useStyles = createUseStyles(
    {
      closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px'
      },
      modalDiv: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#5b708366',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },   
      mobileModal: {
        width: '300px',
        height: '510px',
        backgroundColor: '#0f1729',
        borderRadius: '5px',
        alignItems: 'center',
        paddingTop: '20px',
        justifyContent: 'space-between',
        position: 'relative'
      },
      modal: {
        width: '400px',
        height: '550px',
        backgroundColor: '#0f1729',
        borderRadius: '5px',
        alignItems: 'center',
        paddingTop: '20px',
        justifyContent: 'space-between',
        position: 'relative'
      },
      modalHeader: {
        width: '100%',
        marginBottm: '10px',
        padding: '30px 0px',
        display: 'flex'
      },
      modalButton: {
        backgroundColor: '#3ABFF8 !important',
      },
      mobileModalContent: {
        height: '68%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexDirection: 'column',
        marginBottom: '40px',
      },
      modalContent: {
        height: '68%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 40px',
        flexDirection: 'column',
        marginBottom: '40px',
      },
      modalFooter: {
        display: 'flex',
        justifyContent: 'center'
      },
      height: {
        marginBottom: '5px'
      },
      weight: {

      },
      measurements: {
        display: 'flex',
        flexDirection: 'column !important',
        justifyContent: 'end',
        alignItems: 'end',
        fontWeight: '500',
        fontSize: '16px',
      },
      measurement: {
        marginBottom: '5px',
        color: '#B3C5EF'
      },
      modalBody: {

      },
      gradientContainer: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100px',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        backgroundColor: '#1D283A'
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
        width: '50px',
        height: '130px',
        borderTopLeftRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '22px',
        fontWeight: '900',
        borderBottomRightRadius: '5px',
      },
      grid: {
        marginRight: '0px !important',
        marginLeft: '0px !important',
        marginBottom: '20px',
        width: 'inherit !important'
      },
      mobileTitle: {
        display: 'inline-flex',
        marginRight: '15px',
        fontSize: '24px',
        fontWeight: '700',
        color: '#3ABFF8'
      },
      title: {
        display: 'inline-flex',
        marginRight: '15px',
        fontSize: '32px',
        fontWeight: '700',
        color: '#3ABFF8'
      },
      mobileSubtitle: {
        display: 'inline-flex',
        marginTop: '5px',
        color: '#3ABFF8',
        fontWeight: '500',
        fontSize: '16px',
      },
      subtitle: {
        display: 'inline-flex',
        marginTop: '5px',
        color: '#3ABFF8',
        fontWeight: '500',
      },
      type: {
        backgroundColor: '#3ABFF8',
        display: 'inline-block',
        padding: '5px 10px',
        marginRight: '10px',
        borderRadius: '1.9rem',
        color: '#000',
        fontSize: '14px',
      },
      image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '5px solid #3ABFF8',
        margin: 'auto',
        zIndex: '2'
      },
    },
    { name: 'PokemonModal' }
  );