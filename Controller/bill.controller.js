const {checkServer} = require('../util/checkServer');


const getBill = async(req,res)=>{
    const {MCN} = req.body;
    const sql = "SELECT HOADON.SOHD, HOADON.TRIGIA, HOADON.NGHD, KHACHHANG.HOTEN AS HOTEN_KH, KHACHHANG.DIACHI,NHANVIEN.HOTEN AS HOTEN_NV,HOADON.MAKHO FROM HOADON INNER JOIN KHACHHANG ON HOADON.MAKH = KHACHHANG.MAKH INNER JOIN NHANVIEN ON HOADON.MANV = NHANVIEN.MANV";
    const pool = await checkServer(MCN);
    return await pool.request().query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }
        return res.json({msg:rows})
    })

}

const addBill = async(req,res)=>{
    const {MCN,MAKH,MAKHO,MANV,SOHD,TRIGIA} = req.body;
    const IntSoHD = parseInt(SOHD);
    
    const sql = `insert into HOADON (SOHD,MAKH,MANV,MAKHO,TRIGIA) values(${IntSoHD},'${MAKH}','${MANV}','${MAKHO}',${TRIGIA} )`;
    console.log(date)
    const pool = await checkServer(MCN);
    return await pool.request().query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }
        return res.json({msg:"Success"})
    })
}
const getCode = async(req,res)=>{
    const {MCN} = req.body;
    const sql = "SELECT MANV AS MNV, HOTEN AS HOTEN FROM NHANVIEN SELECT MAKH AS MKH, HOTEN AS HOTENKG FROM KHACHHANG SELECT MAKHO AS MAKHO, DIACHI AS DIACHI FROM KHO"
    const pool = await checkServer(MCN);
    return await pool.request().query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })

}
const Statical = async(req, res)=>{
    const {MCN} = req.body;
    // const sql = "SELECT SUM(TRIGIA) AS TONG, NGHD AS NGAYTAO FROM HOADON GROUP BY NGHD";
    const sql = "SELECT YEAR(NGHD) [YEAR], MONTH(NGHD) [MONTH], SUM(TRIGIA) AS TONG FROM HOADON GROUP BY  YEAR(NGHD), MONTH(NGHD) ORDER BY YEAR(NGHD), MONTH(NGHD)";
    const pool = await checkServer(MCN);
    return await pool.request().query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json({msg:rows})
        }
    })
}

module.exports = {
    getBill,
    addBill,
    getCode,
    Statical
    
}