import React, { Component, PureComponent } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/theme';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinkM from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

import Web3 from 'web3';
import HorizontalNonLinearStepper from './stepper';
import Board from './board';
import Column from './column';
import OrderForm from './orderForm';
import NavButton from './navButton';
import Footer from './footer';

import INITIAL_CONTEXT from './constants';
import TOKENS_CONTEXT from './tokenAddresses';
import PrimeContract from '../../artifacts/Prime.json';

import MintForm from './mintForm';
import INITIAL_OPTIONS from './intialOptions';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.background,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
        },
    },
    chainContainer: {
        display: 'flex',
        minWidth: '30%',
        minHeigth: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
        },
        margin: '16px',
        backgroundColor: colors.banner,
    },
    chainHeader: {

    },
    chainBody: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        margin: '16px',
    },
    chainButton: {
        backgroundColor: colors.secondary,
        color: colors.banner,
        borderRadius: '4px',
        margin: '16px',
        '&:hover': {
            backgroundColor: colors.success,
        },
    },
    chainFooter: {

    },
});

class PrimeV2 extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_OPTIONS;
        this.getWeb3 = this.getWeb3.bind(this);
        this.getAccount = this.getAccount.bind(this);
        this.getNetwork = this.getNetwork.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.checkValid = this.checkValid.bind(this);
        this.selectAmounts = this.selectAmounts.bind(this);
        this.handleSelectAmounts = this.handleSelectAmounts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createPrime = this.createPrime.bind(this);
    }

    componentDidMount = async () => {
        const web3 = await this.getWeb3();
        this.setState({
            web3: web3,
        })
        let account = await this.getAccount();
        this.setState({
            account: account,
            step: 0,
        });
        console.log('WEB3: ', this.state.web3)
    };

    /* WEB3 FUNCTIONS */
    getWeb3 = () =>
        new Promise((resolve, reject) => {
          // Wait for loading completion to avoid race conditions with web3 injection timing.
            window.addEventListener("load", async () => {
                // Modern dapp browsers...
                if (window.ethereum) {
                    const web3 = new Web3(window.ethereum);
                    try {
                        // Request account access if needed
                        await window.ethereum.enable();
                        // Acccounts now exposed
                        resolve(web3);
                    }   catch (error) {
                        reject(error);
                    }
                }
                // Legacy dapp browsers...
                else if (window.web3) {
                    // Use Mist/MetaMask's provider.
                    const web3 = window.web3;
                    console.log("Injected web3 detected.");
                    resolve(web3);
                }
                // Fallback to localhost; use dev console port by default...
                else {
                    const provider = new Web3.providers.HttpProvider(
                      "http://127.0.0.1:7545"
                    );
                    const web3 = new Web3(provider);
                    console.log("No web3 instance injected, using Local web3.");
                    resolve(web3);
                }
            });
    });

    getAccount = async () => {
        console.time('getAccount');
        const web3 = this.state.web3;
        if(web3) {
            let accounts = await web3.eth.getAccounts();
            let account = accounts[0];
            /* console.trace({account}) */
            this.setState({
                account: account,
            })
            return(account);
        }
        console.timeEnd('getAccount');
    };

    getNetwork = async () => {
        console.time('getNetwork');
        const web3 = this.state.web3;
        if(web3) {
            let networkId = await web3.eth.net.getId();
            /* console.trace({networkId}) */
            console.timeEnd('getTokenAddress');
            return(networkId);
        }
        console.timeEnd('getNetwork');
    };

    createPrime = async () => {

    };

    /* COMPONENT FUNCTIONS */

    handleSelect = (value, name) => {
        console.log('select value', value, name);
        this.setState({
            selection: {
                ...this.state.selection,
                [name]: value,
            }
        }, () => this.checkValid());

        
    };

    checkValid = () => {
        let selection = (this.state.selection) ? this.state.selection : '';
        let valid = false;
        if(
            typeof selection['collateral'] !== 'undefined' 
            && typeof selection['payment'] !== 'undefined' 
            && typeof selection['expiration'] !== 'undefined' 
        ) {
            console.log(
                'VALID', 
                selection['collateral'],
                selection['payment'],
                selection['expiration']
            );
            valid = true;
            
        } else {
            valid = false;
        }

        this.setState({
            valid: valid,
        });
        return valid;
    };

    selectAmounts = () => {
        if(this.state.valid) {
            this.setState({
                selectAmounts: !this.state.selectAmounts
            });
        }
        
    };

    handleSubmit = () => {

    };

    handleSelectAmounts = async (columnId, amount) => {
        const web3 = this.state.web3;
        let collateralAmount = (this.state.collateralAmount) ? this.state.collateralAmount : 0;
        let paymentAmount = (this.state.paymentAmount) ? this.state.paymentAmount : 0;
        let amtWei;
        console.log({amount})
        let rawAmt = (amount) ? (amount).toString() : '0';
        switch(columnId) {
            case 'collateralBoard':
                amtWei = (await web3.utils.toWei(rawAmt)).toString();
                collateralAmount = amtWei;
                break;
            case 'paymentBoard':
                amtWei = (await web3.utils.toWei(rawAmt)).toString();
                paymentAmount = amtWei;
                break;  
        };

        this.setState({
            collateralAmount: collateralAmount,
            paymentAmount: paymentAmount,
        }, () => {this.isValid(); this.getCurrentPrimeOutput();})
        console.log('HANDLE ASSET AMOUNT', {collateralAmount, paymentAmount})
    };


    render () {
        const { classes } = this.props;
        
        let collateral = (this.state.selection) ? (this.state.selection['collateral']) ? this.state.selection['collateral'] : '' : '';
        let payment = (this.state.selection) ? (this.state.selection['payment']) ? this.state.selection['payment'] : '' : '';
        let expiration = (this.state.selection) ? (this.state.selection['expiration']) ? this.state.selection['expiration'] : '' : '';
        return(
            <>
            <div className={classes.root} key='root'>

                {/* CONTAINER FOR CHAIN */}
                <Card className={classes.chainContainer}>
                    
                    {/* CHAIN HEADER */}
                    <CardHeader 
                        variant={'h1'} 
                        title={'Craft an Option'}>
                    </CardHeader>
                    

                    {/* CHAIN BODY */}
                    {(this.state.selectAmounts) 
                        ?   <Slide direction="left" in={this.state.selectAmounts}>
                                <OrderForm
                                    collateralAmount={collateral}
                                    paymentAmount={payment}
                                    isValid={this.checkValid}
                                    handleSelectAmounts={this.handleSelectAmounts}
                                />
                            </Slide>
                            :   <Fade in={!this.state.selectAmounts}>
                                    <MintForm
                                        classes={classes}
                                        assets={this.state.assets}
                                        expirations={this.state.expirations}
                                        handleSelect={this.handleSelect}
                                        collateral={collateral}
                                        payment={payment}
                                        expiration={expiration}
                                    />
                                </Fade>
                                
                    }
                    
                    <Button 
                        className={classes.chainButton}
                        onClick={() => this.selectAmounts()}
                    >
                        {(this.state.selectAmounts) ? 'Back' : 'Continue'}
                    </Button>
                    {/* CHAIN FOOTER */}
                    

                </Card>
                <Footer 
                        title={
                            <div>
                                <LinkM href="https://github.com/Alexangelj/DFCP" underline='none'>
                                    <GitHubIcon />
                                </LinkM>
                                <LinkM href="https://github.com/Alexangelj/DFCP" underline='none'>
                                    <TwitterIcon />
                                </LinkM>
                            </div>
                        }
                    />
            </div>    
            </>
        );
    };

};

export default withStyles(styles)(PrimeV2);