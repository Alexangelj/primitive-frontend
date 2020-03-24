const INITIAL_OPTIONS = {
    activeNetworkId: 4,
    activeNetworkName: 'Rinkeby',
    fetching: false,
    address: "",
    account: "",
    web3: null,
    provider: null,
    connected: false,
    chainId: null,
    networkId: null,
    result: null,
    loadingChain: true,
    loadingPositions: true,
    pendingTx: false,
    onOptionsChain: false,
    chartSymbol: 'BITFINEX:ETHUSD',
    callColumn: {
        'pair': null,
        'expiration': null,
        'options': [],
        'matches': {},
        'orders': {},
    },
    putColumn: {
        'pair': null,
        'expiration': null,
        'options': [],
        'matches': {},
        'orders': {},
    },
    optionRows: {
        ['call']: [],
        ['put']: [],
    },
    optionSelection: {
        'type': null,
        'chain': null,
        'expiration': null,
        'properties': {},
        'orders': {},
        'cAsset': '',
        'sAsset': '',
        'tokenIds': [],
    },
    callMatches: [],
    putMatches: [],

    optionV2: {
        '0x1bae37c4': { // TETH/DAI/1600473585
            'call': [
                {
                    index: 0,
                    bid: '-',
                    ask: '10',
                    qty: '5',
                    strike: '100',
                    strikeUnits: 'DAI',
                    collateral: '1',
                    collateralUnits: 'tETH',
                    expiration: '1600473585',
                },
                {
                    index: 1,
                    bid: '-',
                    ask: '5',
                    qty: '5',
                    strike: '150',
                    strikeUnits: 'DAI',
                    collateral: '1',
                    collateralUnits: 'tETH',
                    expiration: '1600473585',
                },
                {
                    index: 2,
                    bid: '-',
                    ask: '3',
                    qty: '5',
                    strike: '200',
                    strikeUnits: 'DAI',
                    collateral: '1',
                    collateralUnits: 'tETH',
                    expiration: '1600473585',
                },
            ],
            'put': [
                {
                    index: 0,
                    bid: '-',
                    ask: '10',
                    qty: '5',
                    strike: '1',
                    strikeUnits: 'tETH',
                    collateral: '100',
                    collateralUnits: 'DAI',
                    expiration: '1600473585',
                },
                {
                    index: 1,
                    bid: '-',
                    ask: '5',
                    qty: '5',
                    strike: '1',
                    strikeUnits: 'tETH',
                    collateral: '150',
                    collateralUnits: 'DAI',
                    expiration: '1600473585',
                },
                {
                    index: 2,
                    bid: '-',
                    ask: '3',
                    qty: '5',
                    strike: '1',
                    strikeUnits: 'tETH',
                    collateral: '200',
                    collateralUnits: 'DAI',
                    expiration: '1600473585',
                },
            ],
        }
    },

    optionGlossary: {
        'TETHDAI' : {
            '1600473585' : 1, /* CORRESPONDS TO NONCE OF OPTION FROM OPTIONS.SOL, NONCE 1 IS THE FIRST DEPLOYED OPTION */
            'chartSymbol': 'COINBASE:ETHDAI'
        },
    },

    deployedOptions: {
        1: {

        }
    },

    activeChains: [1],

    primeTokens: {

    },

    ownerOf: {

    },

    assets: {
        'assetIds' : ['asset-dai', 'asset-tUSD', 'asset-tETH',],
        'asset-dai': {
                        id: 'asset-dai', 
                        content: 'DAI', 
                        type: 'asset', 
                        payload: 'DAI',
                    },
        'asset-tUSD': {
                        id: 'asset-tUSD', 
                        content: 'tUSD', 
                        type: 'asset', 
                        payload: 'tUSD',
                    },
        'asset-tETH': {
                        id: 'asset-tETH', 
                        content: 'tETH', 
                        type: 'asset', 
                        payload: 'tETH',
                    },
    },
    expirations: {
        'expirationIds': ['expiration-may', 'expiration-june', 'expiration-september', 'expiration-december',],
        'expiration-may': {
            id: 'expiration-may', 
            content: 'May 15, 2020, 11:59pm UTC', 
            type: 'expiration', 
            payload: '1589587185',
        },
        'expiration-june': {
            id: 'expiration-june', 
            content: 'June 19, 2020, 11:59pm UTC', 
            type: 'expiration', 
            payload: '1592611185',
        },
        'expiration-september': {
            id: 'expiration-september', 
            content: 'September 18, 2020, 11:59pm UTC', 
            type: 'expiration', 
            payload: '1600473585',
        },
        'expiration-december': {
            id: 'expiration-december', 
            content: 'December 18, 2020, 11:59pm UTC', 
            type: 'expiration', 
            payload: '1608335985',
        },
    },
};

export default INITIAL_OPTIONS;
