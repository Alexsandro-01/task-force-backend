const express = require('express');

const PORT = process.env.PORT || 3000;

const api = express();
api.use(express.json());

api.get('/users', (req, res) => {
  res.send('it\'s ok!');
});

api.listen(PORT, () => console.log(`Listen at port ${PORT}`));