---
layout: post
title: Ubuntu18.04Server配置
date: 2019-04-07 23:11:18 +0800
tags:
     - 服务器
     - ubuntu
author: baicai
catalog: true
---

# Ubuntu 18.04 Server 配置

## 网络

修改文件`/etc/netplan/50-cloud-init.yaml`, 配置如下:
```
# 192.168.15.28 网络配置示例
network:
    ethernets:
        eno1:
            addresses:
            - 192.168.15.28/20
            dhcp4: false
            gateway4: 192.168.0.1
            nameservers:
                addresses:
                    - 223.5.5.5
                    - 223.6.6.6
                    - 119.29.29.29
                    - 114.114.114.114
                    - 114.114.115.115
            optional: true
    version: 2
```

## Docker

```
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo apt-get install docker-compose
```
阿里镜像版:
```
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | \
    sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo apt-get install docker-compose
```

### docker安装mongo

```
sudo mkdir -p /data/mongodb
sudo docker pull mongo:3.6
sudo docker run \
    --name mongodb-server \#名称
    --restart always \#自动启动
    -v /data/mongodb:/data/db \#映射本地路径
    -p 27017:27017 \#绑定本地端口
    -d \#后台运行容器，并返回容器ID
    mongo:3.6 #启动镜像名
sudo docker exec -it mongodb-server bash #进入mongo容器
=> root@e2f68f3349ab:/$ mongo #打开mongo客户端
        > show dbs; #测试是否启动成功
        admin   0.000GB
        config  0.000GB
        local   0.000GB
```
安装客户端工具
```
sudo apt-get install mongodb-clients
```

### docker安装postgres

```
sudo docker pull postgres:9.4
sudo docker run \
    --name postgres-server \#名称
    --restart always \#自动启动
    -e POSTGRES_USER=srv \#环境变量，账号
    -e POSTGRES_PASSWORD=pass \#环境变量，密码
    -v /data/postgres:/var/lib/postgresql/data \#映射本地路径
    -p 5432:5432 \#绑定本地端口
    -d \#后台运行容器，并返回容器ID
    postgres:9.4 #启动镜像名
sudo docker exec -it postgres-server bash #进入postgres容器
=> root@c3e25b8d9442:/$ psql -U srv  #打开pg客户端
        psql (9.4.21)
        Type "help" for help.
        srv=$ \l #测试是否启动成功
                                     List of databases
   Name    | Owner | Encoding |  Collate   |   Ctype    | Access privileges
-----------+-------+----------+------------+------------+-------------------
 postgres  | srv   | UTF8     | en_US.utf8 | en_US.utf8 |
 srv       | srv   | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | srv   | UTF8     | en_US.utf8 | en_US.utf8 | =c/srv           +
           |       |          |            |            | srv=CTc/srv
 template1 | srv   | UTF8     | en_US.utf8 | en_US.utf8 | =c/srv           +
           |       |          |            |            | srv=CTc/srv
(4 rows)
```
安装客户端工具
```
sudo apt-get install postgresql-client
brew install libpq
```

### docker安装adminer
adminer是一个基于php的可视化数据库管理工具
```
sudo docker pull dehy/adminer
sudo docker run \
    --name db-adminer \
    --restart always \
    --link postgres-server \
    --link mongodb-server \
    -p 8800:80 \
    -d \
    dehy/adminer
```
打开浏览器 xx.xx.xx.xx:8800
服务器填写postgres-server
选择数据库系统，填入用户名密码，即可登录

### docker安装redis
```
sudo docker pull redis
sudo docker run \
    --name redis-server \
    --restart always \
    -p 6379:6379 \
    -d \
    redis
```
### docker安装mysql
```
sudo docker pull mysql:5.7.25
sudo docker run \
    --name mysql-server \
    --restart always \
    -e MYSQL_ROOT_PASSWORD=pass \
    -v /data/mysql/data:/var/lib/mysql \
    -p 3306:3306 \
    -d \
    mysql:5.7.25
```
### docker安装phabricator
```
sudo docker pull redpointgames/phabricator
sudo docker run \
    --name phabricator \
    --restart always \
    --env MYSQL_HOST=192.168.15.28 \
    --env MYSQL_USER=root \
    --env MYSQL_PASS=pass \
    --env PHABRICATOR_STORAGE_TYPE=disk \
    --env PHABRICATOR_STORAGE_PATH=/files \
    --env PHABRICATOR_REPOSITORY_PATH=/repos \
    -v /data/phabricator/repos:/repos \
    -v /data/phabricator/files:/files \
    -p 7080:80 \
    redpointgames/phabricator
sudo docker run \
    --name phabricator \
    --restart always \
    --env MYSQL_HOST=192.168.15.28 \
    --env MYSQL_USER=root \
    --env MYSQL_PASS=pass \
    --env PHABRICATOR_REPOSITORY_PATH=/repos \
    -v /data/phabricator/repos:/repos \
    -p 7080:80 \
    redpointgames/phabricator
```

### docker安装elasticsearch和kibana

```
sudo docker network create es-network
sudo docker pull elasticsearch:6.6.0
sudo docker pull kibana:6.6.0
sudo docker run \
    -d \
    --restart always \
    --name elasticsearch \
    --net es-network \
    -p 9200:9200 \
    -p 9300:9300 \
    -e "discovery.type=single-node" \
    elasticsearch:6.6.0
sudo docker run \
    -d \
    --restart always \
    --name elasticsearch-kibana \
    --net es-network \
    -p 5601:5601 \
    kibana:6.6.0
curl 'localhost:9200' #查看es是否安装成功
open 'localhost:5601' #查看kibana是否安装成功
```
```
$ curl 'localhost:9200'
{
  "name" : "NLCHC5s",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "UDT-0fnpQzKkJBQsY9XaKg",
  "version" : {
    "number" : "6.6.0",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "a9861f4",
    "build_date" : "2019-01-24T11:27:09.439740Z",
    "build_snapshot" : false,
    "lucene_version" : "7.6.0",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

## 开发环境

### ZSH FISH

```
sudo apt-get install zsh fish
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
curl -L https://get.oh-my.fish | fish
```

### NVM

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source $NVM_DIR/nvm.sh
nvm install 10
npm install pm2 -g
pm2 startup
```
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install --no-install-recommends yarn
```
配置 nvm 从淘宝安装 node:

`export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node/`
 
使用 nvm 安装 nodejs 最新 lts 版本, 并在用户根目录添加 `.npmrc` 文件, 添加内容如下:

```
registry = https://registry.npm.taobao.org
disturl = https://npm.taobao.org/dist  # node-gyp 编译依赖的 node 源码镜像
chromedriver_cdnurl = https://npm.taobao.org/mirrors/chromedriver
operadriver_cdnurl = https://npm.taobao.org/dist/operadriver
phantomjs_cdnurl = https://npm.taobao.org/dist/phantomjs
fse_binary_host_mirror = https://npm.taobao.org/mirrors/fsevents
sass_binary_site = https://npm.taobao.org/mirrors/node-sass
electron_mirror = https://npm.taobao.org/mirrors/electron
```

### RVM

```
sudo apt-get install curl gpg2
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable
rvm install 2.6
```

## 使用国内镜像源

添加国内的镜像源可以提升 ubuntu 更新/安装软件的速度, 编辑`/etc/apt/sources.list`文件, 在文件顶部添加所选的源(编辑之前请先备份该文件). 目前提供 ubuntu 18.04 版本镜像源的有:

### 中科大

```
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

### 阿里

```
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

### 163

```
deb http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse
```

### 清华

```
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```
