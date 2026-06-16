import express from 'express';
import cors from 'cors';
import exhibitionRoutes from './routes/exhibition.routes';
import exhibitRoutes from './routes/exhibit.routes';
import { seedDatabase } from './store';

const app = express();
const PORT = 4000; 

app.use(cors({ origin: '*' }));
app.use(express.json());

seedDatabase();

app.use('/api/exhibition', exhibitionRoutes);
app.use('/api/exhibit', exhibitRoutes);

app.listen(PORT,'0.0.0.0', () => {
  console.log(`[server]: Бэкенд запущен на http://localhost:${PORT}`);
});
