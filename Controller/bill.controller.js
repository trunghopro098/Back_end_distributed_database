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
    const {MCN,MAKH,MAKHO,MANV,TRIGIA} = req.body;
    const {arritemBill} = req.body;
    const SOHD =Math.floor(Math.random()*100000)+10000;
    const sql = `insert into HOADON (SOHD,MAKH,MANV,MAKHO,TRIGIA) values(${SOHD},'${MAKH}','${MANV}','${MAKHO}',${TRIGIA} )`;
    // console.log(SOHD)
    const pool = await checkServer(MCN);
    return await pool.request().query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err})
        }else{
            arritemBill.forEach(async(item)=>{
                const sqlDt = `insert into CTHD (SOHD,MASP,SOLUONG) values(${SOHD},'${item.MASP}','${item.SL}')`;
                await pool.request().query(sqlDt,(err,rows)=>{
                    if(err){
                        return res.json({msg:err})
                    }
                })
            })
            return res.json({msg:"Success"})
        }     
    })
    // console.log(arritemBill)
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

const getProduct = async(req, res)=>{
    const {MCN} = req.body;
    const sql = "SELECT * FROM SANPHAM";
    const pool = await checkServer(MCN);
    return await pool.request().query(sql, (err, rows)=>{
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
    Statical,
    getProduct
    
}