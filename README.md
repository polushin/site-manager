# site-manager
Simple site manager. One page application, Rest Api. Frontend AngularJs, backend - cakephp-3.

#Installation
1. Clone this project, or download zip file. Ex: git clone https://github.com/polushin/site-manager.git
2. Install CakePhp using composer: php composer.pchar install
3. Create local config file config/app_local.php like config/app_local.sample.php and setup your database parameters
4. Init database and create sites folder. Run bin/cake migrations migrate. (file bin/cake must be executable). After this step /sites folder must be created with 777 permitions and sites table in database.
5. Configure two virtualhosts. For site-manager application and for sites. Document root for sitemanager must be to webroot and for sites to sites folders.

#Example virtual hosts
<VirtualHost *:80>
    ServerName site-manager.lch<br/>
    ServerAlias site-manager.lch
    DocumentRoot /mnt/work/hosts/site-manager/webroot
    <Directory "/mnt/work/hosts/site-manager/webroot">
        Options -Indexes +FollowSymLinks +MultiViews
        Require local
        AllowOverride All
        Order allow,deny
        allow from all
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:80>
    ServerName site-manager-sites.lch
    ServerAlias site-manager-sites.lch
    DocumentRoot /mnt/work/hosts/site-manager/sites
    <Directory "/mnt/work/hosts/site-manager/sites">
        Options -Indexes +FollowSymLinks +MultiViews
        Require local
        AllowOverride All
        Order allow,deny
        allow from all
        Require all granted
    </Directory>
</VirtualHost>
