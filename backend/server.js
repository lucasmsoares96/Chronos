const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer")
// const XLSX = require("xlsx")

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const XLSX = require('xlsx');

var storage = multer.memoryStorage();
var upload = multer({ //multer settings
  storage: storage
});

function validate(req, res, next) {
  if (!req.file) {
    return res.send({
      errors: {
        message: 'file cant be empty'
      }
    });
  }
  next();
}

app.post('/upload', upload.single('file'), validate, function (req, res) {
  const fileLocation = req.file.buffer;
  var workbook = XLSX.read(fileLocation);
  var sheet_name_list = workbook.SheetNames;
  const fields = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).filter((e) => {
    if (Object.keys(e).length == 11) {
      return e
    }
  })
  fields.forEach((e) => {
    console.log(e[Object.keys(e)[0]])
    console.log(e[Object.keys(e)[1]])
  })
  console.log(fields.length)

  return res.json({
    json: XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
  });
});

const typeResorces = [{
  "idTipoDeRecursos": 1,
  "descricao": "adsdasda",
  "nome": "Sala",
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123"
},
{
  "idTipoDeRecursos": 2,
  "descricao": "asddasd",
  "nome": "Laboratorio",
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123"
},
{
  "idTipoDeRecursos": 3,
  "descricao": "adsasdasd",
  "nome": "Ginasio",
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123"
},
{
  "idTipoDeRecursos": 4,
  "descricao": "dasdas",
  "nome": "Auditorio",
  "idProfessor": 2,
  "email": "lucas@",
  "nomeP": "321"
},
{
  "idTipoDeRecursos": 5,
  "descricao": "asddasasd",
  "nome": "Automoveis",
  "idProfessor": 2,
  "email": "lucas@",
  "nomeP": "321"
},
{
  "idTipoDeRecursos": 6,
  "descricao": "asdasdasjdas",
  "nome": "Restaurantes",
  "idProfessor": 4,
  "email": "martins@",
  "nomeP": "sudhuasda"
},
{
  "idTipoDeRecursos": 7,
  "descricao": null,
  "nome": "Galpão",
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123"
},
{
  "idTipoDeRecursos": 8,
  "descricao": null,
  "nome": "fdhgfhhfghdfg",
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123"
},
{
  "idTipoDeRecursos": 9,
  "descricao": null,
  "nome": "Bla Bla",
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123"
},
{
  "idTipoDeRecursos": 10,
  "descricao": null,
  "nome": "fucka",
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123"
}
]

const schedule = [{
  numero: 303,
  idhorario: 1,
  "07:00-07:50": 0,
  "07:50-08:40": 0,
  "08:55-09:45": 1,
  "09:45-10:35": 0,
  "10:50-11:40": 0,
  "11:40-12:30": 0,
  "12:30-13:50": 0,
  "13:50-14:40": 0,
  "14:40-15:30": 1,
  "15:50-16:40": 0,
  "16:40-17:30": 0,
  "17:30-19:00": 0,
  "19:00-19:50": 0,
  "19:50-20:40": 0,
  "20:55-21:45": 0,
  "21:45-22:35": 0
},
{
  numero: 304,
  idhorario: 2,
  "07:00-07:50": 0,
  "07:50-08:40": 0,
  "08:55-09:45": 1,
  "09:45-10:35": 0,
  "10:50-11:40": 1,
  "11:40-12:30": 0,
  "12:30-13:50": 0,
  "13:50-14:40": 0,
  "14:40-15:30": 1,
  "15:50-16:40": 0,
  "16:40-17:30": 0,
  "17:30-19:00": 0,
  "19:00-19:50": 0,
  "19:50-20:40": 0,
  "20:55-21:45": 0,
  "21:45-22:35": 0
},
{
  numero: 305,
  idhorario: 3,
  "07:00-07:50": 1,
  "07:50-08:40": 1,
  "08:55-09:45": 1,
  "09:45-10:35": 1,
  "10:50-11:40": 1,
  "11:40-12:30": 1,
  "12:30-13:50": 1,
  "13:50-14:40": 1,
  "14:40-15:30": 1,
  "15:50-16:40": 1,
  "16:40-17:30": 1,
  "17:30-19:00": 1,
  "19:00-19:50": 1,
  "19:50-20:40": 1,
  "20:55-21:45": 1,
  "21:45-22:35": 1
},
{
  numero: 306,
  idhorario: 4,
  "07:00-07:50": 2,
  "07:50-08:40": 2,
  "08:55-09:45": 1,
  "09:45-10:35": 2,
  "10:50-11:40": 2,
  "11:40-12:30": 2,
  "12:30-13:50": 2,
  "13:50-14:40": 2,
  "14:40-15:30": 1,
  "15:50-16:40": 2,
  "16:40-17:30": 2,
  "17:30-19:00": 2,
  "19:00-19:50": 2,
  "19:50-20:40": 2,
  "20:55-21:45": 2,
  "21:45-22:35": 2,
  _cellVariants: {}
}
];

const reservations = [{
  "email": "lucas@",
  "nomeP": "lucas@",
  "motivo": null,
  "horario": "10:50:00",
  "numero": "303",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "11:40:00",
  "numero": "303",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "12:30:00",
  "numero": "303",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "08:55:00",
  "numero": "305",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "09:45:00",
  "numero": "305",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "10:50:00",
  "numero": "305",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "11:40:00",
  "numero": "305",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "12:30:00",
  "numero": "305",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "08:55:00",
  "numero": "307",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "09:45:00",
  "numero": "307",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "10:50:00",
  "numero": "307",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "08:55:00",
  "numero": "311",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "08:55:00",
  "numero": "109",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "08:55:00",
  "numero": "123",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "07:00:00",
  "numero": "1234",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "07:50:00",
  "numero": "1234",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "08:55:00",
  "numero": "1234",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "09:45:00",
  "numero": "1234",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "10:50:00",
  "numero": "1234",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "11:40:00",
  "numero": "1234",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
},
{
  "email": "vitor@",
  "nomeP": "vitor@",
  "motivo": "",
  "horario": "12:30:00",
  "numero": "1234",
  "data": "2020-03-27T03:00:00.000Z",
  "nome": "Sala"
}
]

const analysis = [{
  "email": "123",
  "nomeP": "123",
  "horario": "07:00:00",
  "numero": 303,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Sala",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
},
{
  "email": "123",
  "nomeP": "123",
  "horario": "07:50:00",
  "numero": 303,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Sala",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
},
{
  "email": "123",
  "nomeP": "123",
  "horario": "07:00:00",
  "numero": 611,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Laboratorio",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
},
{
  "email": "123",
  "nomeP": "123",
  "horario": "07:50:00",
  "numero": 611,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Laboratorio",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
}
]

const history = [{
  "email": "123",
  "nomeP": "123",
  "horario": "07:00:00",
  "numero": 303,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Sala",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
},
{
  "email": "123",
  "nomeP": "123",
  "horario": "07:50:00",
  "numero": 303,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Sala",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
},
{
  "email": "123",
  "nomeP": "123",
  "horario": "07:00:00",
  "numero": 611,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Laboratorio",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
},
{
  "email": "123",
  "nomeP": "123",
  "horario": "07:50:00",
  "numero": 611,
  "data": "2020-02-16T03:00:00.000Z",
  "nome": "Laboratorio",
  "status": 0,
  "motivo": "asldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdfhlaksjdfhalksjfasldkjfhaslkdjfhlkasjdfhlaksjdfhlkasjdf",
}
]

const listResources = [{
  "idRecursos": 1,
  "numero": 303,
  "nome": "Sala",
  "capacidade": 40,
  "informacao": "asd",
  "idTipoDeRecursos": 1
},
{
  "idRecursos": 2,
  "numero": 305,
  "nome": "Sala",
  "capacidade": 40,
  "informacao": "asd",
  "idTipoDeRecursos": 1
},
{
  "idRecursos": 3,
  "numero": 307,
  "nome": "Sala",
  "capacidade": 40,
  "informacao": "asd",
  "idTipoDeRecursos": 1
},
{
  "idRecursos": 4,
  "numero": 311,
  "nome": "Sala",
  "capacidade": 40,
  "informacao": "asd",
  "idTipoDeRecursos": 1
},
{
  "idRecursos": 5,
  "numero": 314,
  "nome": "Sala",
  "capacidade": 40,
  "informacao": "asd",
  "idTipoDeRecursos": 1
},
{
  "idRecursos": 6,
  "numero": 609,
  "nome": "Laboratorio",
  "capacidade": 20,
  "informacao": "dsa",
  "idTipoDeRecursos": 2
},
{
  "idRecursos": 7,
  "numero": 611,
  "nome": "Laboratorio",
  "capacidade": 20,
  "informacao": "dsa",
  "idTipoDeRecursos": 2
},
{
  "idRecursos": 8,
  "numero": 606,
  "nome": "Laboratorio",
  "capacidade": 20,
  "informacao": "dsa",
  "idTipoDeRecursos": 2
},
{
  "idRecursos": 9,
  "numero": 607,
  "nome": "Laboratorio",
  "capacidade": 20,
  "informacao": "dsa",
  "idTipoDeRecursos": 2
},
{
  "idRecursos": 10,
  "numero": 610,
  "nome": "Laboratorio",
  "capacidade": 20,
  "informacao": "dsa",
  "idTipoDeRecursos": 2
},
{
  "idRecursos": 11,
  "numero": 109,
  "nome": "Sala",
  "capacidade": null,
  "informacao": null,
  "idTipoDeRecursos": 1
}
]

const listTeacher = [{
  "idProfessor": 1,
  "email": "vitor@",
  "nomeP": "123",
  "cpf": "11111111122",
  "areaDoConhecimento": "123",
  "admGeral": 1,
  "admRecursos": 1
},
{
  "idProfessor": 2,
  "email": "lucas@",
  "nomeP": "321",
  "cpf": "11111111123",
  "areaDoConhecimento": "321",
  "admGeral": 0,
  "admRecursos": 1
},
{
  "idProfessor": 4,
  "email": "martins@",
  "nomeP": "sudhuasda",
  "cpf": "22222222222",
  "areaDoConhecimento": "Matematica",
  "admGeral": 0,
  "admRecursos": 0
},
{
  "idProfessor": 5,
  "email": null,
  "nomeP": null,
  "cpf": "33333333333",
  "areaDoConhecimento": null,
  "admGeral": null,
  "admRecursos": null
}
]

app.get("/selectTabelaTipoDeRecursos", (req, resp) => {
  // console.log(req.body)
  console.log(req.query);
  resp.json(typeResorces);
});
app.get("/tipoderecursos", (req, resp) => {
  // console.log(req.body)
  console.log(req.query);
  resp.json(typeResorces);
});
app.get("/dataRecursos", (req, resp) => {
  // console.log(req.body)
  console.log(req.query);
  resp.json(schedule);
});
app.post("/data", (req, resp) => {
  console.log(req.body)
  // console.log(req.query);
  resp.json(schedule);
  resp.status(400).send("falta algo")
});
app.post("/selectProfessorHorario", (req, resp) => {
  console.log(req.body)
  // console.log(req.query);
  resp.json(reservations);
});
app.post("/historico", (req, resp) => {
  console.log(req.body)
  // console.log(req.query);
  resp.json(history);
});
app.post("/selectProfessorHorarioEspec", (req, resp) => {
  console.log(req.body)
  // console.log(req.query);
  resp.json(analysis);
});
app.get("/selectTabelaRecursos", (req, resp) => {
  // console.log(req.body)
  console.log(req.query);
  resp.json(listResources);
});
app.get("/selectTabelaProfessor", (req, resp) => {
  // console.log(req.body)
  console.log(req.query);
  resp.json(listTeacher);
});


app.post("/login", (req, resp) => {
  console.log(req.body)
  // console.log(req.query);
  resp.json({
    "auth": true,
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aXRvckAiLCJzZW5oYSI6IjEyMyIsImFyZWFEb0NvbmhlY2ltZW50byI6IjEyMyIsImNwZiI6IjExMTExMTExMTIyIiwiYWRtR2VyYWwiOjEsImFkbVJlY3Vyc29zIjoxLCJpYXQiOjE1ODM3OTkyNDEsImV4cCI6MTU4Mzc5OTU0MX0.4rwhsNvgCPxzBC6Gj4A8-xworrS5zmOMI3MjsMWYvueMyTwTiv0BHG0z5X6c99R_PPrlWnib3dWXMvubvTfDDDBifjxyE0EtSHSwPtFflIBThVZKYilRsHT88n8Xyxof_9Hk1EPyyS928AWchSGW--TGO4sdymw-IvD5fmtDz7E",
    "payload": {
      "id": 1,
      "nome": "vitor",
      "email": "vitor@",
      "senha": "123",
      "areaDoConhecimento": "123",
      "cpf": "11111111122",
      "admGeral": 1,
      "admRecursos": 1
    }

  });
  resp.send("ok");
});
app.post("/insertProfessorHorario", (req, resp) => {
  console.log(req.body)
  // console.log(req.query);
  resp.send("ok");
});
app.post("/updateAprovadoProfessorHorario", (req, resp) => {
  console.log(req.body)
  // console.log(req.query);
  resp.send("ok");
});

app.post("/insertRecursos", (req, resp) => {
  console.log(req.body.item)
  // console.log(req.query);
  resp.status(400).send('Informe o nome do recurso!');
});

app.listen(port);

console.log("porta : " + port)