import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';

const app = express();
const port = 3000;
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'booknotes',
  password: 'datka19sql',
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
