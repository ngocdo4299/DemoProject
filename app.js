import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import admin from './routes/admin.js';

dotenv.config({
  path: '.env',
});
const app = express();

mongoose
  .connect('mongodb://localhost/demoProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB Connected!'));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', [admin]);

const expressPort = process.env.PORT || 8080;
app.listen(expressPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Node server is running on port: ${expressPort}`);
});
