const express = require('express')
const app = express()
const cors = require('cors');
const client = require('./middlewares/static-client');
const api = require('./middlewares/api-classify');
const bodyParser = require('body-parser');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;

app.use('/api', api);
app.use('/', client);

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})
