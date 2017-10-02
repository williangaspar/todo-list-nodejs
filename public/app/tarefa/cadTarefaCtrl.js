angular.module("app").controller("CadTarefaCtrl", CadTarefaCtrl);

CadTarefaCtrl.$inject = ["$scope", "$mdDialog", "locals"];
function CadTarefaCtrl($scope, $mdDialog, locals) {

  this.tarefa = locals.item || {};
  this.nova = !locals.item;

  this.salvar = function() {
    $mdDialog.hide(this.tarefa);
  }

  this.cancelar = $mdDialog.cancel;

};