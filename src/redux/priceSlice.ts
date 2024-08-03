import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PriceState {
    prices: { [key: string]: any }[];
}

const initialState: PriceState = {
    prices: [],
};

const priceSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        setPrices(state, action: PayloadAction<any[]>) {
            state.prices = action.payload;
            localStorage.setItem('prices', JSON.stringify(action.payload));
        },
        loadPrices(state) {
            const savedPrices = localStorage.getItem('prices');
            if (savedPrices) {
                state.prices = JSON.parse(savedPrices);
            }
        },
    },
});

export const { setPrices, loadPrices } = priceSlice.actions;
export default priceSlice.reducer;
