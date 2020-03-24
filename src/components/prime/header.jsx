import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




function ellipseAddress(address) {
    let width = 6;
    let newAddress = `${address.slice(0, width)}...${address.slice(-width)}`;
    return newAddress;
}


function Header(props) {
    const classes = props.classes;
    let chain;
    let address = ellipseAddress(props.address);
    switch(props.chainId) {
        case 4: 
            chain = 'Ethereum Rinkeby'
            break;
        case 1:
            chain = 'Ethereum Mainnet'
            break;
        default:
            chain = '...'
            break;
    };

    return (
        <div className={classes.chainHeader}>
            <Typography variant={'h1'} className={classes.chainHeaderTypography1}>
                PRIMITIVE
            </Typography>

            <Typography variant={'h1'} className={classes.chainHeaderTypography2}>
               ! This project is in Alpha. Use at your own risk. !
            </Typography>
            <Typography varient={'h3'} className={classes.chainHeaderTypography3}>
                {(props.connected)
                    ?   
                        <Button 
                            className={classes.connectButton}
                            onClick={() => props.resetApp()}
                        >
                            <span style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

                            
                                <span style={{fontSize: '1vw'}}>{(props.account) ? ellipseAddress(props.account) : 'Connect'} </span>
                            </span>
                        </Button>
                        :   <Button 
                                className={classes.connectButton}
                                onClick={() => props.onConnect()}
                            >
                            
                                    {(props.account) ? ellipseAddress(props.account) : 'Connect'}
                            </Button>
                
                
                }
                
                <Typography style={{fontSize: '0.5vw'}}variant="caption" display="block" gutterBottom>
                    Connected to {chain}
                </Typography>
            </Typography>
            
        </div>
    );
};

export default Header;