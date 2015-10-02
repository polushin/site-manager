'use strict';
var myApp = angular.module('myApp', []);

myApp.controller('myAppCtrl', ['$scope','$rootScope', 'SiteManager', function($scope, $rootScope, SiteManager){
    SiteManager.loadSites();

    $scope.sites = SiteManager.getSites();
    $scope.currentContent = '';

    $scope.setActiveSite = function(site){
        $scope.currentSite = site;
        $scope.currentContent = site.content;
    };

    $scope.newSite = function(){
        $scope.setActiveSite({id:0, content:"<!--html code-->"});
    };

    $scope.saveSite = function(){
        SiteManager.saveSite($scope.currentSite, $scope.currentContent);
    };

    $scope.isNewSite = function(){
        if ((typeof $scope.currentSite == 'object') && ($scope.currentSite.id == 0)) {
            return true;
        }
        return false;
    };

    $rootScope.$on('sitesLoadedEvent', function(event, args) {
        $scope.sites = SiteManager.getSites();
        if ($scope.sites.length > 0) {
            $scope.setActiveSite($scope.sites[0]);
        }
    });
}]);

myApp.factory('SiteManager', ['$http', '$rootScope', function ($http, $rootScope) {
    var sites = [];

    var update = function(site){
        for(var i=0; i< sites.length; i++){
            if (sites[i].id == site.id){
                sites[i] = site;
                break;
            }
        }
    };

    var edit = function (site, content){
        $http({
            method: 'POST',
            url: '/sites/edit.json/'+site.id,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {content: content}
        }).then(function successCallback(response) {
            site.content = content;
            update(site);
        }, function errorCallback(response) {
            alert('Server Error');
        });
    };

    var add = function (site, content){
        $http({
            method: 'POST',
            url: '/sites/add.json',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {content: content}
        }).then(function successCallback(response) {
            sites.push(response.data.site);
        }, function errorCallback(response) {
            alert('Server Error');
        });
    };

    return {
        loadSites: function(){
            $http({
                method: 'POST',
                url: '/sites/index.json',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(function successCallback(response) {
                sites = response.data.sites;
                $rootScope.$emit('sitesLoadedEvent', '');
            }, function errorCallback(response) {
                alert('Server Error');
            });
        },

        getSites: function(){
            return sites;
        },

        saveSite: function(site, content){
            if ((typeof site == 'object') && (site.id != 0)) {
                edit(site, content);
            } else {
                add(site, content);
            }
        }
    }
}]);



