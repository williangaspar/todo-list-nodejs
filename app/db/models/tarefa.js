const mongoose = require('mongoose');

const tarefaSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  finalizada: { type: Boolean, default: false },
});

module.exports = mongoose.model('Tarefa', tarefaSchema);