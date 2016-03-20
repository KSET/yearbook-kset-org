'use strict';

var yearbookControllers = angular.module('yearbookControllers', []);

yearbookControllers.controller('SectionsListCtrl', ['$scope', function ($scope) {

    $scope.sections = [
        { "name": "BIKE", "anchor": "bike-sekcija" },
        { "name": "DISCO", "anchor": "disco-sekcija" }, 
        {"name": "DRAMSKA", "anchor": "dramska-sekcija"}, 
        {"name": "FOTO", "anchor": "foto-sekcija"}, 
        {"name": "GLAZBENA", "anchor": "glazbena-sekcija"}, 
        {"name": "P.I.J.A.N.D.U.R.E.", "anchor": "planinarska-sekcija"}, 
        {"name": "RAČUNARSKA", "anchor": "racunarska-sekcija"},
        {"name": "TEHNIČKA", "anchor": "tehnicka-sekcija"}, 
        {"name": "VIDEO", "anchor": "video-sekcija"}
    ];

   
}]);


yearbookControllers.controller('MembersCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    
    $http.get('/ksetovci/ksetovci.json').success(function(data) {
        $scope.members = data;
        $timeout(function () {
            $('#fullpage').fullpage({
            anchors:['sections']});
        }, 0);
    });

}]);