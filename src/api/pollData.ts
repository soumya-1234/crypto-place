import axios from 'axios';
import cron from 'node-cron';
import PriceModel from '../lib/priceModel';

const symbols = [
    "usd","inr","eur"
  ];

const fetchData = async () => {
    const responses = await Promise.all(
        symbols.map(async (symbol) => {
            const options = {
                method: 'GET',
                headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ntseo14eqy7KaB7R1RSm8mJC'}
              };
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`,options);
            return { symbol, price: response.data[symbol].usd };
        })
    );
    return responses;
};

cron.schedule('*/5 * * * * *', async () => {
    const data = await fetchData();
    // Store data in MongoDB
    await PriceModel.insertMany(data);
});

export const pollData = async () => {
    const data = await fetchData();
    await PriceModel.insertMany(data);
};
