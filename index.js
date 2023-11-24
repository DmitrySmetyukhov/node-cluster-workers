const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Request is accepted!')
})


app.listen(3000, () => {
    console.log('Server started on PORT 3000');
})