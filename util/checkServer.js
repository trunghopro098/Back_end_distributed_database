const {serverDB} = require('../db_MAYCHU');

const checkServer = async(MCN)=>{
    let pool = null;
    if(MCN==="CN1"){
        pool = await serverDB("TRAM1");
    }else if (MCN==="CN2"){
        pool = await serverDB("TRAM2");
    }
    else{
        pool = await serverDB("MAYCHU");
    }
    return pool;
}

module.exports = {
    checkServer
}