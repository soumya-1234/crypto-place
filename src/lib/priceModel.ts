import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
    market_cap_rank: Number,
    image: String,
    name: String,
    symbol: String,
    current_price: Number,
    price_change_percentage_24h: Number,
    market_cap: Number,
    last_updated: { type: Date, default: Date.now },
});

const PriceModel = mongoose.models.Price || mongoose.model('Price', priceSchema);

export default PriceModel;