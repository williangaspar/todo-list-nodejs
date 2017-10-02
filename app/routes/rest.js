const router = require('express').Router();

const Db = require(".././db");
const db = Db.db;
const Tarefa = Db.Tarefa;

// Retorna lsita de tarefas
router.get("/tarefas", (req, res) => {
  Tarefa.find().limit(100).exec(onResult);

  function onResult(err, data) {
    if (!err) {
      res.json(data);
    } else {
      res.json({ error: 500, message: "Erro ao ler banco de dados" });
    }
  }
});

// Cria uma nova tarefa
router.post("/tarefa", (req, res) => {
  const tarefa = new Tarefa({
    "titulo": req.body.titulo,
    "descricao": req.body.descricao,
    "finalizada": req.body.finalizada
  });

  tarefa.save((err, data) => {
    if (err) {
      res.json({ error: 500 });
    } else {
      res.json({ success: true, id: data._id });
    }
  });
});

// Atualiza uma tarefa
router.put("/tarefa", (req, res) => {
  const tarefa = {
    "titulo": req.body.titulo,
    "descricao": req.body.descricao,
    "finalizada": req.body.finalizada
  }
  Tarefa.update({ _id: req.body._id }, { $set: tarefa }, onFinish);
  function onFinish(err) {
    respond(res, err, 500);
  }
});

// Remove uma tarefa
router.delete("/tarefa/:id", (req, res) => {
  Tarefa.remove({ _id: req.params.id }, (err) => respond(res, err, 500));
});

// Atualiza o status finalizado da tarefa
router.put("/tarefa/feita", (req, res) => {
  Tarefa.update({ _id: req.body._id }, { $set: { finalizada: req.body.finalizada } }, onFinish);
  function onFinish(err) {
    respond(res, err, 500);
  }
});

function respond(res, err, code){
  if (err) {
    res.json({ error: code });
  } else {
    res.json({ success: true });
  }
}

module.exports = router;