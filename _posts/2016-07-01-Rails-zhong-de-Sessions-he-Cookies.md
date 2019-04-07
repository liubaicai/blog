---
layout:     post
title:      "Rails中的Sessions和Cookies"
date:       2016-07-01 10:24:54 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h3><span class="s1">Sessions</span></h3> <h3><span class="s1"><br></span></h3><p class="p2"><span class="s2">HTTP</span><span class="s1">是一种无状态的通讯协议，为了能够让浏览器能够在跨&lt;/span><span class="s2">request</span> <span class="s1">之间记住信息，&lt;/span> <span class="s2">Rails</span> <span class="s1">提供了&lt;/span> <span class="s2">Session</span> <span class="s1">功能，像是记住登入的状态、记住用户购物车的内容等等，都是用&lt;/span> <span class="s2">Session</span> <span class="s1">实作出来的。 </span></p><p class="p2"><span class="s1">要操作&lt;/span><span class="s2">Session</span><span class="s1">，直接操作&lt;/span><span class="s2">session</span><span class="s1">这个 </span><span class="s2">Hash</span><span class="s1">变量即可。 例如：&lt;/span></p><pre><span class="s1">session[:cart_id] = @cart.id</span></pre><p class="p4"><span class="s3">Session 原理可以参考 <a href="http://en.wikipedia.org/wiki/Session_ID"><span class="s4">Session_ID</span></a>，基本上也是利用浏览器的</span><span class="s5">cookie</span><span class="s3">来追踪&lt;/span> <span class="s5">requests</span> <span class="s3">请求。 </span></p><h4><span class="s1">Session storage</span></h4><h4><span class="s1"><br></span></h4><p class="p2"><span class="s2">Rails</span><span class="s1">默认采用</span> <span class="s2">Cookies session storage</span> <span class="s1">来储存&lt;/span> <span class="s2">Session</span> <span class="s1">数据，它是将</span> <span class="s2">Session</span> <span class="s1">数据透过</span> <span class="s2">config/secrets.yml</span> <span class="s1">的&lt;/span> <span class="s2">secret_key_base</span> <span class="s1">编码后放到浏览器的&lt;/span> <span class="s2">Cookie</span> <span class="s1">之中，最大的好处是对服务器的效能负担很低，缺点是大小最多&lt;/span> <span class="s2">4Kb</span> <span class="s1">，以及数据还是可以透过反编码后看出来，只是无法进行修改。 因此安全性较低，不适合存放机密数据。 </span></p><p class="p6"><span class="s6">除了</span><span class="s1">Cookies session storage</span><span class="s6">，&lt;/span><span class="s1">Rails</span> <span class="s6">也支持其他方式，你可以修改&lt;/span> <span class="s1">config/initializers/session_store.rb</span> <span class="s6">：&lt;/span></p> <ul class="ul1">
<li class="li6"><span class="s1">:active_record_store</span><span class="s6"> 使用数据库来储存</span></li>
<li class="li6"><span class="s1">:mem_cache_store</span><span class="s6"> 使用<a href="http://memcached.org/"><span class="s7">Memcached</span></a>快取系统来储存，适合高流量的网站 </span></li>
</ul><p class="p2"><span class="s1">一般来说使用默认的</span><span class="s2">Cookies session storage</span><span class="s1">即可，如果对安全性较高要求，可以使用数据库。 如果希望兼顾效能，可以考虑使用</span><span class="s2">Memcached</span><span class="s1">。 </span></p><p class="p6"><span class="s6">采用</span><span class="s1">:active_record_store</span><span class="s6">的话，必须安装&lt;/span><span class="s1">activerecord-session_ store gem</span><span class="s6">，然后产生&lt;/span><span class="s1">sessions</span><span class="s6">数据表：</span></p><pre><span class="s1">$ rails g active_record:session_ migration<br></span><span class="s1">$ rake db:migrate</span></pre><h3><span class="s1">Cookies</span></h3><h3><span class="s1"><br></span></h3><p class="p2"> <span class="s1">除了</span> <span class="s2">Session</span> <span class="s1">，我们也可以直接操作底层的&lt;/span> <span class="s2">Cookie</span> <span class="s1">，以下是一些使用范例：</span></p> <pre><span class="s1"># Sets a simple session cookie.<br></span> <span class="s1">cookies[:user_name] = "david"</span></pre> <p class="p7"><span class="s1"></span><br></p><pre><span class="s1"># Sets a cookie that expires in 1 hour.<br></span> <span class="s1">cookies[:login] = { :value =&gt; "XJ-122", :expires =&gt; 1.hour.from_now }</span></pre> <p class="p7"><span class="s1"></span><br></p><pre><span class="s1"># Example for deleting:<br></span><span class="s1">cookies.delete :user_name</span></pre> <p class="p7"><span class="s1"></span><br></p><pre><span class="s1">cookies[:key] = {<br></span><span class="s1">&nbsp;&nbsp; :value =&gt; 'a yummy cookie',<br></span><span class="s1"> &nbsp;&nbsp; :expires =&gt; 1.year.from_now,<br></span><span class="s1">&nbsp;&nbsp; :domain =&gt; 'domain.com'<br></span><span class="s1">}</span></pre><p class="p7"> <span class="s1"></span><br></p><pre><span class="s1">cookies.delete(:key, :domain =&gt; 'domain.com')</span></pre><p class="p2"><span class="s1">因为数据是存放在用户浏览器， 所以如果需要保护不能让用户乱改，&lt;/span><span class="s2">Rails</span><span class="s1">也提供了</span><span class="s2">Signed</span><span class="s1">方法：&lt;/span></p><pre><span class="s1"> cookies.signed[:user_preference] = @current_user.preferences</span></pre><p class="p2"><span class="s1">另外，如果是尽可能永远留在用户浏览器的数据，可以使用</span><span class="s2">Permanent </span><span class="s1">方法：&lt;/span></p><pre><span class="s1">cookies.permanent[:remember_me] = [current_user.id, current_user.salt]</span></pre><p class="p2"> <span class="s1">两者也可以加在一起用：&lt;/span></p> <p></p><pre><span class="s1">cookies.permanent.signed[:remember_me] = [current_user.id, current_user.salt]</span></pre>