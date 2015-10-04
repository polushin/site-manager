# site-manager
Simple site manager.<br/> 
One page application, Rest Api. <br/>
Frontend AngularJs, backend - cakephp-3.

#Installation
1. Clone this project, or download zip file. Ex: git clone https://github.com/polushin/site-manager.git
2. Install CakePhp using composer: php composer.pchar install
3. Create local config file config/app_local.php like config/app_local.sample.php and setup your database parameters
4. Init database and create sites folder. Run bin/cake migrations migrate. (file bin/cake must be executable). After this step /sites folder must be created with 777 permitions and sites table in database.
5. Configure two virtualhosts. For site-manager application and for sites. Document root for site-manager must be to webroot and for sites to sites folders. Sites will be available in http://your-sites-server-name/siteID (ID - identificator of the site).


#Example virtual hosts
\<VirtualHost *:80\><br/>
    ServerName site-manager.lch<br/>
    ServerAlias site-manager.lch<br/>
    DocumentRoot /mnt/work/hosts/site-manager/webroot<br/>
    \<Directory "/mnt/work/hosts/site-manager/webroot"\><br/>
        Options -Indexes +FollowSymLinks +MultiViews<br/>
        Require local<br/>
        AllowOverride All<br/>
        Order allow,deny<br/>
        allow from all<br/>
        Require all granted<br/>
    \</Directory\><br/>
\</VirtualHost\><br/>

\<VirtualHost *:80\><br/><br/>
    ServerName site-manager-sites.lch<br/>
    ServerAlias site-manager-sites.lch<br/>
    DocumentRoot /mnt/work/hosts/site-manager/sites<br/>
    \<Directory "/mnt/work/hosts/site-manager/sites"\><br/>
        Options -Indexes +FollowSymLinks +MultiViews<br/>
        Require local<br/>
        AllowOverride All<br/>
        Order allow,deny<br/>
        allow from all<br/>
        Require all granted<br/>
    \</Directory\><br/>
\</VirtualHost\><br/>
