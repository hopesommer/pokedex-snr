import { createUseStyles } from 'react-jss';

type Tile = {
    title: string,
    value: number
}

interface Props {
    isMobile: Boolean,
    tiles: Array<Tile>
}

export const PokemonStatTiles = ({...props}: Props) => {
    const classes = useStyles();
    const getClass = (index: number) =>{
        switch(index) {
            case 0: 
                return props.isMobile ? classes.tile0Mobile : classes.tile0;
                break;
            case 1: 
                return props.isMobile ? classes.tile1Mobile : classes.tile1;
                break;
            case 2: 
                return props.isMobile ? classes.tile2Mobile : classes.tile2;
                break;
            default: 
                return classes.tile1
        }
    }

    return (
        <div className={classes.tiles}>
            {props.tiles.map((stat, index) => {
                return (
                    <div className={getClass(index)}>
                        <div className={classes.tileTitle}>
                            {stat.title}
                        </div>
                        <div className={props.isMobile ? classes.tileValueMobile : classes.tileValue}>
                            {stat.value}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const useStyles = createUseStyles(
    {
        tiles: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          },
          tileTitle: {
            color: '#0f1729',
            fontWeight: '400',
          },
          tileValueMobile: {
            fontSize: '20px',
            fontWeight: '900',
          },
          tileValue: {
            fontWeight: '900',
            textAlign: 'center',
            fontSize: '30px'
          },
          tile0Mobile: {
            backgroundColor: '#3ABFF8',
            borderRadius: '5px',
            padding: '7px',
          },
          tile1Mobile: {
            backgroundColor: '#F471B5',
            borderRadius: '5px',
            padding: '7px',
            minWidth: '65px',
          },
          tile2Mobile: {
            backgroundColor: '#828DF8',
            borderRadius: '5px',
            padding: '7px',
            minWidth: '65px',
          },
          tile0: {
            backgroundColor: '#3ABFF8',
            padding: '15px',
            borderRadius: '5px',
            width: '68px',
          },
          tile1: {
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: '#F471B5',
            width: '68px'
          },
          tile2: {
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: '#828DF8',
            width: '68px'
          },
    },
    { name: 'PokemonStatTiles'}
)