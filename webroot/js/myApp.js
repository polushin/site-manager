'use strict';
var myApp = angular.module('myApp', []);

myApp.controller('myAppCtrl', ['$scope','$rootScope', 'SiteManager', function($scope, $rootScope, SiteManager){
    SiteManager.loadSites();

    $scope.setActiveSite = function(site){
        console.log('dfgdfgdfg');
        if ((typeof site == 'object') && (site != null)) {
            $scope.currentContent = site.content;
            $scope.currentSite = site;
            return;
        }

        $scope.currentSite = SiteManager.getInitialSite();
        $scope.currentContent = $scope.currentSite.content;
    };

    $scope.typeOfCurrentSite = function(){
        if ((typeof $scope.currentSite == 'object') && ($scope.currentSite != null)){
            if ($scope.currentSite.id == 0) {
                return 'new';
            } else {
                return 'regular';
            }
        }
        return 'empty';
    };

    $scope.getCurrentSiteTitle = function(){
        var currentSiteType = $scope.typeOfCurrentSite();
        switch (currentSiteType) {
            case 'regular':
                return 'Site ' + $scope.currentSite.id;
            case 'new':
                return 'Add New Site';
            default:
                return '';
        }
    };

    $scope.setActiveSite(null);

    $scope.newSite = function(){
        $scope.setActiveSite(null);
    };

    $scope.saveSite = function(){
        SiteManager.saveSite($scope.currentSite, $scope.currentContent);
    };

    $scope.deleteSite = function(){
        SiteManager.deleteSite($scope.currentSite);
    };


    $rootScope.$on('sitesLoadedEvent', function(event, args) {
        $scope.sites = SiteManager.getSites();
        if ($scope.sites.length > 0) {
            $scope.setActiveSite($scope.sites[0]);
        }
    });

    $rootScope.$on('newSiteEvent', function(event, args) {
        $scope.setActiveSite(args);
    });

    $rootScope.$on('siteDeletedEvent', function(event, args) {
        $scope.setActiveSite(args);
    });
}]);

myApp.factory('SiteManager', ['$http', '$rootScope', function ($http, $rootScope) {
    var sites = [];

    var getSiteIndex = function(site){
        for(var i=0; i<sites.length; i++){
            if(sites[i].id == site.id) {
                return i;
            }
        }
        return null;
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
            alert('Site Saved');
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
            var newSite = response.data.site;
            sites.push(newSite);
            alert('New Site Added [Site '+newSite.id+']');
            $rootScope.$emit('newSiteEvent', response.data.site);
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
        },

        deleteSite: function(site){
            $http({
                method: 'POST',
                url: '/sites/delete.json/'+site.id,
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(function successCallback(response) {
                var ind = getSiteIndex(site);
                sites.splice(ind, 1);
                if (ind < sites.length) {
                    $rootScope.$emit('siteDeletedEvent', sites[ind]);
                } else if(sites.length > 0) {
                    $rootScope.$emit('siteDeletedEvent', sites[sites.length-1]);
                } else {
                    $rootScope.$emit('siteDeletedEvent', null);
                }
            }, function errorCallback(response) {
                alert('Server Error');
            });
        },

        getInitialSite: function(){
            return {
                id: 0,
                content: "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n</head>\n<body>\n</body>\n</html>"
            };
        }
    }
}]);



