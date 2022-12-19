import { createUseStyles, ThemeProvider, useTheme } from 'react-jss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Carousel } from '@trendyol-js/react-carousel';

type Item = {
    title: string,
    badges: Array<string>
}

interface Props {
    id: string,
    info: Array<Item>,
    fromModal: boolean
}

interface CustomTheme {
    modalBorder: string,
    border: string,
    modalMarginBottom: string,
    marginBottom: string
}

const theme: CustomTheme = {
    modalBorder: '1px solid #3ABFF8',
    border: 'none',
    modalMarginBottom: '10px',
    marginBottom: '0'
}


export const PokemonInfoBadges = ({...props}: Props) => {
    const theme = useTheme<CustomTheme>();
    const classes = useStyles({...props, theme});
    const next = (index: number) => {
        let btnList = document.getElementsByClassName('PokemonModal-marquee-0-2-371')[index];
        let width: number | undefined = btnList?.clientWidth;
        if (width !== undefined) {
            let far = width / 2;
            let position = btnList!.scrollLeft + far
            btnList.animate({
                scrollLeft: position
            }, 1000)  
        }
    };

    const hasOverflow = (item: Item) => {
        if (item.title === 'TYPES:') {
            return false 
        } else if (item.badges.length > 2) {
            return true
        }

        return false
    }

    return (
        <ThemeProvider theme={theme}>
            {props.info.map((item: Item) => {
                return (
                    <div key={`${props.id}-${item.title}`} className={classes.btnList}>
                        {item.title}
                        <div className={classes.marquee}>
                            {item.badges.map((badge, index) => {
                                return (
                                    <div key={`${index}-${badge}`} className={classes.badge}>
                                        {badge}
                                    </div> 
                                )
                            })}
                        </div> 
                        {hasOverflow(item) && 
                            <div onClick={() => next(1)} className={classes.nextBtn}>
                                <NavigateNextIcon/>
                            </div>
                        }
                        
                    </div>
                )
            })}
        </ThemeProvider>
    
    )
}

const useStyles = createUseStyles(
    {
        btnList: {
            backgroundColor: '#1D283A',
            display: 'flex',
            height: '48px',
            fontWeight: '600',
            borderRadius: '5px',
            color: '#B3CCF5',
            alignItems: 'center',
            padding: {
                top: 0,
                right: 16,
                bottom: 0,
                left: 16
            },
            border: ({
                fromModal,
            }: {
                theme: CustomTheme,
                fromModal: Props['fromModal']
            }) => (fromModal ? theme.modalBorder : theme.border),
            marginBottom: ({
                fromModal
            }: {
                theme: CustomTheme,
                fromModal: Props['fromModal']
            }) => (fromModal ? theme.modalMarginBottom : theme.marginBottom),
            position: 'relative'
        },
        marquee: {
            display: 'flex',
            overflowX: 'hidden !important',
            overflowY: 'hidden !important',
        },
        badge: {
            display: 'flex',
            padding: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 10
            },
            backgroundColor: '#828DF8',
            fontSize: '14px',
            textTransform: 'uppercase',
            borderRadius: '1.9rem',
            marginLeft: '5px',
        },
        nextBtn: {
            position: 'absolute',
            right: '0px',
            width: '20px',
            backgroundColor: '#3ABFF8',
            height: '48px',
            top: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1'
        },
    },
    { name: 'PokemonInfoBadges'}
)