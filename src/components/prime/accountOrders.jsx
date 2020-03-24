import React, { Component } from 'react';
import { colors } from '../../theme/theme';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';



const styles = theme => ({
    submitCard: {
        display: 'flex',
        margin: '16px',
        minWidth: '10%',
        minHeight: '10%',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
        },
        backgroundColor: colors.banner,
        color: colors.primary,
        borderRadius: '0px',
    },
    submitCardTypography: {
        /* margin: '16px', */
        marginLeft: '16px',
        marginRight: '16px',
        marginTop: '16px',
        marginBottom: '4px',
    },
    submitCardText: {
        /* margin: '12px', */
        marginLeft: '12px',
        marginRight: '12px',
        marginBottom: '12px',
        display: 'flex',
        flexDirection: 'row',
        
    },
    submitCardButton: {
        margin: '8px',
        color: colors.background,
        backgroundColor: state => state.isValid ? colors.success : colors.secondary,
        '&:hover': {
            backgroundColor: state => state.isValid ? colors.success : colors.success,
        },
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '16px',
        /* padding: '16px', */
        borderRadius: '4px',
    },

    containerTitle: {
        textAlign: 'center',
        margin: '8px',
        letterSpacing: '2px',
        fontSize: '18px',
    },

    rowContainer1: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        marginTop: '16px',

    },

    selectedRowH: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

    },

    selectedRow1: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'row',

    },

    rowItem1H: {
        width: '33%',
        /* textAlign: 'center', */
        fontWeight: '600',
        fontSize: '11px',
        textAlign: 'center',
    },

    rowItem2H: {
        width: '100%',
        fontWeight: '600',
        fontSpacing: '1px',
    },

    rowItem3H: {
        width: '33.33%',
        marginLeft: '4px',
        fontWeight: '600',
        fontSize: '9px',
    },

    rowItem1: {
        width: '33%',
        textAlign: 'center',
    },

    rowItemB: {
        width: '33%',
        fontSize: '9px',
    },

    rowItem2: {
        width: '33.33%',
        marginLeft: '4px',
        /* textAlign: 'center', */
        
    },

    rowContainer2: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderRadius: '4px',
        marginTop: '16px',
    },

    rowButtonL: {
        backgroundColor: colors.primaryButton,
        color: colors.primary,
        '&:hover' : {
            backgroundColor: colors.primaryButton,
            color: colors.primary,
            boxShadow: '0 0px 16px rgba(255, 255, 255, .4)',
        },
        fontWeight: '600',
        width: '50%',
        borderRadius: '4px',
        margin:'4px',
    },
    
    
    rowButtonS: {
        backgroundColor: colors.background,
        width: '50%',
        borderRadius: '4px',
        margin:'4px',
        color: colors.primary,
        fontWeight: '600',
    },

    rowButtonSubmit: {
        backgroundColor: colors.primaryButton,
        color: colors.primary,
        '&:hover' : {
            backgroundColor: colors.success,
            color: colors.lightBanner,
            boxShadow: '0 0px 16px rgba(255, 255, 255, .4)',
        },
        fontWeight: '600',
        width: '50%',
        borderRadius: '4px',
    },

    amountForm: {
        borderRadius: '4px',
        width: '100%',
        backgroundColor: colors.background,
    },

    rowContainer3: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderRadius: '4px',
        marginTop: '16px',
    },

    rowContainer4: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '4px',
        marginTop: '16px',
    },

    txTracker: {
        width: '50%',
        marginLeft: '16px',
        fontWeight: '600',
        lettingSpacing: '0px',
        fontSize: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class AccountOrders extends Component {
    constructor(props) {
        super(props);
    }


    render () {
        const { classes } = this.props;

        let accountOrders = this.props.accountOrders ? this.props.accountOrders : [];

        return (
            <>
                <Box className={classes.container}>

                    <Typography variant={'h1'} className={classes.containerTitle}>
                        Orders
                    </Typography>

                    <TableContainer component={Paper}>
                            <Table className={classes.primeTable} size='small'>

                                {/* HEAD */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center' variant={'h1'}>Order</TableCell>
                                        <TableCell align='center' variant={'h1'}>Price</TableCell>
                                        <TableCell align='center' variant={'h1'}>Filled</TableCell>
                                        <TableCell align='center' variant={'h1'}>Close</TableCell>
                                    </TableRow>
                                </TableHead>
                                
                                {/* BODY */}
                                <TableBody>
                                    {accountOrders.map(row => (
                                        <TableRow hover key={row.name}>
                                            <TableCell align='center' variant={'h1'}>{(row.isBuyOrder) ? 'Buy' : 'Sell'}</TableCell>
                                            <TableCell align='center' variant={'h1'}>{row.price}</TableCell>
                                            <TableCell align='center' variant={'h1'}>{(row.isFilled) ? 'Yes' : 'No'}</TableCell>
                                            <TableCell 
                                                align='center' 
                                                variant={'h1'} 
                                                
                                                onClick={() => this.props.handleCloseOrder(
                                                            row.isBuyOrder, 
                                                            row.isUnfilledBuyOrder, 
                                                            row.nonce
                                                        )
                                                    }
                                            >
                                                <CancelIcon style={{cursor: 'pointer'}}  />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                
                            </Table>
                        </TableContainer>
                    

                </Box>
            </>
        );
    };
};

export default withStyles(styles)(AccountOrders);