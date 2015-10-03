<?php
namespace App\Controller;

class IndexController extends AppController
{
    public function initialize()
    {
        parent::initialize();

        $this->viewBuilder()->layout('main');
    }

    public function index()
    {
    }

}