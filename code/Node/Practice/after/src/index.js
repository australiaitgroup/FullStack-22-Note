require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const v1Router = require('./routes');
const cors = require('./middleware/cors');
const notFoundError = require('./middleware/error/notFoundError');
const unknownError = require('./middleware/error/unknownError');

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors);
app.use(helmet());

app.use('/v1', v1Router);

app.use(notFoundError);
app.use(unknownError);

app.listen(PORT, () => {
  console.log(`server listerning at port ${PORT}`);
});
