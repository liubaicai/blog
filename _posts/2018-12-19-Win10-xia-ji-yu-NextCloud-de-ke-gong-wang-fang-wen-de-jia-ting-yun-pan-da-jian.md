---
layout:     post
title:      Win10下基于NextCloud的可公网访问的家庭云盘搭建
date:       2018-12-19 07:51:11 UTC
author:     baicai
catalog: true
tags:   存档
---

文字版，记录和分享一下过程和经历的坑。  
## 操作系统
硬件配置 i5-4200U 双核四线程 1.4GHz的弱鸡CPU，4G内存。  
用bootcamp安装了最新版的win10，build 1809。  
控制面板\程序\启用或关闭Window功能，打开“适用与Linux的Windows子系统”,以下简称“WSL”。  
打开自带应用商店，搜索ubuntu，下载安装，当前版本为Ubuntu 18.04.  
打开cmd命令行，输入bash即可进入WSL子系统(以下操作除非特殊说明，均在bash命令行下)。
## 安装依赖软件
### PHP
主要安装php及其扩展  
```
sudo add-apt-repository ppa:ondrej/php  
sudo apt update  
sudo apt install openssl php7.2-common php7.2-cli php7.2-xml php7.2-mysql php7.2-gd php7.2-imap php7.2-intl php7.2-json php7.2-ldap php-imagick php-ssh2 php7.2-recode php7.2-tidy php7.2-xmlrpc php7.2-mbstring php7.2-curl php-redis php7.2-zip php7.2-sqlite3  
```
### Apache  
默认安装和配置就好，默认网站存放位置/var/www/html  
```
sudo apt install apache2 libapache2-mod-php7.2
```  
### mariadb(mysql亦可)  
数据库服务，默认配置  
```
sudo apt install mariadb-server
```  
配置root用户密码  
```
mysql  
UPDATE mysql.user SET password = PASSWORD('newpassword') WHERE USER = 'root';  
FLUSH PRIVILEGES;  
```
完成后重启数据库  
```
sudo service mysql restart
```
### Redis  
缓存服务，默认配置  
```
sudo apt install redis
```
## nextcloud安装
安装nextcloud的方式有很多种，都是很简单的。  
### 一键安装脚本
官网提供一键安装脚本：  
https://download.nextcloud.com/server/installer/setup-nextcloud.php  
创建文件夹  
```
sudo mkdir /var/www/nextcloud
```  
修改权限  
```
sudo chown -R www-data:www-data /var/www/nextcloud
```  
进入文件夹  
```
cd /var/www/nextcloud
```  
下载脚本  
```
sudo -u www-data wget https://download.nextcloud.com/server/installer/setup-nextcloud.php
```  
执行脚本  
```
sudo -u www-data php setup-nextcloud.php
```  
等待下载安装完成，过程中会选择安装路径 按.选择当前(/var/www/nextcloud)即可。  
配置apache主页  
```
sudo vim /etc/apache2/sites-enabled/000-default.conf
``` 
将其中的DocumentRoot的值改为/var/www/nextcloud  
提醒:vim编辑器，非编辑状态hjkl控制上下左右，i进入编辑状态，esc推出编辑状态，非编辑状态下:wq保存退出，非编辑状态下:q!不保存退出，不了解的同学建议搜索vim相关快捷键和操作。  
配置完成，重启apache  
```
sudo service apache2 restart
```
即可打开localhost，观察结果并进行后续操作。  
### snap安装
该安装方式不需要手动安装依赖软件  
```
sudo snap install nextcloud
```
等待安装结束即可打开localhost，观察结果并进行后续操作。  
### 其他
手动安装和虚拟机安装以及docker方式在此不再赘述。  
## nextcloud配置
### 安装
如果软件包安装顺利，那么这时在win10下打开网页localhost，应该会出现首次运行的配置界面。  
填入用户名密码，数据库选择mysql/mariadb，数据库地址localhost:3306,数据库名nextcloud。  
选择数据存放位置，比如/home/lidemingzi/yunpan，在命令行创建目录并配置该目录权限  
```
sudo mkdir /home/lidemingzi/yunpan  
sudo chown -R www-data:www-data  /home/lidemingzi/yunpan  
sudo chmod -R 0770 /home/lidemingzi/yunpan  
```
回到网页，确认安装，等待安装结束就会进入nextcloud云盘界面  
### 优化
进入程序目录，编辑配置文件  
```
cd /var/www/nextcloud
sudo vim config/config.php
```  
在array格式的配置里，加入redis的配置  
```
'memcache.local' => '\\OC\\Memcache\\Redis',  
'redis' => array (                                       
    'host' => 'localhost',                      
    'port' => 6379,                             
),                                            
'memcache.locking' => '\\OC\\Memcache\\Redis',
```
配置apache，允许路由转发和设置header  
```
sudo cp /etc/apache2/mods-available/headers.load /etc/apache2/mods-enabled/headers.load  
sudo cp /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load   
```
开发apache配置文件，在VirtualHost内添加配置  
```
sudo vim /etc/apache2/sites-enabled/000-default.conf
```
```
<Directory /var/www/nextcloud>
    AllowOverride All
</Directory>
```
编辑/var/www/nextcloud/.user.ini，修改值  
```
sudo vim /var/www/nextcloud/.user.ini
```
```
upload_max_filesize=16G
post_max_size=16G
memory_limit=513M
```
并新增  
```
opcache.enable=1
opcache.enable_cli=1
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.memory_consumption=128
opcache.save_comments=1
opcache.revalidate_freq=1
```
upload_max_filesize和post_max_size是配置上传文件最大限制。
复制一份到php的配置目录  
```
sudo cp .user.ini /etc/php/7.2/apache2/conf.d/user.ini
```
重启apache即可  
## 配置外网访问
此处采用云服务器vps转发的方式
采用的是frps一款很方便的开源的局域网穿透工具 
https://github.com/fatedier/frp/releases  
### VPS服务器端    
下载对应系统的release包并解压，修改frps.ini
```
[common]
bind_port = 7000
vhost_http_port = 8080
```
配置成自启动，以ubuntu为例，新建配置文件  
```
sudo vim /lib/systemd/system/frps.service
```
写入以下内容  
```
[Unit]
Description=frps service
After=network.target syslog.target
Wants=network.target
[Service]
Type=simple
#启动服务的命令（此处写你的abc的实际安装目录）
ExecStart=/your/path/frps -c /your/path/frps.ini
[Install]
WantedBy=multi-user.target
```
配置完成后，可通过 "你的vps域名:8080" 方式访问你本地的nextcloud，当然也可以配置80端口，或者通过配置nginx等的端口转发功能把子域名的80端口转发到8080上。
以nginx为例，在配置文件中http节点内添加配置
```
    server {
        listen       80;
        server_name  cloud.lideyuming.com;

        location / {
            proxy_pass   http://cloud.lideyuming.com:8080;
        }
    }
```
### 本地电脑Win10
下载windows的release包，解压至合适的目录，修改配置文件frpc.ini,x.x.x.x为你的vps地址或者域名  
```
# frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000

[web]
type = http
local_port = 80
custom_domains = www.你要绑定的域名.com
```
配置在windows下自启动  
https://github.com/kohsuke/winsw/releases 下载release包解压  
拷贝winsw.exe(可能不叫这个名字)到frpc同目录，新建同名的winsw.xml文件，写入  
```
<configuration>
  
  <!-- ID of the service. It should be unique accross the Windows system-->
  <id>FRPC</id>
  <!-- Display name of the service -->
  <name>frpc client (powered by WinSW)</name>
  <!-- Service description -->
  <description>内网穿透工具</description>
  
  <!-- Path to the executable, which should be started -->
  <executable>frpc.exe</executable>
  <arguments>-c frpc.ini</arguments>
  <logmode>reset</logmode>

</configuration>
```
打开windows的cmd，进入winsw的所在目录, 运行  
```
winsw.exe install
```  
安装完成后，在任务管理器的服务标签，找到FRPC服务，并启动。  
 
打开防火墙的80和相关端口
### 本地电脑WSL
修改配置文件
```
sudo vim /var/www/nextcloud/config/config.php
```
在trusted_domains的配置项array中加入你绑定的域名(如果有的话)，重启apache
## 数据迁移和备份
### 数据迁移
不推荐直接在系统层面对文件进行操作。  
如需将旧文件迁移进来，将文件移动到数据存放位置，比如/home/lidemingzi/yunpan/lidemingzi/files，然后进入安装目录执行nextcloud自带的扫描程序，比如：
```
cd /var/www/nextcloud
sudo -u www-data php occ files:scan --all
```
### 备份
nextcloud商店有ftp支持插件，自身也支持webdav访问，在另一台电脑上使用GoodSync等程序定期备份即可。
## 一些坑
### 自启动
win10的WSL不能跟随系统启动，需要手动添加启动脚本  
新建一个文本文件，改名为wslstartup.bat，里面写入如下内容  
```
powershell.exe -WindowStyle Hidden -c "bash /init.sh "
```
打开运行，输入shell:startup回车，打开windows启动文件夹，将创建的批处理脚本移动进去  
在WSL命令行下，创建init文件，写入以下内容，123456替换为你的密码  
```
sudo vim /init.sh
```
```
#!/bin/bash
echo "123456" | sudo -S /usr/sbin/service mysql start
echo "123456" | sudo -S /usr/sbin/service apache2 start
echo "123456" | sudo -S /usr/sbin/service redis-server start
```
配置权限  
```
sudo chmod 755 /init.sh
sudo chown lidemingzi:lidemingzi /init.sh
```
### 挂载的windows盘符的权限问题
在WSL中，win10的c盘d盘，自动挂载在了/mnt/c /mnt/d下，但是这些文件和文件夹的权限都是1001并且无法通过chown和chmod更改，因此需要使用drvfsf方法重新挂载  
```
sudo umount /mnt/c 
sudo mount -t drvfs C: /mnt/c -o metadata,uid=1000,gid=1000,umask=22,fmask=11
```
为了方便，把如下脚本加入到/init.sh中，WSL启动时就执行  
```
echo "123456" | sudo -S /bin/umount /mnt/c
echo "123456" | sudo -S /bin/umount /mnt/d
echo "123456" | sudo -S /bin/mount -t drvfs C: /mnt/c -o metadata,uid=1000,gid=1000,umask=22,fmask=11
echo "123456" | sudo -S /bin/mount -t drvfs P: /mnt/d -o metadata,uid=1001,gid=1001,umask=22,fmask=11
```
## 完成
至此，nextcloud的搭建基本完成，nextcloud官网提供桌面和手机客户端，同时有很多插件可供选择，可以使其更好用。  