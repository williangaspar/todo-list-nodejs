angular.module("app").factory("Tarefa", TarefaFactory);

TarefaFactory.$inject = ["$http", "$q"];
function TarefaFactory($http, $q) {

  var tarefasPromise = $q.defer();
  var tarefas = [];

  // O que será exposto para o controller
  var exportar = {  
    iniciar: iniciar,
    cadastrar: cadastrar,
    atualizar: atualizar,
    excluir: excluir,
    feita: feita,
    procurar: procurar 
  };

  function iniciar() {
    $http.get("tarefas").then(onResponse);
    function onResponse(response) {
      if (response && response.status === 200) {
        tarefas = response.data;
        tarefasPromise.resolve(tarefas);
      }
    }
    return tarefasPromise.promise;
  };

  function cadastrar(tarefa, cb) {
    $http.post("tarefa", tarefa).then(cb);
  }

  function atualizar(tarefa, cb) {
    $http.put("tarefa", tarefa).then(cb);
  }

  function excluir(id, cb) {
    $http.delete("tarefa/" + id).then(cb);
  }

  function feita(tarefa, cb) {
    $http.put("tarefa/feita",  tarefa).then(cb);
  }

  function procurar(tarefaId) {
    var tarefa = tarefas.find(pesquisar);
    function pesquisar(item) {
      return item._id === tarefaId;
    }
    return tarefa;
  }

  return exportar;
};