const express = require('express')
const app = express()
const bodyparser = require('body-parser');

var cors = require('cors')
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const port = 5000;

app.use("/user",require("./Route/user.route"));
app.use("/bill",require("./Route/bill.route"));

app.listen(port,()=>console.log(`App listening at http://localhost:${port}`))