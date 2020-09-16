import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import admin from './routes/admin.js';
import projectType from './routes/projectTypes.js';
import projectStatus from './routes/projectStatus.js';
import tectStack from './routes/techStack.js';

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

app.use('/api', [admin, projectType, projectStatus, tectStack]);

const expressPort = process.env.PORT || 8080;
app.listen(expressPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Node server is running on port: ${expressPort}`);
});
