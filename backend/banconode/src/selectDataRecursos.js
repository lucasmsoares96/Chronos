let sqlQUERY = require("./sqlQueryExec");
let funcao = require("./imprimirResults")
//adicionando tipo de recursos ao banco
let selectDR = function select(objVazio, res){
    let query = 'SELECT * FROM banco.datarecursos;';
    let resulta = sqlQUERY(query,objVazio,funcao,res);
    console.log(resulta);
}
//criando modulo
module.exports = selectDR;