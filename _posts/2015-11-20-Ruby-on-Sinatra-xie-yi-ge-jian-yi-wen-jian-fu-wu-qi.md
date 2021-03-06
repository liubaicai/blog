---
layout:     post
title:      "Ruby on Sinatra:写一个简易文件服务器"
date:       2015-11-20 15:06:38 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

用ruby写了个文件服务器，实现简易的文件和文件夹浏览、下载的功能，主要代码如下
<pre class="lang:ruby decode:true " title="路由处理部分">get '/*' do
  rootpath = "/home/baicai/"
  p = params["splat"][0]
  if p=='' or p==nil
    @currentpath = rootpath
  else
    @currentpath = rootpath+p+'/'
  end
  if File.directory? @currentpath
    files = Dir.entries @currentpath
    r_file = Array.new
    r_dir = Array.new
    files.each do |file|
      childpath = @currentpath+file
      childname = ''
      if p=='' or p==nil
        childname = file
      else
        childname = p+'/'+file
      end
      if file != '.' and file != '..'
        if File.directory? childpath
          r_dir.push Hash[:mtime =&gt; File.mtime(childpath), :size =&gt; '-', :filename =&gt; file+'/', :url =&gt; 'http://192.168.1.151:8001/'+childname]
        else
          r_file.push Hash[:mtime =&gt; File.mtime(childpath), :size =&gt; File.size(childpath), :filename =&gt; file, :url =&gt; 'http://192.168.1.151:8001/'+childname]
        end
      end
    end
    r_dir.sort! { |x, y| x[:filename] &lt;=&gt; y[:filename] }
    r_file.sort! { |x, y| x[:filename] &lt;=&gt; y[:filename] }
    @dirfiles = r_dir
    r_file.each do |r|
      @dirfiles.push r
    end
    @pagetitle = @currentpath[12, @currentpath.length]
    haml IO.read("views/filebrowser.haml")
  else
    content_type 'application/octet-stream'
    IO.read(@currentpath.chop!)
  end
end</pre>
haml文件如下
<pre class="wrap:true lang:xhtml decode:true ">!!! XML
%html
  %head
    %title File Server
  %body{:bgcolor =&gt; "white"}
    %h1{:style =&gt; "font-family:Calibri,Arial,Microsoft YaHei"}= @pagetitle
    %hr
    %table{:border =&gt; "0"}
      %tr
        %th{:align =&gt; "left"} 文件名
        %th{:width =&gt; "20"}
        %th{:align =&gt; "left"} 修改时间
        %th{:width =&gt; "20"}
        %th{:align =&gt; "right"} 大小
      -@dirfiles.each do |dirfile|
        %tr{:style =&gt; "font-family:Calibri,Arial,Microsoft YaHei;font-size:20px"}
          %td
            %a{:href =&gt; dirfile[:url]}= dirfile[:filename]
          %td
          %td= dirfile[:mtime].strftime("%Y-%m-%d %H:%M:%S")
          %td
          %td= dirfile[:size]
    %hr</pre>
效果如图：

<a href="http://www.liubaicai.net/wp-content/uploads/2015/11/QQ截图20151120230539.png"><img class="alignnone wp-image-574 size-full" src="http://www.liubaicai.net/wp-content/uploads/2015/11/QQ截图20151120230539.png" alt="QQ截图20151120230539" width="620" height="480" /></a>