---
layout:     post
title:      "Ruby on Sinatra:表单数据的发送和接收"
date:       2015-11-22 14:52:59 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

比如有一个添加app的功能，它的页面haml是这样的
<pre class="lang:xhtml decode:true">!!! XML
%html
  %head
    %title PromoteAppManager
  %body{:bgcolor =&gt; "white"}
    %h1{:style =&gt; "font-family:Calibri,Arial,YaHei"} New
    %hr
    %form{:align =&gt; "center",:name =&gt; "input",:action =&gt; "/promoteapp/manager/new",:method =&gt; "post"}
      %table
        %tr
          %td AppId:
          %td
            %input{:type =&gt; "text",:name =&gt; "appid"}
        %tr
          %td Title:
          %td
            %input{:type =&gt; "text",:name =&gt; "title"}
        %tr
          %td Content:
          %td
            %input{:type =&gt; "text",:name =&gt; "content"}
        %tr
          %td Logo:
          %td
            %input{:type =&gt; "text",:name =&gt; "logo"}
        %tr
          %td Status:
          %td
            %input{:type =&gt; "text",:name =&gt; "_status"}
        %tr
          %td
          %td
            %input{:align =&gt; "left",:type =&gt; "submit",:value =&gt; "Submit"}
    %hr</pre>
当点击Submit按钮时候，通过form表单提交到/promoteapp/manager/new，指定post方式。

<img class="alignnone wp-image-589 size-full" src="http://www.liubaicai.net/wp-content/uploads/2015/11/QQ截图20151123094542-e1448243350671.png" alt="QQ截图20151123094542" width="325" height="334" />

路由接收处：
<pre class="lang:ruby decode:true ">get '/promoteapp/manager/new' do
	haml :promoteappmanagernew
end

post '/promoteapp/manager/new' do
  postdata = URI.decode_www_form_component(request.body.read)
  params = URI.decode_www_form(postdata)
  model = PromoteApp.new
  model.appid = params.assoc("appid").last
  model.title = params.assoc("title").last
  model.content = params.assoc("content").last
  model.logo = params.assoc("logo").last
  model._status = params.assoc("_status").last
  model.save
  redirect to('/promoteapp/manager')
end</pre>
URI.decode_www_form_component：url解码

URI.decode_www_form ：将form表单参数转成数组形式

取到数据后，通过ActiveRecord方式保存数据后

通过redirect to('/promoteapp/manager')重定位到某页面

于是乎就完成了一次表单提交和处理的流程