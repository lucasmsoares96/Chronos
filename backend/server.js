const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const typeResorces = [
    { nome: "Salas de Aula", idTipoDeRecursos: "sala" },
    { nome: "Laboratórios", idTipoDeRecursos: "lab" },
    { nome: "Ginásio", idTipoDeRecursos: "gin" },
    { nome: "Veículo", idTipoDeRecursos: "vei" }
];

const schedule = [
    {
        numero: 303,
        idhorario: 1,
        "07:00-07:50": 0,
        "07:50-08:40": 0,
        "09:45-10:35": 0,
        "10:50-11:40": 0,
        "11:40-12:30": 0,
        "12:30-13:50": 0,
        "13:50-14:40": 0,
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
        "09:45-10:35": 0,
        "10:50-11:40": 0,
        "11:40-12:30": 0,
        "12:30-13:50": 0,
        "13:50-14:40": 0,
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
        "09:45-10:35": 1,
        "10:50-11:40": 1,
        "11:40-12:30": 1,
        "12:30-13:50": 1,
        "13:50-14:40": 1,
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
        "09:45-10:35": 2,
        "10:50-11:40": 2,
        "11:40-12:30": 2,
        "12:30-13:50": 2,
        "13:50-14:40": 2,
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

const reservations = [
    {
        "email": "123",
        "nomeP": "123",
        "horario": "07:00:00",
        "numero": 303,
        "data": "2020-02-16T03:00:00.000Z",
        "nome": "Sala",
        "status": 0
    },
    {
        "email": "123",
        "nomeP": "123",
        "horario": "07:50:00",
        "numero": 303,
        "data": "2020-02-16T03:00:00.000Z",
        "nome": "Sala",
        "status": 1
    },
    {
        "email": "123",
        "nomeP": "123",
        "horario": "07:00:00",
        "numero": 611,
        "data": "2020-02-16T03:00:00.000Z",
        "nome": "Laboratorio",
        "status": 2
    },
    {
        "email": "123",
        "nomeP": "123",
        "horario": "07:50:00",
        "numero": 611,
        "data": "2020-02-16T03:00:00.000Z",
        "nome": "Laboratorio",
        "status": 1
    }
]

const analysis = [
    {
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

const listResources = [
    {
    "tipo": "Sala de aula",
    "Salas": 303,
    },
    {
    "tipo": "Sala de aula",
    "Salas": 303,
    },
    {
    "tipo": "Sala de aula",
    "Salas": 303,
    },
    {
    "tipo": "Sala de aula",
    "Salas": 303,
    },
]

const listTeacher =[
    {
        "name": "Emerson",
        "email": "emersonsouza@cefetmg.br",
        "genAdmin": true,
        "recAdmin": true,
        "numero de reservas": 24,
    },
    {
        "name": "Emerson",
        "email": "emersonsouza@cefetmg.br",
        "genAdmin": true,
        "recAdmin": true,
        "numero de reservas": 24,
    },
    {
        "name": "Emerson",
        "email": "emersonsouza@cefetmg.br",
        "genAdmin": true,
        "recAdmin": true,
        "numero de reservas": 24,
    },
    {
        "name": "Emerson",
        "email": "emersonsouza@cefetmg.br",
        "genAdmin": true,
        "recAdmin": true,
        "numero de reservas": 24,
    },
]

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
app.get("/selectProfessorHorario", (req, resp) => {
    // console.log(req.body)
    console.log(req.query);
    resp.json(reservations);
});
app.get("/analysis", (req, resp) => {
    // console.log(req.body)
    console.log(req.query);
    resp.json(analysis);
});
app.get("/getResources", (req, resp) => {
    // console.log(req.body)
    console.log(req.query);
    resp.json(listResources);
});
app.get("/getTeacher", (req, resp) => {
    // console.log(req.body)
    console.log(req.query);
    resp.json(listTeacher);
});


app.post("/data", (req, resp) => {
    console.log(req.body)
    // console.log(req.query);
    resp.send("ok");
});
app.post("/professorhorario", (req, resp) => {
    console.log(req.body)
    // console.log(req.query);
    resp.send("ok");
});

app.listen(3000);
