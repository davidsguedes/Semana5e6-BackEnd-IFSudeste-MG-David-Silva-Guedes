const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,"public")));

//----------------tratamento de autenticação-------

const Pessoa = require("../models/pessoa");
const bcrypt = require("bcrypt");

router.post('/addComentario', (req, res) => {
    Pessoa.findOne({usuario: req.body.usuario, email: req.body.email, comentario: req.body.comentario})
    
    .then(doc_pessoa => {

            if(doc_pessoa){
                //já existe comentário com os dados informados
                return res.status(400).json({emailerror: "Já existe comentário com os dados informados"});
            
            } else{
                //inserir no banco de dados
                const novo_doc_pessoa = Pessoa ({
                    usuario: req.body.usuario,
                    email: req.body.email,
                    comentario: req.body.comentario,
                    senha: req.body.senha,

                });


                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(novo_doc_pessoa.senha, salt, function(err, hash) {
                        
                        if(err) throw err;
                        novo_doc_pessoa.senha = hash;

                        //salva no bd
                        novo_doc_pessoa
                        .save()
                        .then(doc_pessoa => res.json(doc_pessoa))
                        .catch(err => console.log(err));

                    });
                });

                res.send("Comentário enviado com sucesso!");
            }
    })

    .catch();
});

router.get("/", (req,res) => res.json({status: "Acesso permitido"}));

module.exports = router;
