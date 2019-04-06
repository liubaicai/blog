---
layout:     post
title:      "Nginx打开并美化文件目录列表功能"
date:       2015-11-20 07:01:30 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

nginx有目录浏览功能，可以直接显示目录下的文件，但nginx默认是关闭的，如果需要此功能，需要我们手动的打开该功能。
<h4 id="title-0">示例配置文件</h4>
<pre class="brush:bash;">server {
listen 80;
charset utf-8;
server_name localhost;
root /www/web/default;
 
location / {
autoindex on;#开启该功能
autoindex_exact_size off;#显示出文件的确切大小
autoindex_localtime on;#显示为本地服务器时间
}
}</pre>
其中server name localhost中的localhost改为实际的主机名，而root /www/web/default 中的 /www/web/default改为实际的web目录。

文件展示是完成了，美中不足的是它展现的页面过于原始，不是非常美观。下面介绍一款nginx插件-FancyIndex，可以通过引入自定义HTML内容来美化文件目录列表页面。
<h4 id="title-0">安装FancyIndex插件</h4>
FancyIndex的安装方法网上有很多教程，大多数是在编译nginx时，增加这个插件。
但是由于我们使用apt-get install nginx安装，通过安装nginx-extras即可安装FancyIndex插件。
<pre class="brush:bash;">apt-get install nginx-extras</pre>
<h4 id="title-1">配置文件修改</h4>
<pre class="brush:bash;">server {
listen 80;
charset utf-8;
server_name file.liubaicai.net;
root /var/www/file;
 
location / {
autoindex on;
autoindex_exact_size off;
autoindex_localtime on;
fancyindex on;             
fancyindex_exact_size off;
fancyindex_ignore "header.html" "footer.html";#列表屏蔽这两个文件
fancyindex_header /header.html;
fancyindex_footer /footer.html;
}
}</pre>
在web目录下（本文为/var/www/file）建立两个文件：header.html和footer.html

header.html内容为：
<pre class="lang:xhtml decode:true ">&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;&lt;meta http-equiv="content-type" content="text/html; charset=utf-8"/&gt;
&lt;style type="text/css" media="screen"&gt;
body,html {background:#fff;font-family: "Lucida Grande",Calibri,Arial;font-size: 13pt;color: #333;background: #f8f8f8;}
tr.e {background:#f4f4f4;}
th,td {padding:0.2em 0.5em;}
th {text-align:left;font-weight:bold;background:#eee;border-bottom:1px solid #aaa;}
#top1 {width:80%; font-size:28px; margin: 0 auto 5px auto;}
#top2 {width:80%; font-size:18px; margin: 0 auto 5px auto;}
#footer {width:80%;margin: 0 auto; padding: 10pt 0;font-size: 10pt;text-align:center;}
#footer a {font-size: 14px; font-weight: normal; text-decoration: underline;}
#list {border:1px solid #aaa;width:80%;margin: 0 auto;padding: 0;}
a {color: #333;font-size: 15pt;font-weight: bold;text-decoration: none;}
a:hover {color: #000;}
#readme {padding:0;margin:1em 0;border:none;width:100%;}
&lt;/style&gt;
&lt;script type="text/javascript"&gt;// &lt;![CDATA[function ngx_onload(){var f=document.getElementById('readme');if(!(f&amp;&amp;f.contentDocument))return;f.style.height=f.contentDocument.body.offsetHeight+'px';f.contentDocument.body.style.padding='0';f.contentDocument.body.style.margin='0';}// ]]&gt;&lt;/script&gt;
&lt;title&gt;FileCenter&lt;/title&gt;
&lt;/head&gt;
&lt;body onload="ngx_onload()"&gt;
&lt;h1 id="top1"&gt;文件目录列表&lt;/h1&gt;
&lt;h1 id="top2"&gt;Directory listing of</pre>
footer.html内容为：
<pre class="lang:xhtml decode:true ">&lt;table id="footer" cellpadding="0" cellspacing="1"&gt;
&lt;thead&gt;&lt;tr&gt;&lt;td colspan="3"&gt;PowerByLiubaicai&lt;/td&gt;&lt;/tr&gt;&lt;thead&gt;
&lt;/table&gt;&lt;/body&gt;&lt;/html&gt;</pre>
于是大功告成~

<img class="alignnone wp-image-591 size-full" src="http://www.liubaicai.net/wp-content/uploads/2015/11/QQ截图20151123120731.png" alt="QQ截图20151123120731" width="903" height="431" />

==&gt;<a href="http://www.tennfy.com/2489.html">原文</a>