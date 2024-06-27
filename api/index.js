import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import businessRoutes from './routes/business.route.js'
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import usuageRoutes from './routes/usuage.route.js';
import cors from 'cors'; // Correct import statement

import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT;

const app = express();
app.use(cors()); // Applying CORS middleware

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.use('/api/user', userRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/usuage', usuageRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
