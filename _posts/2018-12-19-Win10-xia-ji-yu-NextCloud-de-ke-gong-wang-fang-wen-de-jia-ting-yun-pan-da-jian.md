---
layout:     post
title:      "Win10下基于NextCloud的可公网访问的家庭云盘搭建"
date:       2018-12-19 07:51:11 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>文字版，记录和分享一下过程和经历的坑。</p><h2>操作系统</h2><p>硬件配置 i5-4200U 双核四线程 1.4GHz的弱鸡CPU，4G内存。</p><p>用bootcamp安装了最新版的win10，build 1809。</p><p>控制面板\程序\启用或关闭Window功能，打开“适用与Linux的Windows子系统”,以下简称“WSL”。</p><p>打开自带应用商店，搜索ubuntu，下载安装，当前版本为Ubuntu 18.04.</p><p>打开cmd命令行，输入bash即可进入WSL子系统(以下操作除非特殊说明，均在bash命令行下)。</p><h2>安装依赖软件</h2><h3>PHP</h3><p>主要安装php及其扩展</p><pre class="ql-syntax" spellcheck="false">sudo add-apt-repository ppa:ondrej/php  
sudo apt update  
sudo apt install openssl php7.2-common php7.2-mcrypt php7.2-cli php7.2-xml php7.2-mysql php7.2-gd php7.2-imap php7.2-intl php7.2-json php7.2-ldap php7.2-imagick php-ssh2 php7.2-recode php7.2-tidy php7.2-xmlrpc php7.2-mbstring php7.2-curl php7.2-redis php7.2-zip php7.2-sqlite3  
</pre><h3>Apache</h3><p>默认安装和配置就好，默认网站存放位置/var/www/html</p><pre class="ql-syntax" spellcheck="false">sudo apt install apache2 libapache2-mod-php7.2
</pre><h3>mariadb(mysql亦可)</h3><p>数据库服务，默认配置</p><pre class="ql-syntax" spellcheck="false">sudo apt install mariadb-server
</pre><p>配置root用户密码</p><pre class="ql-syntax" spellcheck="false">mysql  
UPDATE mysql.user SET password = PASSWORD('newpassword') WHERE USER = 'root';  
FLUSH PRIVILEGES;  
</pre><p>完成后重启数据库</p><pre class="ql-syntax" spellcheck="false">sudo service mysql restart
</pre><h3>Redis</h3><p>缓存服务，默认配置</p><pre class="ql-syntax" spellcheck="false">sudo apt install redis
</pre><h2>nextcloud安装</h2><p>安装nextcloud的方式有很多种，都是很简单的。</p><h3>一键安装脚本</h3><p>官网提供一键安装脚本：</p><p><a href="https://download.nextcloud.com/server/installer/setup-nextcloud.php" target="_blank" style="color: rgb(0, 136, 204);">https://download.nextcloud.com/server/installer/setup-nextcloud.php</a></p><p>创建文件夹</p><pre class="ql-syntax" spellcheck="false">sudo mkdir /var/www/nextcloud
</pre><p>修改权限</p><pre class="ql-syntax" spellcheck="false">sudo chown -R www-data:www-data /var/www/nextcloud
</pre><p>进入文件夹</p><pre class="ql-syntax" spellcheck="false">cd /var/www/nextcloud
</pre><p>下载脚本</p><pre class="ql-syntax" spellcheck="false">sudo -u www-data wget https://download.nextcloud.com/server/installer/setup-nextcloud.php
</pre><p>执行脚本</p><pre class="ql-syntax" spellcheck="false">sudo -u www-data php setup-nextcloud.php
</pre><p>等待下载安装完成，过程中会选择安装路径 按.选择当前(/var/www/nextcloud)即可。</p><p>配置apache主页</p><pre class="ql-syntax" spellcheck="false">sudo vim /etc/apache2/sites-enabled/000-default.conf
</pre><p>将其中的DocumentRoot的值改为/var/www/nextcloud</p><p>提醒:vim编辑器，非编辑状态hjkl控制上下左右，i进入编辑状态，esc推出编辑状态，非编辑状态下:wq保存退出，非编辑状态下:q!不保存退出，不了解的同学建议搜索vim相关快捷键和操作。</p><p>配置完成，重启apache</p><pre class="ql-syntax" spellcheck="false">sudo service apache2 restart
</pre><p>即可打开localhost，观察结果并进行后续操作。</p><h3>snap安装</h3><p>该安装方式不需要手动安装依赖软件</p><pre class="ql-syntax" spellcheck="false">sudo snap install nextcloud
</pre><p>等待安装结束即可打开localhost，观察结果并进行后续操作。</p><h3>其他</h3><p>手动安装和虚拟机安装以及docker方式在此不再赘述。</p><h2>nextcloud配置</h2><h3>安装</h3><p>如果软件包安装顺利，那么这时在win10下打开网页localhost，应该会出现首次运行的配置界面。</p><p>填入用户名密码，数据库选择mysql/mariadb，数据库地址localhost:3306,数据库名nextcloud。</p><p>选择数据存放位置，比如/home/lidemingzi/yunpan，在命令行创建目录并配置该目录权限</p><pre class="ql-syntax" spellcheck="false">sudo mkdir /home/lidemingzi/yunpan  
sudo chown -R www-data:www-data  /home/lidemingzi/yunpan  
sudo chmod -R 0770 /home/lidemingzi/yunpan  
</pre><p>回到网页，确认安装，等待安装结束就会进入nextcloud云盘界面</p><h3>优化</h3><p>进入程序目录，编辑配置文件</p><pre class="ql-syntax" spellcheck="false">cd /var/www/nextcloud
sudo vim config/config.php
</pre><p>在array格式的配置里，加入redis的配置</p><pre class="ql-syntax" spellcheck="false">'memcache.local' =&gt; '\\OC\\Memcache\\Redis',  
'redis' =&gt; array (                                       
    'host' =&gt; 'localhost',                      
    'port' =&gt; 6379,                             
),                                            
'memcache.locking' =&gt; '\\OC\\Memcache\\Redis',
</pre><p>配置apache，允许路由转发和设置header</p><pre class="ql-syntax" spellcheck="false">sudo cp /etc/apache2/mods-available/headers.load /etc/apache2/mods-enabled/headers.load  
sudo cp /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load   
</pre><p>开发apache配置文件，在VirtualHost内添加配置</p><pre class="ql-syntax" spellcheck="false">sudo vim /etc/apache2/sites-enabled/000-default.conf
&lt;Directory /var/www/nextcloud&gt;
    AllowOverride All
&lt;/Directory&gt;
</pre><p>编辑/var/www/nextcloud/.user.ini，修改值</p><pre class="ql-syntax" spellcheck="false">sudo vim /var/www/nextcloud/.user.ini
upload_max_filesize=16G
post_max_size=16G
memory_limit=513M
</pre><p>并新增</p><pre class="ql-syntax" spellcheck="false">opcache.enable=1
opcache.enable_cli=1
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.memory_consumption=128
opcache.save_comments=1
opcache.revalidate_freq=1
</pre><p>upload_max_filesize和post_max_size是配置上传文件最大限制。</p><p>复制一份到php的配置目录</p><pre class="ql-syntax" spellcheck="false">sudo cp .user.ini /etc/php/7.2/apache2/conf.d/user.ini
</pre><p>重启apache即可</p><h2>配置外网访问</h2><p>此处采用云服务器vps转发的方式</p><p>采用的是frps一款很方便的开源的局域网穿透工具</p><p><a href="https://github.com/fatedier/frp/releases" target="_blank" style="color: rgb(0, 136, 204);">https://github.com/fatedier/frp/releases</a></p><h3>VPS服务器端</h3><p>下载对应系统的release包并解压，修改frps.ini</p><pre class="ql-syntax" spellcheck="false">[common]
bind_port = 7000
vhost_http_port = 8080
</pre><p>配置成自启动，以ubuntu为例，新建配置文件</p><pre class="ql-syntax" spellcheck="false">sudo vim /lib/systemd/system/frps.service
</pre><p>写入以下内容</p><pre class="ql-syntax" spellcheck="false">[Unit]
Description=frps service
After=network.target syslog.target
Wants=network.target
[Service]
Type=simple
#启动服务的命令（此处写你的abc的实际安装目录）
ExecStart=/your/path/frps -c /your/path/frps.ini
[Install]
WantedBy=multi-user.target
</pre><p>配置完成后，可通过 "你的vps域名:8080" 方式访问你本地的nextcloud，当然也可以配置80端口，或者通过配置nginx等的端口转发功能把子域名的80端口转发到8080上。</p><p>以nginx为例，在配置文件中http节点内添加配置</p><pre class="ql-syntax" spellcheck="false">    server {
        listen       80;
        server_name  cloud.lideyuming.com;

        location / {
            proxy_pass   http://cloud.lideyuming.com:8080;
        }
    }
</pre><h3>本地电脑Win10</h3><p>下载windows的release包，解压至合适的目录，修改配置文件frpc.ini,x.x.x.x为你的vps地址或者域名</p><pre class="ql-syntax" spellcheck="false"># frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000

[web]
type = http
local_port = 80
custom_domains = www.你要绑定的域名.com
</pre><p>配置在windows下自启动</p><p><a href="https://github.com/kohsuke/winsw/releases" target="_blank" style="color: rgb(0, 136, 204);">https://github.com/kohsuke/winsw/releases</a>&nbsp;下载release包解压</p><p>拷贝winsw.exe(可能不叫这个名字)到frpc同目录，新建同名的winsw.xml文件，写入</p><pre class="ql-syntax" spellcheck="false">&lt;configuration&gt;
  
  &lt;!-- ID of the service. It should be unique accross the Windows system--&gt;
  &lt;id&gt;FRPC&lt;/id&gt;
  &lt;!-- Display name of the service --&gt;
  &lt;name&gt;frpc client (powered by WinSW)&lt;/name&gt;
  &lt;!-- Service description --&gt;
  &lt;description&gt;内网穿透工具&lt;/description&gt;
  
  &lt;!-- Path to the executable, which should be started --&gt;
  &lt;executable&gt;frpc.exe&lt;/executable&gt;
  &lt;arguments&gt;-c frpc.ini&lt;/arguments&gt;
  &lt;logmode&gt;reset&lt;/logmode&gt;

&lt;/configuration&gt;
</pre><p>打开windows的cmd，进入winsw的所在目录, 运行</p><pre class="ql-syntax" spellcheck="false">winsw.exe install
</pre><p>安装完成后，在任务管理器的服务标签，找到FRPC服务，并启动。</p><p>打开防火墙的80和相关端口</p><h3>本地电脑WSL</h3><p>修改配置文件</p><pre class="ql-syntax" spellcheck="false">sudo vim /var/www/nextcloud/config/config.php
</pre><p>在trusted_domains的配置项array中加入你绑定的域名(如果有的话)，重启apache</p><h2>数据迁移和备份</h2><h3>数据迁移</h3><p>不推荐直接在系统层面对文件进行操作。</p><p>如需将旧文件迁移进来，将文件移动到数据存放位置，比如/home/lidemingzi/yunpan/lidemingzi/files，然后进入安装目录执行nextcloud自带的扫描程序，比如：</p><pre class="ql-syntax" spellcheck="false">cd /var/www/nextcloud
sudo -u www-data php occ files:scan --all
</pre><h3>备份</h3><p>nextcloud商店有ftp支持插件，自身也支持webdav访问，在另一台电脑上使用GoodSync等程序定期备份即可。</p><h2>一些坑</h2><h3>自启动</h3><p>win10的WSL不能跟随系统启动，需要手动添加启动脚本</p><p>新建一个文本文件，改名为wslstartup.bat，里面写入如下内容</p><pre class="ql-syntax" spellcheck="false">powershell.exe -WindowStyle Hidden -c "bash /init.sh "
</pre><p>打开运行，输入shell:startup回车，打开windows启动文件夹，将创建的批处理脚本移动进去</p><p>在WSL命令行下，创建init文件，写入以下内容，123456替换为你的密码</p><pre class="ql-syntax" spellcheck="false">sudo vim /init.sh
#!/bin/bash
echo "123456" | sudo -S /usr/sbin/service mysql start
echo "123456" | sudo -S /usr/sbin/service apache2 start
echo "123456" | sudo -S /usr/sbin/service redis-server start
</pre><p>配置权限</p><pre class="ql-syntax" spellcheck="false">sudo chmod 755 /init.sh
sudo chown lidemingzi:lidemingzi /init.sh
</pre><h3>挂载的windows盘符的权限问题</h3><p>在WSL中，win10的c盘d盘，自动挂载在了/mnt/c /mnt/d下，但是这些文件和文件夹的权限都是1001并且无法通过chown和chmod更改，因此需要使用drvfsf方法重新挂载</p><pre class="ql-syntax" spellcheck="false">sudo umount /mnt/c 
sudo mount -t drvfs C: /mnt/c -o metadata,uid=1000,gid=1000,umask=22,fmask=11
</pre><p>为了方便，把如下脚本加入到/init.sh中，WSL启动时就执行</p><pre class="ql-syntax" spellcheck="false">echo "123456" | sudo -S /bin/umount /mnt/c
echo "123456" | sudo -S /bin/umount /mnt/d
echo "123456" | sudo -S /bin/mount -t drvfs C: /mnt/c -o metadata,uid=1000,gid=1000,umask=22,fmask=11
echo "123456" | sudo -S /bin/mount -t drvfs P: /mnt/d -o metadata,uid=1001,gid=1001,umask=22,fmask=11
</pre><h2>完成</h2><p>至此，nextcloud的搭建基本完成，nextcloud官网提供桌面和手机客户端，同时有很多插件可供选择，可以使其更好用。</p>