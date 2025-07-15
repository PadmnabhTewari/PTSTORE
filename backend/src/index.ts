import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import cartRouter from './routes/cart';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 