/* eslint "no-console": "off" */

const express = require('express');
const cors = require('cors');


const app = express();

// Constants.
const PORT = 1337;

// Setup.
const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};
app.use('/api', cors(corsOptions), require('./api'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
