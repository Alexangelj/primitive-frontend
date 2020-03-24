import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { colors } from "../../theme/theme";
import loading from './830.svg';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Link from '@material-ui/core/Link';
import Page from './page';
import DFCP from './dfcplogo.svg'
import Box from '@material-ui/core/Box';
import DetailsIcon from '@material-ui/icons/Details';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';






const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
        },
        backgroundColor: colors.primary,
        height: '100%',
        minHeight: '100vh'
    },
    card: {
        height: '25vh',
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: '0px',
        transition: 'background-color 0.4s linear',
        /* margin: '16px', */
        marginBottom: '32px',
        [theme.breakpoints.up('sm')]: {
            height: '70vh',
            minWidth: '40vh',
            minHeight: '50vh',
        },
        borderRadius: '8px',

    },
    prime: {
        backgroundColor: colors.primary,
        '&:hover': {
            backgroundColor: colors.primaryButtonTransparent,
            '& .title': {
                color: colors.primary
            },
            '& .icon': {
                color: colors.primary
            },
        },
        '& .title': {
            color: colors.background
        },
        '& .icon': {
            color: colors.background
        }
    },
    prompt: {
        flex: '1',
        height: '10vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 0,
        transition: 'background-color 0.2s linear',
        [theme.breakpoints.up('sm')]: {
            height: '5vh',
            minWidth: '20%',
            minHeight: '5vh',
        }
    },
    title: {
        padding: '24px',
        width: '100%',
        paddingBottom: '0px',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '24px'
        },
        fontWeight: '600',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: ['Roboto Mono', 'sans-serif'].join(","),
        textAlign: 'center',
    },
    icon: {
        fontSize: '60px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '100px'
        }
    },
    brand: {
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5vh',
        borderRadius: '0px',
        color: colors.background,
        [theme.breakpoints.up('sm')]: {
            height: '5vh',
            minWidth: '20%',
            minHeight: '5vh',
        },
        fontWeight: '600',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: ['Roboto Mono', 'sans-serif'].join(","),
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        borderRadius: '0px',
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            minWidth: '20%',
            minHeight: '50vh',
        }
    },
    cardDisabled: {
        height: '25vh',
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '0px',
        transition: 'background-color 0.2s linear',
        /* margin: '16px', */
        marginBottom: '32px',
        [theme.breakpoints.up('sm')]: {
            height: '70vh',
            minWidth: '40vh',
            minHeight: '50vh',
        },
        borderRadius: '8px',

    },

    primeDisabled: {
        backgroundColor: colors.disabledGrey,
        '& .title': {
            color: colors.grey
        },
        '& .icon': {
            color: colors.grey
        }
    },
});

class Home extends Component {
    constructor (props) {
        super()
        this.state = {
            loading: true,
            done: false,
        }
    }
    
    componentDidMount = async () => {
        
        setTimeout(() => {
            this.setState({
              loading: false
            })
        }, 500)
        setTimeout(() => {
            this.setState({
              done: true
            })
        }, 1000)
    }

    render () {
        const { classes, t } = this.props;
        return (
            
                <Box className={classes.root}>
                    
                    <Typography variant={'h1'} className={ `${classes.brand} ${classes.title} title`}>
                        Select a product
                    </Typography>
                    <Box style={{display: 'flex', flexDirection: 'row',}}>
                    <Box style={{display: 'flex', flexDirection: 'column',}}>
                        <Link 
                            href='/prime'
                            underline='none'
                            className={`${classes.card}`}
                        >
                        <Card className={`${classes.card} ${classes.prime}`} href='/prime'>
                        
                        
                            <DetailsIcon className={ `${classes.icon} icon` }/>
                            <Typography variant={'h1'} className={ `${classes.title} title`}>Prime</Typography>
                            <Typography variant={'h2'} className={ `${classes.title} title`}>ERC-721 Option</Typography>
                            
                        </Card>
                        </Link>
                    </Box>
                    <Box style={{display: 'flex', flexDirection: 'column', marginLeft: '24px',}}>
                        <Link 
                            
                            underline='none'
                            className={`${classes.cardDisabled}`}
                            disabled
                        >
                        <Card variant={'disabled'} className={`${classes.cardDisabled} ${classes.primeDisabled}`} href='/prime'>
                        
                        
                            <AllInclusiveIcon className={ `${classes.icon} icon` }/>
                            <Typography variant={'h1'} className={ `${classes.title} title`}>{'...'}</Typography>
                            <Typography variant={'h2'} className={ `${classes.title} title`}>To be announced...</Typography>
                            
                        </Card>
                        </Link>
                    </Box>
                    </Box>
                                    
                                
                </Box>
            
        );
    };
    
    navigate = (screen) => {
        this.props.history.push(screen)
    }
}

export default (withRouter(withStyles(styles)(Home)));
