angular.module("app").config(Routes);

Routes.$inject = ["$routeProvider", "$locationProvider"];
function Routes($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    templateUrl: "app/tarefa/tarefa.html",
    controller: "TarefaCtrl",
    controllerAs: "vm"
  }).otherwise({ redirectTo: "/" });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
};