let sqlQUERY = require("./sqlQueryExec");
//adicionando tipo de recursos ao banco
let selectPRC = function select(objVazio, res){
    let query = 'SELECT * FROM banco.professorhorariodatarecursos;';
    sqlQUERY(query,objVazio,res);
}
//criando modulo
module.exports = selectPRC;