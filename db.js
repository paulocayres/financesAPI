var mongoose = require('mongoose');
//mongoose.connect('mongodb://191.176.120.190:27017/agendas');
mongoose.connect('mongodb://paulo.cayres:pccr0976@ds229435.mlab.com:29435/finances');

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
