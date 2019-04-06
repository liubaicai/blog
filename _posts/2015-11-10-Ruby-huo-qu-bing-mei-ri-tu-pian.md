---
layout:     post
title:      "Ruby 获取bing每日图片"
date:       2015-11-10 04:17:00 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

xml解析，文件下载保存
<pre class="font:consolas lang:ruby decode:true ">require 'open-uri'
require 'nokogiri'

for i in 0..15
  uri = "http://cn.bing.com/hpimagearchive.aspx?idx=#{i}&amp;n=1"
  html_response = nil
  open(uri) do |http|
    html_response = http.read
  end
  doc = Nokogiri::XML(html_response)
  node = doc.xpath('//urlBase').text
  url = 'http://www.bing.com'+node+'_1920x1080.jpg'
  path = '\\image\\'
  temp = url.split('/')
  fullpath = path+temp[temp.length-1]
  if !File::exist?(fullpath)
    if !File::exist?(path)
      Dir::mkdir(path)
    end
    open(url) do |http|
      img_response = http.read
      img_file = File.new(fullpath, 'wb')
      img_file.write img_response
      img_file.close
    end
  end
end
puts 'down'</pre>
&nbsp;