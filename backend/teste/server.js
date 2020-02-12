const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

var myObj = [
    { name: 'Salas de Aula', item: 'sala' },
    { name: 'Laboratórios', item: 'lab' },
    { name: 'Ginásio', item: 'gin' },
    { name: 'Veículo', item: 'vei' },
    
];

app.get('/data', (req, resp) => {
    console.log(req.body)
    console.log(req.query)
    resp.json(myObj)
})

app.listen(3003)