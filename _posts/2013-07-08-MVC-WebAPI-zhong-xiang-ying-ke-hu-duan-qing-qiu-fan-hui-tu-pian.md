---
layout:     post
title:      "MVC WebAPI中响应客户端请求返回图片"
date:       2013-07-08 05:27:53 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="brush:csharp;first-line:1;pad-line-numbers:true;highlight:null;collapse:false;">
        // GET api/values 
        public HttpResponseMessage Get() 
        { 
            Image img = GetImage(); 
            MemoryStream ms = new MemoryStream(); 
            img.Save(ms, System.Drawing.Imaging.ImageFormat.Png); 
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK); 
            result.Content = new ByteArrayContent(ms.ToArray()); 
            //Inline是直接显示,attachment作为附件下载 
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg"); 
            result.Content.Headers.ContentDisposition = 
                new ContentDispositionHeaderValue("Inline") { FileName = "123.jpg" }; 
            return result; 
        } 
        private Image GetImage() 
        { 
            Image image = Bitmap.FromFile("E:\\123.jpg"); 
            return image; 
        }
</pre>