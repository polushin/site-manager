<?php
namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Event\Event;
use Cake\ORM\Entity;
use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class SitesTable extends Table
{
    const SITES_DIR = 'sites';

    public function afterSave(Event $event, Entity $site, \ArrayObject $options)
    {
        $sitePath = WWW_ROOT . '..' . DS . self::SITES_DIR . DS . 'site' . $site->id;
        $dir = new Folder($sitePath, true, 0755);
        $indexHtml = new File($sitePath . DS . 'index.html', true, 0644);
        $indexHtml->write($site->content);
    }

    public function afterDelete(Event $event, Entity $site, \ArrayObject $options)
    {
        $sitePath = WWW_ROOT . '..' . DS . self::SITES_DIR . DS . 'site' . $site->id;
        $dir = new Folder($sitePath);
        $dir->delete();
    }
}