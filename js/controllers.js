'use strict';

var yearbookControllers = angular.module('yearbookControllers', []);

yearbookControllers.controller('SectionsListCtrl', ['$scope','$window', function ($scope, $window) {

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

    $scope.goToAnchor = function (anchor) {
        console.log($window.location.hash);
        var newHash = "#sections/" + anchor;
        console.log(newHash);
        $window.location.hash = newHash;
    }
   
}]);


yearbookControllers.controller('MembersCtrl', ['$scope', '$http', '$timeout','$window', function($scope, $http, $timeout, $window) {
    
    $http.get('/ksetovci/ksetovci.json').success(function(data) {
        $scope.members = data;
        $timeout(function () {
            $('#fullpage').fullpage({
                anchors: ['sections'],
                scrollingSpeed: 1000
            });
        }, 0);
    });

    $scope.goToTOC = function () {
        var newHash = "#sections/table-of-contents";
        $window.location.hash = newHash;
    }

}]);