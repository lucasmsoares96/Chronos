let sqlQUERY = require("./sqlQueryExec");
//adicionando tipo de recursos ao banco
let selectH = function select(objVazio, res){
    let query = 'SELECT * FROM banco.horario;';
    sqlQUERY(query,objVazio,res);
}
//criando modulo
module.exports = selectH;