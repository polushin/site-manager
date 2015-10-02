<?php

use Cake\Core\Plugin;
use Cake\Routing\Router;

Router::defaultRouteClass('Route');

Router::scope('/', function ($routes) {
    $routes->connect('/', ['controller' => 'Index', 'action' => 'index']);

    $routes->connect('/sites/add.json', ['controller' => 'Sites', 'action' => 'add']);
    $routes->connect('/sites/edit.json/:id', ['controller' => 'Sites', 'action' => 'edit'],['id' => '\d+', 'pass' => ['id']]);
    $routes->connect('/sites/delete.json/:id', ['controller' => 'Sites', 'action' => 'delete'],['id' => '\d+', 'pass' => ['id']]);

    $routes->connect('/sites/index.json', ['controller' => 'Sites', 'action' => 'index']);


    $routes->extensions(['json', 'xml']);
    $routes->fallbacks('InflectedRoute');
});

Plugin::routes();
