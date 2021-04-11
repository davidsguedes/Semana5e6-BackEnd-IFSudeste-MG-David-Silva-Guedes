const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,"public")));

//--------------------banco de dados---------------------------
const mongoose = require('mongoose');
const db_access = require('./setup/bd').mongoURL;

mongoose
.connect(db_access, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conexão ao mongoDB bem sucedida!"))
.catch(err => console.log(err));

//--------------------login---------------------

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

const auth = require("./routes/auth");

app.use("/auth", auth);

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname + '/index.html'));

});

app.get('*', (req, res) => {
    res.send("Link inválido: 404");

});


const port = 3000;

app.listen(port, () => console.log(`Escutando na porta ${port}`));