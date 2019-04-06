---
layout:     post
title:      "Ruby on Sinatra:读写cookie、路由让路实现权限验证"
date:       2015-11-23 15:13:30 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

这里的manager系列的页面都是不想向对外开放的，需要验证口令

<img class="alignnone size-full wp-image-595" src="http://www.liubaicai.net/wp-content/uploads/2015/11/QQ截图20151123225329.png" alt="QQ截图20151123225329" width="272" height="196" />

haml简单的放个密码框和提交按钮

路由部分代码如下
<pre class="lang:ruby decode:true ">#使用Rack中间件辅助管理cookie(session,这里是以cookie方式存储的)
use Rack::Session::Pool, :expire_after =&gt; 2592000

get '/promoteapp/manager/login' do
	haml :promoteappmanagerlogin
end
post '/promoteapp/manager/login' do
	postdata = URI.decode_www_form_component(request.body.read)
	params = URI.decode_www_form(postdata)
	if params.assoc("password").last=='123456'
		session['value'] = '123456'
		redirect to('/promoteapp/manager')
	else
		redirect to('/promoteapp/manager/login')	
	end
end

get '/promoteapp/manager*' do
	if session['value'] == '123456'
		pass
	else
		redirect to('/promoteapp/manager/login')
	end
end

get '/promoteapp/manager' do
	@pagetitle = '应用管理'
	@promoteapp = PromoteApp.all
	haml :promoteappmanagerlist
end</pre>
'/promoteapp/manager*' 这条路由处于除登录页面外所有路由之前，*代表匹配所有以'/promoteapp/manager'开头的请求。验证cookie(session)，如果成功，则pass，交由对应路由处理，如果没有验证通过，则redirect to登录页面。

①请注意 <code>enable :sessions</code> 实际上保存所有的数据在一个cookie之中。 这可能不会总是做你想要的（比如，保存大量的数据会增加你的流量）。 你可以使用任何的Rack session中间件，为了这么做， *不要*调用 <code>enable :sessions</code>，而是 按照自己的需要引入你的中间件

②一个路由可以放弃处理，将处理让给下一个匹配的路由，使用 <code>pass</code>：路由代码块被直接退出，控制流继续前进到下一个匹配的路由。 如果没有匹配的路由，将返回404。