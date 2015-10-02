<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Simple Site Manager</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <script src="lib/angular/angular.min.js"></script>
    <script src="lib/angular/angular-route.min.js"></script>

    <script src="js/myApp.js"></script>

</head>

<body ng-app="myApp" ng-controller="myAppCtrl">


<div id="wrapper">
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li ng-class="{active: currentSite.id==site.id}" ng-repeat="site in sites">
                <a ng-click="setActiveSite(site)" href="#">Site{{site.id}}</a>
            </li>
        </ul>

    </div>

    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <button type="button" class="btn btn-default" ng-click="newSite()">New Site</button>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h1>Site {{currentSite.id}}</h1>
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="comment">Content:</label>
                                <textarea ng-model="currentContent" class="form-control" rows="10" id="comment">{{currentSite.content}}</textarea>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success" ng-click="saveSite()">Save</button>
                    <button type="button" class="btn btn-danger" ng-if="!isNewSite()" ng-click="deleteSite()">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>