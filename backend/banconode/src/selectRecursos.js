let sqlQUERY = require("./sqlQueryExec");
//adicionando tipo de recursos ao banco
let selectR = function select(objVazio, res){
    let query = 'SELECT * FROM banco.recursos;';
    sqlQUERY(query,objVazio,res);
}
//criando modulo
module.exports = selectR;