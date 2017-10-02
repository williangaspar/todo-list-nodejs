angular.module("app").controller("TarefaCtrl", TarefaCtrl);

TarefaCtrl.$inject = ["$scope", "Tarefa", "$mdDialog"];
function TarefaCtrl($scope, Tarefa, $mdDialog) {

  // Lista de tarefas 
  $scope.tarefas = [];

  // Critério de ordenação para a tabela
  $scope.query = {
    order: "titulo",
  };

  iniciar();

  function iniciar() {
    Tarefa.iniciar().then(tarefas);
    function tarefas(result) {
      $scope.tarefas = result;
    }
  }

  $scope.cadastrar = function () {
    showCadTarefa().then(onResult);
    function onResult(tarefa) {
      Tarefa.cadastrar(tarefa, onResponse);
      function onResponse(response) {
        if (response.status !== 200 || response.data.error) {
          alert("Não foi possível efetuar o cadastro");
        } else {
          tarefa._id = response.data.id;
          $scope.tarefas.push(tarefa);
        }
      }
    }
  }

  $scope.editar = function (id) {

    var tarefa = Tarefa.procurar(id);

    // Copia a tarefa atual
    var tarefaAtual = {
      _id: tarefa._id,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      finalizada: tarefa.finalizada
    }

    showCadTarefa(tarefaAtual).then(onResult);
    function onResult(tarefaEditada) {
      Tarefa.atualizar(tarefaEditada, onResponse);
      function onResponse(response) {
        if (response.status !== 200 || response.data.error) {
          alert("Não foi possível editar o registro");
        } else {
          // Em caso de sucesso substitui a tarefa antiga pela nova
          var index = $scope.tarefas.indexOf(tarefa);
          $scope.tarefas[index] = tarefaEditada;
        }
      }
    }
  }

  $scope.excluir = function (id) {
    var confirm = $mdDialog.confirm()
      .title("Alerta")
      .textContent("Deseja mesmo excluir tarefa?")
      .ok('Ok')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function () {
      var tarefa = Tarefa.procurar(id);
      Tarefa.excluir(tarefa._id, onResponse);
      function onResponse(response) {
        if (response.status !== 200 || response.data.error) {
          alert("Não foi possível excluir o registro");
        } else {
          var index = $scope.tarefas.indexOf(tarefa);
          $scope.tarefas.splice(index, 1);
        }
      }
    });
  }

  $scope.feita = function (id) {
    var tarefa = Tarefa.procurar(id);

    var tarefaFeita = {
      _id: tarefa._id,
      finalizada: tarefa.finalizada
    }
    
    Tarefa.feita(tarefaFeita, onResponse);
    function onResponse(response) {
      if (response.status !== 200 || response.data.error) {
        tarefa = !tarefa.finalizada;
        alert("Não foi possível editar o registro");
      }
    }
  }

  function showCadTarefa(item) {
    return $mdDialog.show({
      clickOutsideToClose: false,
      controller: 'CadTarefaCtrl',
      controllerAs: 'vm',
      focusOnOpen: true,
      templateUrl: './app/tarefa/cadTarefa.html',
      locals: {
        item: item,
      }
    });
  }
};