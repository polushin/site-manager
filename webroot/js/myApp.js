'use strict';
var myApp = angular.module('myApp', []);

myApp.controller('myAppCtrl', ['$scope','$rootScope', 'SiteManager', function($scope, $rootScope, SiteManager){
    SiteManager.loadSites();

    $scope.setActiveSite = function(site){
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

    var httpRequest = function(url, data, success){
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: data
        }).then(success, function errorCallback(response) {
            alert('Server Error');
        });

    };

    var edit = function (site, content){
        httpRequest('/sites/edit.json/'+site.id, {content: content}, function(response){
            site.content = content;
            alert('Site Saved');
        });
    };

    var add = function (site, content){
        httpRequest('/sites/add.json', {content: content}, function(response){
            var newSite = response.data.site;
            sites.push(newSite);
            alert('New Site Added [Site '+newSite.id+']');
            $rootScope.$emit('newSiteEvent', newSite);
        });
    };

    return {
        loadSites: function(){
            httpRequest('/sites/index.json', {}, function(response){
                sites = response.data.sites;
                $rootScope.$emit('sitesLoadedEvent', '');
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
            httpRequest('/sites/delete.json/'+site.id, {}, function(response){
                var ind = getSiteIndex(site);
                sites.splice(ind, 1);
                if (ind < sites.length) {
                    $rootScope.$emit('siteDeletedEvent', sites[ind]);
                } else if(sites.length > 0) {
                    $rootScope.$emit('siteDeletedEvent', sites[sites.length-1]);
                } else {
                    $rootScope.$emit('siteDeletedEvent', null);
                }
            });
        },

        getInitialSite: function(){
            return {
                id: 0,
                content: "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n</head>\n<body>\n<h1>Hellow world</h1>\n</body>\n</html>"
            };
        }
    }
}]);



