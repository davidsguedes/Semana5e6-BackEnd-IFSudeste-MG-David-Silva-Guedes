const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaSchema = new Schema ({
    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = Pessoa = mongoose.model("pessoa", PessoaSchema);