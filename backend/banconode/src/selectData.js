let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectD = function select(objVazio, res){
    let query = 'SELECT * FROM banco.data;';
    let resulta = sqlQUERY(query,objVazio,funcao,res);
    console.log(resulta);
}
//criando modulo
module.exports = selectD;