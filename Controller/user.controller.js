var sql = require('mssql/msnodesqlv8');
const {checkServer} = require('../util/checkServer');

const getdata = async(req, res)=>{
    const {MCN} = req.body;
    let pool=null;
    const sql = "SELECT * FROM KHACHHANG";
    pool = await checkServer(MCN);
    return await pool.request().query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }
        return res.json({msg:rows})
    })
}
const addUser = async(req, res)=>{
    const {MCN, HOTEN, SODT, DIACHI, NGAYSINH, DOANHSO} = req.body;
    const MAKH = 'KH'+ Math.floor(Math.random()*1000)+1000;
    const DS = parseInt(DOANHSO);
    const date = new Date(Date.now());
    const today = date.toLocaleDateString('en-US');
    const sql = `INSERT INTO KHACHHANG (MAKH, HOTEN, SODT, DIACHI, NGAYSINH, DOANHSO, MACN, NGAYDK) VALUES ('${MAKH}', '${HOTEN}', '${SODT}','${DIACHI}', '${NGAYSINH}', ${DS}, '${MCN}', '${today}')`;
    console.log(sql);
    const pool = await checkServer(MCN);
    return await pool.request().query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
}

const getUserByID = async(req, res)=>{
    const {MCN, MAKH} = req.body;
    const sql = `SELECT * FROM KHACHHANG WHERE MAKH = '${MAKH}'`
    const pool = await checkServer(MCN);
    console.log(sql)
    return await pool.request().query(sql,(err, rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

const updateUserByID = async(req, res)=>{
    const {MCN, MAKH, HOTEN, SODT, DIACHI, NGAYSINH, DOANHSO} = req.body;
    const sql = `UPDATE KHACHHANG SET HOTEN='${HOTEN}', SODT = '${SODT}', DIACHI= '${DIACHI}', NGAYSINH='${NGAYSINH}', DOANHSO='${DOANHSO}' WHERE MAKH = '${MAKH}'`
    const pool = await checkServer(MCN);
    console.log(sql)
    return await pool.request().query(sql,(err, rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:"Success"})
        }
    })
}

module.exports = {
    getdata,
    addUser,
    getUserByID,
    updateUserByID
}