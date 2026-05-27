import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import promptRoutes from './routes/promptRoutes';
import historyRoutes from './routes/historyRoutes';
import configRoutes from './routes/configRoutes';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Prompt Generator API is running on Aliyun FC' });
});

app.use('/api/auth', authRoutes);
app.use('/api/prompt', promptRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/config', configRoutes);

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports.handler = async (req: any, res: any, context: any) => {
  return new Promise((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
