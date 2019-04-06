---
layout:     post
title:      "Nginx & Passenger部署nodejs时的配置"
date:       2017-05-10 08:55:35 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre>server {
    listen 80;
    server_name yourserver.com;

    # Tell Nginx and Passenger where your app's 'public' directory is
    root /var/www/myapp/code/public;

    # Turn on Passenger
    passenger_enabled on;
    # Tell Passenger that your app is a Node.js app
    passenger_app_type node;
    passenger_startup_file app.js;
}<br></pre>