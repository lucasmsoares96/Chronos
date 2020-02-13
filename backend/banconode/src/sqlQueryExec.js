const mysql = require('mysql');
let sqlQUERY = function execSQLQuery(sqlQry,[values],funcao,res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'banco' 
    });
    connection.query(sqlQry,[values],function(error, results, fields){
        if(error) 
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
        funcao(results);
    });
}
module.exports = sqlQUERY;