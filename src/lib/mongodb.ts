import { NextApiRequest, NextApiResponse } from 'next';
import PriceModel from './priceModel';
import mongoose from 'mongoose';



const uri = "mongodb+srv://soumya:lrHz9zVB14xDfWNV@ecommercedb.vqoivbz.mongodb.net/?retryWrites=true&w=majority&appName=ecommercedb";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        if (!uri) {
            return res.status(500).json({ error: 'MongoDB URI is not defined.' });
        }

        try {
            await mongoose.connect(uri);
            const prices = await PriceModel.find().sort({ last_updated: -1 }).limit(20);
            res.json(prices);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            res.status(500).json({ error: 'Failed to connect to MongoDB' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
