// $scope - Deixa o controller visivel para a view
angular.module('alurapic')
    .controller('FotoController', function ($scope, $http, $routeParams) {
        $scope.mensagem = '';
        $scope.foto = {};

        if ($routeParams.fotoId) {
            $http.get('/v1/fotos/' + $routeParams.fotoId)
                .success(function (foto) {
                    $scope.foto = foto;
                })
                .error(function (erro) {
                    $scope.mensagem = 'Não foi possível obter a foto'
                });
        }

        $scope.submeter = function () {
            if ($routeParams.fotoId) {
                $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                    .success(function () {
                        $scope.mensagem = 'Foto alterada com sucesso';
                        //$scope.focado = true;
                    })
                    .error(function (erro) {
                        $scope.mensagem = 'Não foi possível alterar, ' + erro;
                    });
            } else {
                $http.post('/v1/fotos', $scope.foto)
                    .success(function () {
                        $scope.foto = {};
                        $scope.mensagem = 'Foto adicionada com sucesso!';
                        //$scope.focado = true;
                    })
                    .error(function (erro) {
                        $scope.mensagem = 'Não foi possível cadastrar a foto, ' + erro;
                    })
            }
        };
    });