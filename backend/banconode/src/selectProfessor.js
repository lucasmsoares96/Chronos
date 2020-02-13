let sqlQUERY = require("./sqlQueryExec");
//adicionando tipo de recursos ao banco
let selectP = function select(objVazio, res){
    let query = 'SELECT * FROM banco.professor;';
    sqlQUERY(query,objVazio,res);
}
//criando modulo
module.exports = selectP;