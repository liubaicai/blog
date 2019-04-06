---
layout:     post
title:      "[转]用Sinatra编写博客应用"
date:       2015-11-15 11:33:51 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

Sinatra是Blake Mizerany在2007年9月开发的Ruby语言的Web框架。它最突出的特点就是轻量、快速。更难能可贵的是，Sinatra的源代码只有一千多行。

在第一次接触到Sinatra的时候，我便被它深深地吸引住了。随后，我在09年3月的Shanghai on Rails活动向大家介绍了这个框架。10年8月份我有幸可以在RubyKaigi这样的全球级Ruby社区会议上作为演讲者和听众交流Sinatra。本文则是对10年10月份在上海Linux用户组介绍Sinatra的讲座的一些整理和总结。希望读者能够通过本例子能体会到Sinatra的精妙之处。
<h2>最新版本: 1.1</h2>
截止到本文成文为止，Sinatra最新的版本是10年10月24日发布的1.1版本。很幸运的是，我对于README的翻译正好在发布的前一天被合并进入了主分支。于是在1.1的正式版本中，中文的读者可以直接阅读到中文的README，从而更好的了解Sinatra的用法。官网上也有此文档的链接，&lt;a href="http://www.sinatrarb.com/intro-zh.html">http://www.sinatrarb.com/intro-zh.html</a>。本文的代码全部以1.1版本为准。
<h2>Sinatra的基本结构&lt;/h2>
让我们从Sinatra最常见的Hello world程序开始：
<pre>get '/' { "Hello, world!" }
</pre>
这段简单的Hello world程序包含了Sinatra程序的三个基本组成部分：

<a href="http://www.liubaicai.net/wp-content/uploads/2014/09/ac.jpg"><img class="alignnone size-thumbnail wp-image-360" src="http://www.liubaicai.net/wp-content/uploads/2014/09/ac-140x100.jpg" alt="ac" width="140" height="100" /></a>
<ul>
	<li>路由（route）：

'/' 就是路由。路由可以是单一的路径，或者带有参数的路径（比如 &lt;code>/:name</code>），甚至是正则表达式。对于Sinatra不知道的路由，Sinatra会返回404错误（作为App运行的时候），或者传递给下面的中间件（作为中间件运行的时候）。&lt;/li>
	<li>方法（method）：

<code>get</code>是方法。在Sinatra中，HTTP的四个方法&lt;code>GET/POST/PUT/DELETE</code>都有相应的方法&lt;code>get/post/put/delete</code>。&lt;/li>
	<li>处理器（handler）：

处理器就是最后的代码块，处理器的返回值就是Sinatra返回给客户端（主要是浏览器）的内容。返回值主要以字符串为主，也可以是包含状态码，消息头，消息体的数组。&lt;/li>
</ul>
<h3>渲染模版</h3>
Sinatra支持的模版类型也在逐渐增加中。Haml是笔者常用的格式，因为它使用了CSS选择符构造HTML标签，从而节省编写时间。另一种常见的格式是Ruby自带的ERB，本例子将使用Haml作为博客的模版。

渲染模版在Sinatra中是很容易的事：
<pre>get '/' do
  haml :index
end
</pre>
在这里&lt;code>haml :index</code>，就表示使用Haml渲染<code>'views/index.haml'</code>这个模版。

传递参数也是很容易的事，可以使用实例变量：
<pre># in app.rb
get '/' do
  @now = Time.now
  haml :index
end
# in views/index.haml
Hello, now is #{@now}
</pre>
或者用locals传递参数（如例子中的哈希）：
<pre># in app.rb
get '/' do
  now = Time.now
  haml :index, :locals =&gt; { :now =&gt; now }
end
# in views/index.haml
Hello, now is #{now}
</pre>
熟悉了路由和模版，就可以开始构建Web应用程序了，Sinatra也提供了一些简单的辅助方法，比如过滤器、&lt;code>helpers</code>、&lt;code>configure</code>、&lt;code>halt</code>和&lt;code>pass</code>等等，这些就不再这里一一叙述了，更多的内容请仔细参考官方文档。
<h2>开始博客应用&lt;/h2>
<h3>文件格式</h3>
本博客应用将使用<a title="dorothy" href="http://github.com/cloudhead/dorothy">dorothy</a>格式的文件存储，不会使用数据库。

例子如下：
<pre># 文件名: 2010-10-10-a-lucky-day.txt
title: "A Lucky Day"
date: 2010-10-10
author: "吴江"
 
# 今天是我的幸运日
 
早上在地铁门将要关上的那一刻，我冲进了车厢，于是约会没有迟到...
 
中午提前了一点去港丽，居然只排了42分钟...
 
晚上又赶上了末班车...
 
到家数了数，钱包里面正好有42块钱...
</pre>
该文件的结构是：以第一个连续换行符（&lt;code>"\n\n"</code>）为界线，前一半是<a title="Yet Another Markup Language" href="http://www.yaml.org/">YAML</a>格式的配置信息，后一半则是&lt;a title="Daring Fireball: markdown" href="http://daringfireball.net/projects/markdown/">markdown</a>格式的文本。&lt;a title="Yet Another Markup Language" href="http://www.yaml.org/">YAML</a>格式是一种表示数据的标记语言。这里只使用到它的键值对结构。&lt;a title="Daring Fireball: markdown" href="http://daringfireball.net/projects/markdown/">markdown</a>则是很方便的用纯文本编写HTML的格式。比如&lt;code>"# header1"</code>会生成&lt;code>"&lt;h1&gt;header1&lt;/h1&gt;"</code>，&lt;code>"*emphasis*"</code>会生成&lt;code>"&lt;em&gt;emphasis&lt;/em&gt;"</code>等等。
<h3>安装环境</h3>
本博客应用使用Ruby 1.8.7版本。安装好后，首先安装Bundler（&lt;code>gem install bundler</code>），然后编写Gemfile（见下），运行&lt;code>bundle install</code>即可一次性安装好所需的gems。
<pre class="lang:ruby decode:true "># Gemfile
source "http://rubygems.org"
gem 'haml'      # Haml模版
gem 'rdiscount' # 渲染Markdown
gem 'sinatra'   # Sinatra
gem 'thin'      # 应用服务器
gem 'shotgun'   # 重启服务器
group :test do
  gem 'rspec'     # 单元测试
  gem 'nokogiri'  # 解析HTML输出
end
</pre>
<h3>测试驱动开发&lt;/h3>
使用测试驱动开发并非为了赶时髦，只是为了能够帮助我们写出更好的代码。

在本例子中，我们的测试需要能够达到以下目标：
<ol>
	<li>访问<code>"/"</code>的时候能够正确返回文章列表（虽然只有一篇文章）</li>
	<li>访问<code>"/:year/:month/:date/:title"</code>的时候能够正确地展示文章内容</li>
</ol>
<h3>正式编写</h3>
在本例子中，将只接受两个路由请求，&lt;code>'/'</code>和&lt;code>'/:year/:month/:date/:title'</code>。

首先编写如下的测试：
<pre># in app_spec.rb
describe 'blog' do
  before do
    @req = MockRequest.new(Sinatra::Application)
  end
 
  it "should show index correctly" do
    resp = @req.get '/'
    resp.status.should == 200
  end
end
</pre>
运行<code>rspec app_spec.rb</code>可以看到失败结果。先编写简单的代码让测试通过。
<pre># in app.rb
get '/' do
  ""
end
</pre>
然后继续增加测试，我们想让返回的页面中有链接到&lt;code>/2010/10/10/a-lucky-day</code>这个日志的链接
<pre># in app_spec.rb
  ...
  it "should show index correctly" do
    resp = @req.get '/'
    resp.status.should == 200
 
    doc = Nokogiri.new(resp)
    (doc/'a[href="/2010/10/10/a-lucky-day"]').text.should == "A Lucky Day"
  end
</pre>
为了通过这个测试则要写一些长一点的代码，为了省略篇幅，<code>Article</code>类的代码在这里忽略：
<pre># in app.rb
get '/' do
  @articles = []
  Dir.glob("articles/*.txt").each do |article_file|
    @articles &lt;&lt; Article.new(article_file)
  end
  haml :index
end
</pre>
在上文的代码中，首先读取了articles目录下的所有txt后缀的文件，就是全部的日志。 并把这些日志装到<code>@articles</code>这个数组类型的实例变量。

在视图中，则简单的把日期和日志名称罗列出来。
<pre># in views/index.haml
    ...
      - @articles.each do |article|
        %header
          %h2
            = article.date.strftime("%Y年%m月%d日&quot;)
            %a{ :href =&gt; article.path }= article.title
</pre>
接下来使用同样的方式来编写显示日志具体内容的代码：
<pre>it "should show article correctly" do
  resp = @req.get '/2010/10/10/a-lucky-day'
  resp.status.should == 200
  doc = Nokogiri(resp.body)
  (doc/'title').text.should == "A Lucky Day"
  (doc/'article h1').text.should == "今天是我的幸运日"
  resp.body.should match "钱包里面正好有42块钱"
end
</pre>
实现所用的代码相对会少一些：
<pre># in app.rb
get '/:year/:month/:day/:title' do |year, month, day, title|
  article_file = "articles/#{year}-#{month}-#{day}-#{title}.txt"
  @article = Article.new(article_file)
  haml :show
end
 
# in views/show.haml
!!!
%html
  %head
    %title= @article.title
  %body
    %header
      %h1
        = @article.title
    %article= @article.body
</pre>
测试通过以后，也可以使用<code>shotgun app.rb -s thin</code>开启服务器， 访问<a href="http://localhost:9393/">http://localhost:9393</a>就可以看到在浏览器中的效果。
<h3>部署</h3>
<a title="Heroku" href="http://heroku.com/">Heroku</a>是目前为止最好用的Ruby应用部署服务之一。在<a title="Heroku" href="http://heroku.com/">Heroku</a>的帮助下，我们可以快速地把这个应用发布给全世界使用。

首先编写<code>config.ru</code>：
<pre># in config.ru
run Sinatra::Application
</pre>
然后运行如下代码：
<pre># git初始化
git init .
git commit -a -m "Initial Commit"
 
# heroku 部署
heroku create
git push heroku master
</pre>
当看到&quot;Launching ... done"的字样的时候，就说明我们的程序部署成功了，赶快点击下面的链接看看结果吧！
<h3>评论</h3>
<a title="Disqus Comments" href="http://disqus.com/">Disqus</a>是目前我知道的最好用的评论管理系统。更要命的是，它能够很简单的把一个评论系统加到我们的博客中：
<pre>&lt;section class="comments"&gt;
  &lt;script type="text/javascript" src="http://disqus.com/forums/#{username}/embed.js"&gt;
&lt;/section&gt;
</pre>
只要把上面这段html代码加入到我们的系统中，一个完善的评论系统就出现在用户的眼前。本地调试的时候则要额外加上一句：
<pre>&lt;script type="text/javascript"&gt;var disqus_developer = 1;&lt;/script&gt;
</pre>
借助了Disqus，我们的评论系统就不会逊色于任何的博客应用。
<h2>思考&lt;/h2>
如果读者能够在整个过程中感受到快乐或者惊奇，那么我编写本文章的目的就算达到了。 详细的代码请参考本文的项目地址：&lt;a href="https://github.com/nouse/text-blog">https://github.com/nouse/text-blog</a>

以下则为笔者在制作这个应用过程之中的一些思考。

5年前，Rails的创造者David Heinemeier Hansson向全世界介绍了15分钟编写 blog应用（&lt;a title="Ruby on Rails demo" href="http://v.youku.com/v_show/id_XMzA5MTYxNTY=.html">优酷视频链接</a>）。在5年后，我们又用Sinatra重复造轮子，如果读者对比两者的差别， 就能深刻感觉到这5年里Ruby世界的一些变化。
<h3>基本工具（RVM和Bundler）&lt;/h3>
这5年间，Ruby基本工具有了很大的发展。这其中最大的亮点就是<a title="Ruby Version Manager" href="http://rvm.beginrescueend.com/">RVM（Ruby Version Manager）&lt;/a>。 除了如它的名字所述，可以帮助开发人员安装不同版本的Ruby以外。它的gemset功能也非常 好用。不同的gemset之间是一个个独立的环境，从而避免同一个gem的不同版本之间的干扰。

如果在项目目录下添加.rvmrc（&lt;code>rvm use version@gemset</code>），就可以让项目处于一个独立的环境之中。 再编写好Gemfile，将项目中需要的Ruby库全部交给Bundler管理， 就不会出现部署的时候缺乏相应的库导致失败的情况了。
<h3>方便的部署&lt;/h3>
Git的普及和Heroku的崛起，大大简化了部署的过程。如果5年前有Heroku的话， DHH的博客应用可以有更大的反响。“编写完成”--&gt;“git push”--&gt;“上线！”。 一个博客应用就一瞬间仿佛活了一样，从一个本地的演示项目变成了一个真正的线上应用。
<h3>Disqus等第三方应用的兴起&lt;/h3>
5年前，Web 2.0刚刚兴起，只要编写一个使用Ajax增强交互功能的应用， 就可以吸引用户的眼球。但是随着Web 2.0的概念深入人心，做一个blog显然不再能吸引用户的眼球了。

如果Disqus这样的第三方应用能够逐渐增多，那么我们就能够把更多的时间放在我们真正想实现的功能上。 就像这里，我们只要把博客的内容展示做好就够了，其他的则交给成熟的服务来处理。 Rails的成功就在于简化了开发Web 2.0应用的时间。借用一下jQuery的口号“write less, do more”， “写的更少，做的更多”是软件开发永远的主题。
<h3>Sinatra和Rails的关系&lt;/h3>
DHH在推出Rails的时候，让深陷于Java世界的开发人员看到了希望，Rails也借助Web 2.0的热潮迅速走红。 其实，笔者所做的演示的功能模仿的是一个Rack应用程序，&lt;a title="toto" href="http://github.com/cloudhead/toto">toto</a>。 所以读者们也不必迷信，用Sinatra经过15分钟能做出更好的博客应用，就说明Sinatra会取代Rails。

当前最流行的方式是融合，比如gemcutter.org，也就是现在的rubygems.org。 他们整个站点使用的是Rails 3，而客户下载gem的请求则是被Sinatra处理。 这样就可以保证网站在升级的时候不会影响下载gem的请求，而且Sinatra处理请求的速度也优于Rails 3， 用来处理每天超过访问网站数倍的下载请求也十分合适。

不管怎样，只有更多的了解一个框架的优缺点，才能在真正使用的时候做出正确的选择。而Sinatra的源代码只有一千行，要了解它并做出选择，相信不是件难事。