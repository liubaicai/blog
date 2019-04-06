---
layout:     post
title:      "从零开始部署一个Rails网站"
date:       2016-10-28 09:15:49 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p></p><p>项目做得差不多，找老板要了新服务器，把部署过程写下来。&lt;/p><p>CentOS 6.5</p><blockquote><p>1. yum update 更新系统</p></blockquote><blockquote>2. 安装并更新git版本</blockquote><p>自带的旧版本可能会无法更新某些版本库的内容(比如coding.net)</p><p>可以通过yum安装git，或者去github下载编译安装</p><p><a href="https://github.com/git/git/archive/v2.10.1.tar.gz">https://github.com/git/git/archive/v2.10.1.tar.gz</a><br></p><p><span style="color: rgb(241, 78, 50); font-family: Courier, monospace;">git clone https://github.com/git/git</span><br></p><br><blockquote>3. 安装ruby</blockquote><p>安装ruby有多种方式，yum安装版本较低，此外还可以采用源码安装，rvm安装等等。&lt;/p><p>这里用了一个叫ruby-install的安装方式，先编译安装这个工具，然后可以方便的管理ruby版本。&lt;/p><p><a href="https://github.com/postmodern/ruby-install">https://github.com/postmodern/ruby-install</a></p><p>安装完设置下gem源 <a href="http://www.liubaicai.net/articles/489" target="_blank">教程</a></p><p>然后gem install passenger<br></p><blockquote> 4. 安装nginx+passenger</blockquote><pre>passenger-install-nginx-module<br></pre><pre>sudo yum install -y epel-release yum-utils
sudo yum-config-manager --enable epel
sudo yum install -y pygpgme curl
sudo curl --fail -sSLo /etc/yum.repos.d/passenger.repo https://oss-binaries.phusionpassenger.com/yum/definitions/el-passenger.repo
sudo yum install -y nginx passenger</pre><p>安装完后找到&nbsp;</p><pre>/etc/nginx/conf.d/passenger.conf<br></pre><p>将下面三行注释去掉，并且修改</p><pre>passenger_root /some-filename/locations.ini;
passenger_ruby /usr/bin/ruby;
passenger_instance_registry_dir /var/run/passenger-instreg;<br></pre><p>passenger_ruby设置为第三步安装的ruby路径</p><p>passenger_root可以用 ‘passenger-config --root’命令查询，选择第三步gem安装的passenger路径下的</p><p>passenger_instance_registry_dir路径默认可以不用改，但是路径不存在的话要新建下，也可以改为/tmp之类的&lt;/p><p>然后重启服务</p><pre>sudo service nginx restart<br></pre><p><a href="https://www.phusionpassenger.com/library/install/nginx/install/oss/el6/" target="_blank">↑详细步骤&lt;/a><br></p><blockquote>5. 安装mysql</blockquote><p>可以通过yum直接安装，之后设置用户名密码</p><p>根据项目中的配置文件，先建立数据库，注意编码比如utf8</p><pre>CREATE DATABASE `test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci<br></pre><p>并安装 yum install mysql-devel</p><blockquote>6. 安装sqlite3</blockquote><p>测试和开发环境可能用到&lt;/p><p>并安装&amp;nbsp;yum install&nbsp;sqlite3-devel<br></p><blockquote>7. 安装jdk并配置环境变量&lt;/blockquote><p>网上很多教程</p><blockquote>8. 安装nodejs</blockquote><p>项目可选js引擎之一</p><blockquote>9. 安装imagemagick</blockquote><p>验证码图片生成&lt;/p><blockquote>10.&nbsp;<span style="color: rgb(51, 51, 51);">elasticsearch全文搜索引擎</span></blockquote><p><span style="color: rgb(51, 51, 51);">可以参考这里&lt;/span></p><p><a href="http://www.liubaicai.net/articles/748" target="_blank">http://www.liubaicai.net/articles/748</a><font color="#333333"></font></p><blockquote><font color="#333333">11. 进行最后的设置</font></blockquote><p><font color="#333333">找到nginx的配置文件，比如在‘/etc/nginx/nginx.conf</font><span style="color: rgb(51, 51, 51);">’&lt;/span></p><p><font color="#333333">添加设置</font></p><pre>server {
    listen 80;
    server_name yourserver.com;

    # rails项目的public目录位置
    root /var/www/myapp/code/public;

    # 开启 Passenger
    passenger_enabled on;
}<br></pre><p><a href="https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/ownserver/nginx/oss/el6/deploy_app.html" target="_blank">↑详细步骤&lt;/a><font color="#333333"><br></font></p><p><font color="#333333">项目中使用 ‘&lt;/font><span style="color: rgb(54, 46, 43); font-family: "Microsoft YaHei"; font-size: 12px; font-weight: bold;">rake secret RAILS_ENV=production</span><span style="color: rgb(51, 51, 51);">’生成&lt;/span><font color="#333333">secret_key_base，设置到环境变量或者项目中</font></p><pre><font color="#333333">gem install bundler<br></font><font color="#333333">bundle install</font></pre><p><font color="#333333">根据报错信息，会提示你还有哪些依赖没有安装&lt;/font></p><pre><font color="#333333">rake db:migrate VERSION=0 RAILS_ENV="production"<br></font><font color="#333333">rake db:migrate</font><span style="color: rgb(51, 51, 51);">&nbsp;</span><span style="color: rgb(51, 51, 51);">RAILS_ENV="production"<br></span><font color="#333333">rake db:seed production</font></pre><p><font color="#333333">然后愉快的&lt;/font></p><pre><font color="#333333">sudo service nginx restart</font></pre><p><font color="#333333">如果错误log提示passenger多个版本冲突</font></p><p><font color="#333333">需要yum remove passenger，只保留gem安装的即可&lt;/font></p><p><font color="#333333">就可以愉快的访问了&lt;br></font><br></p><p></p>