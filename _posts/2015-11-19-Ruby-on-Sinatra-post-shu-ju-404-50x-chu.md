---
layout:     post
title:      "Ruby on Sinatra:post数据和404/50x处理"
date:       2015-11-19 01:57:13 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

添加一个post方法的接口，只需要将路由处的方法修改为post即可
<pre class="lang:ruby decode:true">post '/' do
	data = json.parse request.body.read
	Comments.commit data['username'],data['content']
end</pre>
request.body即是该次请求的数据，根据数据格式做相应处理后，即可取到相应的值

添加错误处理也很简单
<pre class="lang:ruby decode:true">not_found do
	'404'
end

error do
	'50x'
end</pre>
error方式还可以安装错误处理器
<pre class="lang:ruby decode:true ">error 403 do
  'Access forbidden'
end

get '/secret' do
  403
end</pre>
在运行在development环境下时，Sinatra会安装特殊的 <code>not_found</code> 和 &lt;code>error</code> 处理器来打印具体错误信息。