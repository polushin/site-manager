<?php
namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Core\Exception\Exception;

class AppController extends Controller
{
    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('RequestHandler');
    }

}
