const express = require('express');
const fs = require('fs');
const path = require('path')
require('dotenv').config()

// CONTROLLERS
const getServiceResponse = require('./controllers/getServiceResponse');

const app = express();

const PORT = 8080;

app.get('/get-service/:id', (req, res) => {
  
  const params = req.params;

  const { id } = params;

  const configPath = path.join(__dirname, 'config.json');

  fs.readFile(configPath, {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      res.status(404);
      res.json({
        message: 'Config file reading is failed',
        error: err
      })
      return;
    }

    return getServiceResponse(JSON.parse(data), id, res);
  })
});

app.listen(PORT, () => {
  `Server is started on port ${PORT}`
})