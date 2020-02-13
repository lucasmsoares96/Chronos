let sqlQUERY = require("./sqlQueryExec");
//adicionando tipo de recursos ao banco
let selectRH = function select(objVazio, res){
    let query = 'SELECT * FROM banco.horariodatarecursos;';
    sqlQUERY(query,objVazio,res);
}
//criando modulo
module.exports = selectRH;