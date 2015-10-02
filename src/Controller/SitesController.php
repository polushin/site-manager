<?php
namespace App\Controller;

class SitesController extends AppController
{
    public function add()
    {
        $site = $this->Sites->newEntity($this->request->input('json_decode', true));

        if ($this->Sites->save($site)) {
            $this->set('status', true);
            $this->set('site', $site->toArray());
        } else {
            $this->set(['status' => false]);
        }
        $this->set('_serialize', ['status', 'site']);
    }

    public function edit($id)
    {
        $site = $this->Sites->get($id);

        $this->set(['status' => false]);

        if ($this->request->is(['post', 'put'])) {
            $site = $this->Sites->patchEntity($site,
                $this->request->input('json_decode', true)
            );

            if ($this->Sites->save($site)) {
                $this->set('status', true);
            }
        }
        $this->set('_serialize', ['status']);
    }

    public function delete($id)
    {
        $site = $this->Sites->get($id);

        if ($this->Sites->delete($site)) {
            $this->set('status', true);
        } else {
            $this->set(['status' => false]);
        }
        $this->set('_serialize', ['status']);
    }

    public function index()
    {
        $sites = $this->Sites->find('all');

        $data = [];
        foreach($sites as $site) {
            $data[] = $site->toArray();
        }

        $this->set(['status' => true, 'sites'=>$data]);
        $this->set('_serialize', ['status', 'sites']);
    }


    public function test()
    {
        $this->viewBuilder()->layout('test');
    }
}
