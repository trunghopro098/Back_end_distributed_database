const router = require('express').Router();
const controller = require('../Controller/bill.controller');

router.post("/getBill",controller.getBill);
router.post("/addBill",controller.addBill);
router.post("/getCode",controller.getCode);
router.post("/getStatical",controller.Statical);
module.exports = router;