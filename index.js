/* eslint "no-console": "off" */

const express = require('express');
const cors = require('cors');
const routes = require('./api');


const app = express();

// Constants.
const PORT = 1337;

// Setup.
const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};
app.use('/api', cors(corsOptions), routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
