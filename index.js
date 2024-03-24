import 'dotenv/config.js';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import feedbackRoute from './routes/feedbackRoutes.js';

import './services/passport.js';

import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/feedbacks', feedbackRoute);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
} else {
  // const __dirname = path.resolve();
  // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

console.log(process.env.NODE_ENV);

//Listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

//Conected to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });
