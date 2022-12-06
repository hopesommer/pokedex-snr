import { createUseStyles } from 'react-jss';

type Tile = {
    title: string,
    value: number
}

interface Props {
    tiles: Array<Tile>
}

export const PokemonStatTiles = ({tiles}: Props) => {
    const classes = useStyles();
    const getClass = (index: number) =>{
        switch(index) {
            case 0: 
                return classes.tile0;
                break;
            case 1: 
                return classes.tile1;
                break;
            case 2: 
                return classes.tile2;
                break;
            default: 
                return classes.tile1
        }
    }

    return (
        <div className={classes.tiles}>
            {tiles.map((stat, index) => {
                return (
                    <div className={getClass(index)}>
                        <div className={classes.tileTitle}>
                            {stat.title}
                        </div>
                        <div className={classes.tileValue}>
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
          tileValue: {
            fontWeight: '900',
            textAlign: 'center',
            fontSize: '30px'
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