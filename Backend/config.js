
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import passport from 'passport';
import session from 'express-session';



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));



app.use(cors({
    origin: ['http://nguyenphuocvinh.me', 'http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
}));




export default app;
