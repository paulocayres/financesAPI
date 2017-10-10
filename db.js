var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/agendas');

var agendaSchema = new mongoose.Schema(
    {
      'descricao': String,
      'recorrente': Boolean,
      'parcelas': Number,
      'periodicidade': Number,
      'formaPagamento': Number,
      'centroCusto': Number,
      'categoria': Number,
      'parcela': [{'valor': Number, 'sinal': Boolean, 'vencimento': String}]
    }


    ,
    {collection: 'agendas'});



module.exports = {
  Mongoose: mongoose,
  AgendaSchema: agendaSchema
}
