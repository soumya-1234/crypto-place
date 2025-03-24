import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a proper type for a price object
interface Price {
    id: string;
    value: number;
    currency: string;
}

// Define the PriceState with a proper type
export interface PriceState {
    prices: Price[];
}

const initialState: PriceState = {
    prices: [],
};

const priceSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        setPrices(state, action: PayloadAction<Price[]>) {
            state.prices = action.payload;
            localStorage.setItem('prices', JSON.stringify(action.payload));
        },
        loadPrices(state) {
            const savedPrices = localStorage.getItem('prices');
            if (savedPrices) {
                state.prices = JSON.parse(savedPrices) as Price[];
            }
        },
    },
});

export const { setPrices, loadPrices } = priceSlice.actions;
export default priceSlice.reducer;
