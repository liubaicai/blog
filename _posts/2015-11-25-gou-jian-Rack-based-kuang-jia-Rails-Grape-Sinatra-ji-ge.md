---
layout:     post
title:      "[转]构建 Rack-based 框架 (Rails/Grape/Sinatra) 的几个 Tricks"
date:       2015-11-25 02:36:54 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

原文请前往<a href="https://robots.thoughtbot.com/lets-build-a-sinatra" target="_blank">Let's Build Sinatra</a>

曾经看过一本书<a href="https://rebuilding-rails.com/" target="_blank">《Rebuilding Own Rails》&lt;/a>，土豪请支持作者。对于中国读者来说，此书确实挺贵。

看了这两本书以后，略作总结，顺便和大家分享一下。
<h2 id="Trick #1 Rack">Trick #1 Rack</h2>
无论是Rails、还是Sinatra这些基于Rack的框架，原理都是调用Rack的call函数，此函数接受一个参数，env。
Rack的基本原理，是把对Rack对象发送HTTP请求的“环境“， 变量env，作为参数来调用call方法，然后把返回值当作是对请求的回应。
在我们生成的Rails应用程序里面，有个文件&lt;strong>config.ru</strong>，这个文件就是为Rack准备的。
我们可以试试如下代码(节选至《代码的未来》，210页)：
<pre class="lang:ruby decode:true "># hello.rb
class HelloApp
   def call(env)
       [ 200,                                  # 依次是 HTTP 状态码，200表示成功；
         {"Content-Type" =&gt; "text/plain"},    #  HTTP 响应头部（即HTML文件中header部分），放在Hash中；
         ["Hello, Rack World!"]              # HTTP 响应主体（即HTML文件中body部分，也就是我们打开浏览器看到的内容）
                                                  #必须是字符串数组。（为什么是字符串数组，而不是字符串？）
       ]       
   end
end</pre>
&nbsp;

call函数的返回值，最后一个body部分，因为在Ruby 1.9里，如果是字符串，就会导致程序崩溃，所以必须是Enumerator类型的，（可接受each方法），具体前往<a href="http://www.rubydoc.info/github/rack/rack/master/file/SPEC" target="_blank">Rack SPEC</a>

另外需要准备一个配置文件，以&lt;strong>.ru</strong>结尾
<pre class="lang:ruby decode:true"># hello.ru
require  'rubygems'
require 'rack'
require 'hello'

#至为关键的一句
run HelloApp.new</pre>
&nbsp;

然后在命令行终端运行：
<pre class="highlight plaintext"><code>$ rackup hello.ru</code></pre>
在Rails项目里，相应的配置文件名为&lt;strong>config.ru</strong>
<pre class="lang:ruby decode:true "># config.ru

# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)   # 包含启动文件

run Rails.application  #启动程序</pre>
&nbsp;

如果你在Rails应用的目录下运行以下命令，会有如下输出：
<pre class="highlight plaintext"><code>diancai.in master % rackup config.ru
[2015-10-12 21:36:37] INFO  WEBrick 1.3.1
[2015-10-12 21:36:37] INFO  ruby 2.2.3 (2015-08-18) [x86_64-darwin15]
[2015-10-12 21:36:37] INFO  WEBrick::HTTPServer#start: pid=6490 port=9292</code></pre>
神奇吧！

好了，说完Rack的基础知识，再看看Sinatra是怎么使用Rack的。
<h2 id="Trick #2 Application = Sinatra::Base.new">Trick #2 Application = Sinatra::Base.new</h2>
这个是用来简化代码，让框架看起来更像是DSL。
以下代码来自于&lt;a href="https://robots.thoughtbot.com/lets-build-a-sinatra" target="_blank">Let's Build Sinatra</a>
<pre class="lang:ruby decode:true ">module Nancy
     class Base
     end

     Application = Base.new
end</pre>
&nbsp;

这个其实很容易理解，但是对简化代码来说，不得不说是一个巧妙的设计。
<h2 id="Trick #3 Delegator">Trick #3 Delegator</h2>
这一点稍微有点让人费解
<pre class="lang:ruby decode:true ">module Nancy
  module Delegator
    def self.delegate(*methods, to:)
      Array(methods).each do |method_name|
        define_method(method_name) do |*args, &amp;block|
          to.send(method_name, *args, &amp;block)
        end

        private method_name
      end
    end

    delegate :get, :patch, :put, :post, :delete, :head, to: Application
  end
end</pre>
&nbsp;

这段代码采用元编程的技术，让我们在调用函数时不必这样写：
<pre class="highlight ruby"><code><span class="no">Application</span><span class="p">.</span><span class="nf">get</span> <span class="s2">"/"</span><span class="p">,</span> <span class="p">{}</span></code></pre>
而可以直接写成
<pre class="highlight ruby"><code>
<span class="n">get</span> <span class="s1">'/'</span><span class="p">,</span> <span class="p">{}</span></code></pre>
上面的代码利用define_method动态定义了:get, :patch等，而且把这些方法作为Application （即：Nancy::Base.new实例的实例方法）。

它的真正的trick在于，在利用这个框架，写的应用程序， 如：
<pre class="lang:ruby decode:true "># app.rb
# run with `ruby app.rb`
require "./nancy"

get "/" do
  "Hey there!"
end</pre>
&nbsp;

中，表面上好像直接调用Object的get方法，于是你查看所有ruby文档也没有get这个方法，你可能有点崩溃了，不知道它是来自于那里，干什么用的。
其实，就是因为在<strong>nancy.rb</strong>里面有一句&lt;code>include Nancy::Delegator</code>, 我们把&lt;code>get</code>方法补全，就一下看明白这个故意设计的trick；
<pre class="lang:ruby decode:true "># app.rb
# run with `ruby app.rb`
require "./nancy"

Nancy::Application.get "/" do
  "Hey there!"
end</pre>
&nbsp;

或者更近一步：
<pre class="lang:ruby decode:true "># app.rb
# run with `ruby app.rb`
require "./nancy"

Nancy::Base.new.get "/" do
  "Hey there!"
end</pre>
&nbsp;

这样写，就清楚明了了，但是可能写两句你就很不乐意了。

总结，无论是Rails，还是Sinatra，在使用了这些元编程技术之后，让我们的代码更加简洁，也让我们对于代码所要完成的任务更加清晰明了。