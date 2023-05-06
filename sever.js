const http = require('http').createServer(app);
const mongoose = require('mongoose');
const client = mongoose
  .connect(
    'mongodb+srv://vcro12123:<password>@cluster0.6po88go.mongodb.net/meetups'
  )
  .then((res) => console.log(res, 'res'))
  .catch((err) => console.log(err, 'err'));
