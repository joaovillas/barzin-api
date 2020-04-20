import express, { Router } from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/healthcheck', (_, res) => {
  res.json({ 'status': 'working' });
});

app.listen(8080, () => {
  console.log(`server listen at port 8080`);
})
