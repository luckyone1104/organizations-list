const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.use('/static', express.static(path.resolve(__dirname + '/public/static')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
})

app.listen(port, () => console.log('Server is running on port: ' + port));