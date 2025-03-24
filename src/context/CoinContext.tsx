import React, { createContext, ReactNode, useEffect, useState } from 'react';

// Define the Coin type
interface Coin {
    market_cap_rank: number;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
}

// Define the Context type
interface CoinContextProps {
    allCoin: Coin[];
    currency: { name: string; symbol: string };
    setCurrency: (currency: { name: string; symbol: string }) => void;
}

// Default context value
const defaultContextValue: CoinContextProps = {
    allCoin: [], // Default to empty array
    currency: { name: "usd", symbol: "$" },
    setCurrency: () => {} // Empty function as placeholder
};

// Create context
export const CoinContext = createContext<CoinContextProps>(defaultContextValue);

interface CoinContextProviderProps {
    children: ReactNode;
}

const CoinContextProvider: React.FC<CoinContextProviderProps> = ({ children }) => {
    const [allCoin, setAllCoin] = useState<Coin[]>([]);
    const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

    const fetchAllCoin = async () => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                {
                    method: 'GET',
                    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-ntseo14eqy7KaB7R1RSm8mJC' }
                }
            );

            const data: Coin[] = await response.json();
            setAllCoin(data);
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    return (
        <CoinContext.Provider value={{ allCoin, currency, setCurrency }}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
