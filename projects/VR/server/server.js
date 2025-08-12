import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import streamsRouter from './routes/streams.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use(session({
  name: 'f1tv.sid',
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 6
  }
}));

app.use('/api/auth', authRouter);
app.use('/api/streams', streamsRouter);

const webDir = path.resolve(__dirname, '../web');
app.use(express.static(webDir));
app.get('*', (_, res) => res.sendFile(path.join(webDir, 'index.html')));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
