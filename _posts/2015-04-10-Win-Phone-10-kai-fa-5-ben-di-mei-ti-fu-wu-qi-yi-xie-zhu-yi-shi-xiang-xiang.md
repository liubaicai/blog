---
layout:     post
title:      "Win(Phone)10开发第(5)弹，本地媒体服务器的一些注意事项"
date:       2015-04-10 06:23:47 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

首先有个wp上的http服务器

<a href="http://wphttpserver.codeplex.com/">http://wphttpserver.codeplex.com/</a>

使用方式：
<pre class="lang:c# decode:true ">// create the http server
// http://www.liubaicai.net/archives/458            
HttpServer httpServer = new HttpServer("192.168.2.102");

// register an request handler which will handle the posted form data
httpServer.RegisterRequestHandler(new Regex("/sendSms"), request =&gt;
{
    // get the data send as form data
    FormDataContentProvider formDataProvider = request.Content as FormDataContentProvider;

    // read the data from the form
    string number = formDataProvider.FormData["number"];
    string message = formDataProvider.FormData["message"];

    // use the windows phone SMS api to send a SMS
    SmsComposeTask smsTask = new SmsComposeTask();
    smsTask.To = number;
    smsTask.Body = message;
    smsTask.Show();
    
    // tell the client, that everything went fine
    return new HttpResponse(HttpStatusCode.Ok);
});
</pre>
需要移植到win10uap上来，是很简单的。

我们可以使用这个服务器来做一个本地或者局域网的媒体播放器。

这里说几个需要注意的地方

1.读写媒体文件时，使用StorageFile类的OpenStreamForReadAsync之类的功能，直接将文件流与网络流做转化，而不要使用FileIO中的读写文件方法。

2.响应请求时，务必设置Content-Type才能被客户端播放器识别。根据需要，也可以添加其他Header。
<pre class="brush:csharp;">response.Headers.Add("Content-Type", "application/octet-stream");</pre>
3.返回媒体数据时，使用BinaryContextProvider而不是其他ContextProvider。