import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface CoinContextProps {
    // Define any properties that the context might have
    allCoin: [{
        market_cap_rank: number,
        image: string,
        name: string,
        symbol: string,
        current_price: number,
        price_change_percentage_24h: number,
        market_cap: number,
      }]
    currency: { name: string, symbol: string };
   setCurrency: (currency: { name: string, symbol: string }) => void;
}

const defaultContextValue: CoinContextProps = {
    // Provide default values for the context properties
    allCoin: [{market_cap_rank: 1,
        image: "Bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        current_price: 70187,
        price_change_percentage_24h: 2126.88,
        market_cap: 3.12}],
    currency: { name: "usd", symbol: "$" },
    setCurrency (){}

};

export const CoinContext = createContext<CoinContextProps>(defaultContextValue);

interface CoinContextProviderProps {
    children: ReactNode;
}

const CoinContextProvider: React.FC<CoinContextProviderProps> = (props) => {
    const [allCoin,setAllCoin]=useState([]);
    const [currency,setCurrency]= useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async ()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ntseo14eqy7KaB7R1RSm8mJC'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchAllCoin()
    },[currency])
    const contextValue = {
        allCoin,currency,setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
}

export default CoinContextProvider;
