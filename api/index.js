const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const businessRoutes = require('./routes/business.route.js');
const authRoutes = require('./routes/auth.route.js');
const postRoutes = require('./routes/post.route.js');
const usuageRoutes = require('./routes/usuage.route.js');
const cors = require('cors'); // Correct import statement
const cookieParser = require('cookie-parser');
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

app.use(cors({
  origin: "*"
}));
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
