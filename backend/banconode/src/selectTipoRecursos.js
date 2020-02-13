let sqlQUERY = require("./sqlQueryExec");
//adicionando tipo de recursos ao banco
let selectTP = function select(objVazio, res){
    let query = 'SELECT * FROM banco.tipoderecursos;';
    sqlQUERY(query,objVazio,res);
}
//criando modulo
module.exports = selectTP;