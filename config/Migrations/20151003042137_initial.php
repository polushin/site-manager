<?php
use Migrations\AbstractMigration;
use Cake\Filesystem\Folder;
use App\Model\Table\SitesTable;

class Initial extends AbstractMigration
{
    public function up()
    {
        $table = $this->table('sites');
        $table
            ->addColumn('content', 'text', [
                'default' => null,
                'limit' => null,
                'null' => false,
            ])
            ->create();

        $sitePath = WWW_ROOT . '..' . DS . SitesTable::SITES_DIR;
        new Folder($sitePath, true, 0755);
    }

    public function down()
    {
        $this->dropTable('sites');
    }
}
