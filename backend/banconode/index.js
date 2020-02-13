//Requisitando Funções Importantes e Executando a API
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const port = 3000;
const cors = require('cors');
const objVazio = [[0]];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();
app.use('/', router);
app.listen(port);

//Require do Banco de Dados e suas querys

let sqlQUERY = require("./src/sqlQueryExec");
let select = require("./src/select");
let selectData = require("./src/selectData");
let selectDataRecursos = require("./src/selectData");
let selectHorario = require("./src/selectHorario");
let selectHorarioDataRecursos = require("./src/selectHorarioDataRecursos");
let selectProfessor = require("./src/selectProfessor");
let selectProfessorHorarioDataRecursos = require("./src/selectProfessorHorarioDataRecursos");
let selectRecursos = require("./src/selectRecursos");
let selectTipoRecursos = require("./src/selectTipoRecursos");

//VARIAVEIS
//variaveis do professor
let codigoProfessor = 1;
let nomeProfessor = 'Vitor';
let emailProfessor = 'algumemailaleatorio@gmail.com';
let senhaProfessor = 'abcdefghij';
let areaDoConhecimentoProfessor = 'Engenharia da computacao';
let responsavelProfessor = '0';
let objProfessor = [[emailProfessor],[nomeProfessor],[senhaProfessor],[areaDoConhecimentoProfessor],[responsavelProfessor],[codigoProfessor]];

//variaveis horario
let codigoHorario = 1;
let horarioInicio = '2019-09-18 12:43:30';
let horarioFinal = '2019-09-18 14:43:30';
let objHorario = [[horarioInicio],[horarioFinal]];

//variaveis de tipo de recursos
let codigoTipoRecursos = 1;
let descricaoTipoRecursos = 'Laboratorio para aulas praticas';
let nomeTipoRecursos = 'Laboratorio';
let quantidadeRecursosDesteTipo = 1;
let objtTipoRecursos = [[descricaoTipoRecursos],[nomeTipoRecursos],[quantidadeRecursosDesteTipo],[codigoTipoRecursos]];

//variaveis de recursos
let codigoRecurso = 1;
let numeroLocal = 303;
let capacidadeLocal = 40;
let informacaoLocal = "Proibido alimentos no local";
let idTipoRecursos = codigoTipoRecursos;
let idProfessor = codigoProfessor;
let objRecursos = [[numeroLocal],[capacidadeLocal],[informacaoLocal],[idTipoRecursos],[idProfessor],[codigoRecurso]];
    
//variaveis de Recursos e Horarios
let idRecursos = codigoRecurso;
let idHorario = codigoHorario;
let ocupacaoRecursosHorarios = "false"; 
let objRecursosHorarios = [[idRecursos], [idHorario],[ocupacaoRecursosHorarios]];

//variaveis de professor recursos e horarios
let idProfessorPRH = codigoProfessor;
let idRecursosRH = idRecursos;
let idHorarioRH = idHorario;
let statusPRH = 'ocupado';
let objProfessorRecursosHorarios = [[idProfessorPRH],[idRecursosRH],[idHorarioRH],[statusPRH]];



//Adicionar ao banco
router.post('/hor', function(req, res){
    let horInicio = req.body.horIn.substring(0,20);
    let horFinal = req.body.horFin.substring(0,20);
    let horList = [[horInicio,horFinal]];
    execSQLQuery('INSERT INTO mydb.horario (horarioInicio, horarioFim) VALUES (?) ',horList,res);
})
router.post('/prof', function(req, res){
    let nomeProf = req.body.nomeProf.substring(0,250);
    let emailProf = req.body.emailProf.substring(0,250);
    let senhaProf = req.body.senhaProf.substring(0,30);
    let adcProf = req.body.adcProf.substring(0,30);
    let resProf = req.body.resProf.substring(0,5);
    let profList = [[emailProf,nomeProf,senhaProf,adcProf,resProf]];
    execSQLQuery('INSERT INTO mydb.professor (email, nome, senha, areaDoConhecimento, responsavel) VALUES(?)', profList, res);
})
router.post('/trec', function(req, res){
    let descTipoRec = req.body.descTipoRec.substring(0,250);
    let nTipoRec = req.body.nTipoRec.substring(0,250);
    let qtdTipoRec = req.body.qtdTipoRec.substring(0,250);
    let tipoRecList = [[descTipoRec,nTipoRec,qtdTipoRec]];
    execSQLQuery('INSERT INTO mydb.tipoderecursos (descricao, nome, quantidade) VALUES (?)',tipoRecList, res);
})
router.post('/rec', function(req, res){
    let numLocal = req.body.numLocal.substring(0,250);
    let capacLocal = req.body.capacLocal.substring(0,250);
    let infLocal = req.body.infLocal.substring(0,250);
    let idTR = codigoTipoRecursos;
    let idP = codigoProfessor;
    let recList = [[numLocal,capacLocal,infLocal,idTR,idP]];
    execSQLQuery('INSERT INTO mydb.recursos (numero, capacidade, informacao, TipoDeRecursos_idTipoDeRecursos, Professor_idProfessor) VALUES(?)',recList, res);
})
router.post('/rechor', function(req, res){
    let idRec = codigoRecurso;
    let idHor = codigoHorario;
    let ocupRecHor = req.body.ocupRecHor.substring(0,5);
    let recHorList = [[idRec,idHor,ocupRecHor]];
    execSQLQuery('INSERT INTO mydb.recursos_has_horario (Recursos_idRecursos, Horario_idHorario, ocupacao) VALUES(?)',recHorList, res);
})
router.post('/profrechor', function(req, res){
    
    let idProfPRH = codigoProfessor;
    let idRecsRH = idRecursos;
    let idHorRH = idHorario;
    let stsPRH = req.body.stsPRH.substring(0,100); 
    let profRecHorList = [[idProfPRH],[idRecsRH],[idHorRH],[stsPRH]];
    execSQLQuery('INSERT INTO mydb.professor_has_recursos_has_horario (Professor_idProfessor, Recursos_has_Horario_Recursos_idRecursos, Recursos_has_Horario_Horario_idHorario, status) VALUES(?)',profRecHorList, res);
})


router.get('/data', (req, res) =>{
    select(objVazio,res);
})
router.get('/data2', (req, res) =>{
    selectData(objVazio,res);
})
router.get('/dataRecursos', (req, res) =>{
    selectDataRecursos(objVazio,res);
})
router.get('/horario', (req, res) =>{
    selectHorario(objVazio,res)
})
router.get('/horarioDataRecursos', (req, res) =>{
    selectHorarioDataRecursos(objVazio,res)
})
router.get('/professor', (req, res) =>{
    selectProfessor(objVazio,res);
})
router.get('/professorHorarioDataRecursos', (req, res) =>{
    selectProfessorHorarioDataRecursos(objVazio,res)
})
router.get('/recursos', (req, res) =>{
    selectRecursos(objVazio,res)
})
router.get('/tipoderecursos', (req, res) =>{
    selectTipoRecursos(objVazio,res)
})
router.get('/professorrecursoshorario', (req, res) =>{
    selectProfessorRecursosHorario(objVazio,res)
})




//Deletar Dados
router.delete('/delprofrechor', function(req, res){
    execSQLQuery('DELETE FROM mydb.professor_has_recursos_has_horario WHERE (Professor_idProfessor = '+ parseInt(req.params.idProfessor) +' and (Recursos_has_Horario_Recursos_idRecursos = ' + parseInt(req.params.idRecursos) + ' and Recursos_has_Horario_Horario_idHorario ='+ parseInt(req.params.idHorario), res);
})
router.delete('/delrechor', function(req, res){
    execSQLQuery('DELETE FROM mydb.recursos_has_horario WHERE Recursos_idRecursos = '+ parseInt(req.params.idRecursos) + ' and Horario_idHorario = ' + parseInt(req.params.idHorario), res);
})
router.delete('/delrec', function(req, res){
    execSQLQuery('DELETE FROM mydb.recursos WHERE idRecursos =' + parseInt(req.params.idRecursos) , res);
})
router.delete('/deltrec', function(req, res){
    execSQLQuery('DELETE FROM mydb.tipoderecursos WHERE idTipoDeRecursos ='+ parseInt(req.params.idTipoDeRecursos), res);
})
router.delete('/delprof', function(req, res){
    execSQLQuery('DELETE FROM mydb.professor WHERE idProfessor = ' + parseInt(req.params.idProfessor), res);
})
router.delete('/hor/:idHorario', function(req, res){
    execSQLQuery('DELETE FROM mydb.horario WHERE idHorario = ' + parseInt(req.params.idHorario), res);
})


//Modificar Dados
router.get('/upprofrechor', function(req, res){
    execSQLQuery(`UPDATE mydb.professor_has_recursos_has_horario SET status = '${objProfessorRecursosHorarios[3]}' WHERE (Professor_idProfessor = ${objProfessorRecursosHorarios[0]}) and (Recursos_has_Horario_Recursos_idRecursos = ${objProfessorRecursosHorarios[1]}) and (Recursos_has_Horario_Horario_idHorario =${objProfessorRecursosHorarios[2]});`, res);
})
router.get('/uprechor', function(req, res){
    execSQLQuery(`UPDATE mydb.recursos_has_horario SET ocupacao = '${objRecursosHorarios[2]}' WHERE (Recursos_idRecursos = '${objRecursosHorarios[0]}') and (Horario_idHorario = '${objRecursosHorarios[1]}');`, res);
})
router.get('/uprec', function(req, res){
    execSQLQuery(`UPDATE mydb.recursos SET  numero = '${objRecursos[0]}', capacidade = '${objRecursos[1]}', informacao = '${objRecursos[2]}', TipoDeRecursos_idTipoDeRecursos = '${objRecursos[3]}', Professor_idProfessor = '${objRecursos[4]}' WHERE (idRecursos = '${objRecursos[5]}');`, res);
})
router.get('/uptrec', function(req, res){
    execSQLQuery(`UPDATE mydb.tipoderecursos  SET descricao = '${objtTipoRecursos[0]}', nome = '${objtTipoRecursos[1]}', quantidade = '${objtTipoRecursos[2]}' WHERE (idTipoDeRecursos = '${objtTipoRecursos[3]}');`, res);
})
router.get('/upprof', function(req, res){
    execSQLQuery(`UPDATE mydb.professor SET email = '${objProfessor[0]}', nome = '${objProfessor[1]}', senha = '${objProfessor[2]}', areaDoConhecimento = '${objProfessor[3]}', responsavel = '${objProfessor[4]}' WHERE (idProfessor = '${objProfessor[5]}');`, res);
})
router.get('/uphor', function(req, res){
    execSQLQuery(`UPDATE mydb.horario SET horarioInicio = '${objHorario[0]}', horarioFim = '${objHorario[1]}' WHERE (idHorario = ${objHorario[2]});`, res);
})
