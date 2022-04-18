var sql = require('mssql/msnodesqlv8');

 // config for your database

const serverDB = (server)=>{
    var config = {

        server : `localhost\\${server}`,
        user : 'sa',
        password  : 'abc123',
        database : 'QLBH',
        driver : 'msnodesqlv8'
    
        }
    
    const conn = new sql.ConnectionPool(config).connect().then(pool =>{
            return pool;
        }
    );

    return conn;
}


module.exports = {
    serverDB
}

