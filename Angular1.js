********************************************************************
#Start server utilizando o node.js
cd C:\Users\ROBSON\Desktop\Desktop\Angular1\Alurapic
npm install
npm start

Não commitar o node_modules, ele será compilado

USUÁRIOS WINDOWS:
Se por acaso mensagem de erro serem exibidas,
procure pelo texto npm ERR! self signed certificate.
Se ele existir, isso indica um problema no certificado do seu roteador (proxy).
Não se preocupe, basta rodar o comando no terminal npm set strict-ssl false que resolvera este problema.

Utiliza MVC

ng-bla -> Diretivas do Angular

*******************************************************************
#Bootstrap
#Imagem responsiva e alinhada ao centro
<img class="img-responsive center-block" src="..." alt="Leão">

********************************************************************
#Criando um modulo
#Importar ele no index
<html lang="pt-br" ng-app="alurapic"> // Para carregar o modulo, inicializar
...
<script src="js/lib/angular.min.js"></script>
<script src="js/main.js"></script>

#Arquivo do modulo principal [file-> main.js]
angular.module('alurapic', []);

********************************************************************
#Controllers
[file -> fotos-controller.js]
// $scope - Deixa o controller visivel para a view
angular.module('alurapic').controller('FotosController', function($scope) {
    $scope.foto = {
        titulo : 'Leão',
        url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
    };
});
#Enviando os dados para a URL [file ->index.hmtl]
<html lang="pt-br" ng-app="alurapic">
...
<script src="js/controllers/fotos-controller.js"></script>
...
<body ng-controller="FotosController">
...
    <img
      class="img-responsive center-block"
      src="{{foto.url}}"
      alt="{{foto.titulo}}">

********************************************************************
#Get - [file -> js\controllers\fotos-controller.js]
angular.module('alurapic').controller('FotosController', function($scope, $http) {
...
  $scope.fotos = [];
  $http.get('/v1/fotos')
  .success(function(response) {
      $scope.fotos = response;
  })
  .error(function(erro) {
      console.log(erro);
  });
});

********************************************************************
#Repeat
<div class="panel panel-default col-md-2" ng-repeat="foto in fotos">
  <img
    class="img-responsive center-block"
    src="{{foto.url}}"
    alt="{{foto.titulo}}">
</div>

********************************************************************
#Criando diretiva com elemento filho e passando atributo
Importar a diretiva no main [file -> public/js/main.js]
angular.module('alurapic', ['minhasDiretivas']);

Alterar o index.html [file -> public/index.html]
<script src="js/directives/minhas-diretivas.js"></script>
<meu-painel ng-repeat="foto in fotos" titulo="{{foto.titulo}}">
    <!--Elemento filho-->
    <img
            class="img-responsive center-block"
            src="{{foto.url}}"
            alt="{{foto.titulo}}">
</meu-painel>

Criar a diretiva [file -> public/js/directives/minhas-diretivas.js]
angular
    .module('minhasDiretivas', [])
    .directive('meuPainel', function () {
        //Escreve assim: meuPainel
        //Chama assim:   <meu-painel></meu-painel>
        //DDO = Direction definition object
        var ddo = {};
        //Restrição de uso - Pode ser usada como atributo ou elemento
        ddo.restrict = "AE";
        //Criar um scope privado para reutilizar o compomente
        //Recebe o titulo
        //Se o nome for diferente tem que colocar assim: titulo: '@titulo'
        ddo.scope = {
            titulo: '@'
        };
        //Manter o elemento filho
        ddo.transclude = true;
        //<div class="panel-body" ng-transclude> - Recebe os filhos
        ddo.templateUrl = 'js/directives/meu-painel.html';
        return ddo;
    });

html [file -> public/js/directives/meu-painel.html]
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title text-center">{{titulo}}</h3>
    </div>
    <div class="panel-body" ng-transclude>
    </div>
</div>

********************************************************************
#Pegando o input em tempo real e fazendo um filtro no front - comunicação bidirecional
[file -> public/js/main.js]
angular.module('alurapic', ['minhasDiretivas', 'ngAnimate']);

[file -> public/css/efeitos.css]
.painel-animado {
    -moz-transition: transform 0.8s;
    -webkit-transition: transform 0.8s;
    -ms-transition: transform 0.8s;
    -o-transition: transform 0.8s;
    transition: transform 0.8s;
}
/*Tem a classe, quando está deixando a tela*/
.painel-animado.ng-leave-active {
    -moz-transform: scale(0.1);
    -webkit-transform: scale(0.1);
    -ms-transform: scale(0.1);
    -o-transform: scale(0.1);
    transform: scale(0.1);
}

[file -> public/js/controllers/fotos-controller.js]
angular.module('alurapic').controller('FotosController', function ($scope, $http) {
    $scope.filtro = ''; <- Declara no controller
    ...
});

[file -> public/index.html]
<head>
    ...
    <script src="js/lib/angular-animate.min.js"></script>
    ...
    <div class="row">
        <div class="col-md-12">
            <form>
                <input class="form-control"
                       placeholder="filtrar pelo título da foto"
                       ng-model="filtro"
                       ng-model-options="{ debounce: 500 }">
                <!--Delay de meio segundo -> debounce: 500-->
            </form>
        </div>
    </div>
    ...
    <meu-painel
            class="col-md-2 painel-animado"
            ng-repeat="foto in fotos | filter: filtro"
            titulo="{{foto.titulo}}">
        <!--Elemento filho-->
        <img
                class="img-responsive center-block"
                src="{{foto.url}}"
                alt="{{foto.titulo}}">
    </meu-painel>

********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
********************************************************************
