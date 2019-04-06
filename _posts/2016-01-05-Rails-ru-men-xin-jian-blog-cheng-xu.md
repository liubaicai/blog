---
layout:     post
title:      "Rails 入门：新建blog程序"
date:       2016-01-05 23:21:55 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h3 id="前提条件">1 前提条件</h3>
本文针对想从零开始开发 Rails 程序的初学者，不需要预先具备任何的 Rails 使用经验。不过，为了能顺利阅读，还是需要事先安装好一些软件：
<ul>
	<li><a href="https://www.ruby-lang.org/en/downloads">Ruby</a> 1.9.3 及以上版本&lt;/li>
	<li>包管理工具 <a href="https://rubygems.org/">RubyGems</a>，随 Ruby 1.9+ 安装。想深入了解 RubyGems，请阅读 <a href="http://guides.rubygems.org/">RubyGems 指南</a></li>
	<li><a href="https://www.sqlite.org/">SQLite3</a> 数据库&lt;/li>
</ul>
Rails 是使用 Ruby 语言开发的网页程序框架。如果之前没接触过 Ruby，学习 Rails 可要深下一番功夫。网上有很多资源可以学习 Ruby：
<ul>
	<li><a href="https://www.ruby-lang.org/zh_cn/documentation/">Ruby 语言官方网站</a></li>
	<li><a href="http://resrc.io/list/10/list-of-free-programming-books/#ruby">reSRC 列出的免费编程书籍&lt;/a></li>
</ul>
记住，某些资源虽然很好，但是针对 Ruby 1.8，甚至 1.6 编写的，所以没有介绍一些 Rails 日常开发会用到的句法。
<h3 id="rails-是什么？">2 Rails 是什么？</h3>
Rails 是使用 Ruby 语言编写的网页程序开发框架，目的是为开发者提供常用组件，简化网页程序的开发。只需编写较少的代码，就能实现其他编程语言或框架难以企及的功能。经验丰富的 Rails 程序员会发现，Rails 让程序开发变得更有乐趣。

Rails 有自己的一套规则，认为问题总有最好的解决方法，而且建议使用最好的方法，有些情况下甚至不推荐使用其他替代方案。学会如何按照 Rails 的思维开发，能极大提高开发效率。如果坚持在 Rails 开发中使用其他语言中的旧思想，尝试使用别处学来的编程模式，开发过程就不那么有趣了。

Rails 哲学包含两大指导思想：
<ul>
	<li><strong>不要自我重复（DRY）：</strong> DRY 是软件开发中的一个原则，“系统中的每个功能都要具有单一、准确、可信的实现。”。不重复表述同一件事，写出的代码才能更易维护，更具扩展性，也更不容易出问题。&lt;/li>
	<li><strong>多约定，少配置：</strong> Rails 为网页程序的大多数需求都提供了最好的解决方法，而且默认使用这些约定，不用在长长的配置文件中设置每个细节。&lt;/li>
</ul>
<h3 id="新建-rails-程序">3 新建 Rails 程序</h3>
阅读本文时，最佳方式是跟着一步一步操作，如果错过某段代码或某个步骤，程序就可能出错，所以请一步一步跟着做。

本文会新建一个名为 <code>blog</code> 的 Rails 程序，这是一个非常简单的博客。在开始开发程序之前，要确保已经安装了 Rails。
<div class="info">

文中的示例代码使用 <code>$</code> 表示命令行提示符，你的提示符可能修改过，所以会不一样。在 Windows 中，提示符可能是 <code>c:\source_code&gt;</code>。

</div>
<h4 id="安装-rails">3.1 安装 Rails</h4>
打开命令行：在 Mac OS X 中打开 Terminal.app，在 Windows 中选择“运行”，然后输入“cmd.exe”。下文中所有以 <code>$</code> 开头的代码，都要在命令行中运行。先确认是否安装了 Ruby 最新版：
<div class="info">

有很多工具可以帮助你快速在系统中安装 Ruby 和 Ruby on Rails。Windows 用户可以使用<a href="http://railsinstaller.org/">Rails Installer</a>，Mac OS X 用户可以使用 <a href="https://github.com/tokaido/tokaidoapp">Tokaido</a>。

</div>
<div class="code_container">
<div>
<div id="highlighter_74525" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ ruby -v</code></div>
<div class="line number2 index1 alt1"><code class="plain plain">ruby 2.1.2p95</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
如果你还没安装 Ruby，请访问 <a href="https://www.ruby-lang.org/en/downloads/">ruby-lang.org</a>，找到针对所用系统的安装方法。

很多类 Unix 系统都自带了版本尚新的 SQLite3。Windows 等其他操作系统的用户可以在 <a href="https://www.sqlite.org/">SQLite3 的网站&lt;/a>上找到安装说明。然后，确认是否在 PATH 中：
<div class="code_container">
<div>
<div id="highlighter_886738" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ sqlite3 --version</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
命令行应该回显版本才对。

安装 Rails，请使用 RubyGems 提供的 <code>gem install</code> 命令：
<div class="code_container">
<div>
<div id="highlighter_834681" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ gem install rails</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
要检查所有软件是否都正确安装了，可以执行下面的命令：
<div class="code_container">
<div>
<div id="highlighter_362446" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ rails --version</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
如果显示的结果类似“Rails 4.2.0”，那么就可以继续往下读了。
<h4 id="创建-blog-程序">3.2 创建 Blog 程序</h4>
Rails 提供了多个被称为“生成器”的脚本，可以简化开发，生成某项操作需要的所有文件。其中一个是新程序生成器，生成一个 Rails 程序骨架，不用自己一个一个新建文件。

打开终端，进入有写权限的文件夹，执行以下命令生成一个新程序：
<div class="code_container">
<div>
<div id="highlighter_59189" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ rails new blog</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
这个命令会在文件夹 <code>blog</code> 中新建一个 Rails 程序，然后执行 <code>bundle install</code> 命令安装 <code>Gemfile</code>中列出的 gem。
<div class="info">

执行 <code>rails new -h</code> 可以查看新程序生成器的所有命令行选项。

</div>
生成 <code>blog</code> 程序后，进入该文件夹：
<div class="code_container">
<div>
<div id="highlighter_274553" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ cd blog</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<code>blog</code> 文件夹中有很多自动生成的文件和文件夹，组成一个 Rails 程序。本文大部分时间都花在 <code>app</code> 文件夹上。下面简单介绍默认生成的文件和文件夹的作用：
<table class="responsive">
<thead>
<tr>
<th>文件/文件夹&lt;/th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>app/</td>
<td>存放程序的控制器、模型、视图、帮助方法、邮件和静态资源文件。本文主要关注的是这个文件夹。&lt;/td>
</tr>
<tr>
<td>bin/</td>
<td>存放运行程序的 <code>rails</code> 脚本，以及其他用来部署或运行程序的脚本。&lt;/td>
</tr>
<tr>
<td>config/</td>
<td>设置程序的路由，数据库等。详情参阅“&lt;a href="http://guides.ruby-china.org/configuring.html">设置 Rails 程序</a>”一文。&lt;/td>
</tr>
<tr>
<td>config.ru</td>
<td>基于 Rack 服务器的程序设置，用来启动程序。&lt;/td>
</tr>
<tr>
<td>db/</td>
<td>存放当前数据库的模式，以及数据库迁移文件。&lt;/td>
</tr>
<tr>
<td>Gemfile, Gemfile.lock</td>
<td>这两个文件用来指定程序所需的 gem 依赖件，用于 Bundler gem。关于 Bundler 的详细介绍，请访问 <a href="http://bundler.io/">Bundler 官网</a>。&lt;/td>
</tr>
<tr>
<td>lib/</td>
<td>程序的扩展模块。&lt;/td>
</tr>
<tr>
<td>log/</td>
<td>程序的日志文件。&lt;/td>
</tr>
<tr>
<td>public/</td>
<td>唯一对外开放的文件夹，存放静态文件和编译后的资源文件。&lt;/td>
</tr>
<tr>
<td>Rakefile</td>
<td>保存并加载可在命令行中执行的任务。任务在 Rails 的各组件中定义。如果想添加自己的任务，不要修改这个文件，把任务保存在 <code>lib/tasks</code> 文件夹中。&lt;/td>
</tr>
<tr>
<td>README.rdoc</td>
<td>程序的简单说明。你应该修改这个文件，告诉其他人这个程序的作用，如何安装等。&lt;/td>
</tr>
<tr>
<td>test/</td>
<td>单元测试，固件等测试用文件。详情参阅“&lt;a href="http://guides.ruby-china.org/testing.html">测试 Rails 程序</a>”一文。&lt;/td>
</tr>
<tr>
<td>tmp/</td>
<td>临时文件，例如缓存，PID，会话文件。&lt;/td>
</tr>
<tr>
<td>vendor/</td>
<td>存放第三方代码。经常用来放第三方 gem。&lt;/td>
</tr>
</tbody>
</table>
<h3 id="hello,-rails-bang">4 Hello, Rails!</h3>
首先，我们来添加一些文字，在页面中显示。为了能访问网页，要启动程序服务器。
<h4 id="启动服务器&quot;>4.1 启动服务器&lt;/h4>
现在，新建的 Rails 程序已经可以正常运行。要访问网站，需要在开发电脑上启动服务器。请在 <code>blog</code>文件夹中执行下面的命令：
<div class="code_container">
<div>
<div id="highlighter_177882" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ rails server</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<div class="info">

把 CoffeeScript 编译成 JavaScript 需要 JavaScript 运行时，如果没有运行时，会报错，提示没有 <code>execjs</code>。Mac OS X 和 Windows 一般都提供了 JavaScript 运行时。Rails 生成的 <code>Gemfile</code> 中，安装 <code>therubyracer</code> gem 的代码被注释掉了，如果需要使用这个 gem，请把前面的注释去掉。在 JRuby 中推荐使用 <code>therubyracer</code>。在 JRuby 中生成的 <code>Gemfile</code>已经包含了这个 gem。所有支持的运行时参见 <a href="https://github.com/sstephenson/execjs#readme">ExecJS</a>。

</div>
上述命令会启动 WEBrick，这是 Ruby 内置的服务器。要查看程序，请打开一个浏览器窗口，访问&lt;a href="http://localhost:3000/">http://localhost:3000</a>。应该会看到默认的 Rails 信息页面：

<img src="http://guides.ruby-china.org/images/getting_started/rails_welcome.png" alt="欢迎使用页面" />
<div class="info">

要想停止服务器，请在命令行中按 Ctrl+C 键。服务器成功停止后回重新看到命令行提示符。在大多数类 Unix 系统中，包括 Mac OS X，命令行提示符是 <code>$</code> 符号。在开发模式中，一般情况下无需重启服务器，修改文件后，服务器会自动重新加载。

</div>
“欢迎使用”页面是新建 Rails 程序后的“冒烟测试”：确保程序设置正确，能顺利运行。你可以点击“About your application's environment”链接查看程序所处环境的信息。
<h4 id="显示“hello,-rails-bang”&quot;>4.2 显示“Hello, Rails!”&lt;/h4>
要在 Rails 中显示“Hello, Rails!”，需要新建一个控制器和视图。

控制器用来接受向程序发起的请求。路由决定哪个控制器会接受到这个请求。一般情况下，每个控制器都有多个路由，对应不同的动作。动作用来提供视图中需要的数据。

视图的作用是，以人类能看懂的格式显示数据。有一点要特别注意，数据是在控制器中获取的，而不是在视图中。视图只是把数据显示出来。默认情况下，视图使用 eRuby（嵌入式 Ruby）语言编写，经由 Rails 解析后，再发送给用户。

控制器可用控制器生成器创建，你要告诉生成器，我想要个名为“welcome”的控制器和一个名为“index”的动作，如下所示：
<div class="code_container">
<div>
<div id="highlighter_102359" class="syntaxhighlighter nogutter  plain ">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ rails generate controller welcome index</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
运行上述命令后，Rails 会生成很多文件，以及一个路由。
<div class="code_container">
<div>
<div id="highlighter_526852" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">create  app/controllers/welcome_controller.rb</code></div>
<div class="line number2 index1 alt1"><code class="plain spaces"> </code><code class="plain plain">route  get 'welcome/index'</code></div>
<div class="line number3 index2 alt2"><code class="plain plain">invoke  erb</code></div>
<div class="line number4 index3 alt1"><code class="plain plain">create    app/views/welcome</code></div>
<div class="line number5 index4 alt2"><code class="plain plain">create    app/views/welcome/index.html.erb</code></div>
<div class="line number6 index5 alt1"><code class="plain plain">invoke  test_unit</code></div>
<div class="line number7 index6 alt2"><code class="plain plain">create    test/controllers/welcome_controller_test.rb</code></div>
<div class="line number8 index7 alt1"><code class="plain plain">invoke  helper</code></div>
<div class="line number9 index8 alt2"><code class="plain plain">create    app/helpers/welcome_helper.rb</code></div>
<div class="line number10 index9 alt1"><code class="plain plain">invoke  assets</code></div>
<div class="line number11 index10 alt2"><code class="plain plain">invoke    coffee</code></div>
<div class="line number12 index11 alt1"><code class="plain plain">create      app/assets/javascripts/welcome.js.coffee</code></div>
<div class="line number13 index12 alt2"><code class="plain plain">invoke    scss</code></div>
<div class="line number14 index13 alt1"><code class="plain plain">create      app/assets/stylesheets/welcome.css.scss</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
在这些文件中，最重要的当然是控制器，位于 <code>app/controllers/welcome_controller.rb</code>，以及视图，位于 <code>app/views/welcome/index.html.erb</code>。

使用文本编辑器打开 <code>app/views/welcome/index.html.erb</code> 文件，删除全部内容，写入下面这行代码：
<div class="code_container">
<div>
<div id="highlighter_957142" class="syntaxhighlighter nogutter  xml">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="xml plain">&lt;</code><code class="xml keyword">h1</code><code class="xml plain">&gt;Hello, Rails!&lt;/</code><code class="xml keyword">h1</code><code class="xml plain">&gt;</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<h4 id="设置程序的首页&quot;>4.3 设置程序的首页&lt;/h4>
我们已经创建了控制器和视图，现在要告诉 Rails 在哪个地址上显示“Hello, Rails!”。这里，我们希望访问根地址 <a href="http://localhost:3000/">http://localhost:3000</a> 时显示。但是现在显示的还是欢迎页面。

我们要告诉 Rails 真正的首页是什么。

在编辑器中打开 <code>config/routes.rb</code> 文件。
<div class="code_container">
<div>
<div id="highlighter_344186" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby plain">Rails.application.routes.draw </code><code class="ruby keyword">do</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby plain">get </code><code class="ruby string">'welcome/index'</code></div>
<div class="line number3 index2 alt2"></div>
<div class="line number4 index3 alt1"><code class="ruby spaces">  </code><code class="ruby comments"># The priority is based upon order of creation:</code></div>
<div class="line number5 index4 alt2"><code class="ruby spaces">  </code><code class="ruby comments"># first created -&gt; highest priority.</code></div>
<div class="line number6 index5 alt1"><code class="ruby spaces">  </code><code class="ruby comments">#</code></div>
<div class="line number7 index6 alt2"><code class="ruby spaces">  </code><code class="ruby comments"># You can have the root of your site routed with "root"</code></div>
<div class="line number8 index7 alt1"><code class="ruby spaces">  </code><code class="ruby comments"># root 'welcome#index'</code></div>
<div class="line number9 index8 alt2"><code class="ruby spaces">  </code><code class="ruby comments">#</code></div>
<div class="line number10 index9 alt1"><code class="ruby spaces">  </code><code class="ruby comments"># ...</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
这是程序的路由文件，使用特殊的 DSL（domain-specific language，领域专属语言）编写，告知 Rails 请求应该发往哪个控制器和动作。文件中有很多注释，举例说明如何定义路由。其中有一行说明了如何指定控制器和动作设置网站的根路由。找到以 <code>root</code> 开头的代码行，去掉注释，变成这样：
<div class="code_container">
<div>
<div id="highlighter_779069" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby plain">root </code><code class="ruby string">'welcome#index'</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<code>root 'welcome#index'</code> 告知 Rails，访问程序的根路径时，交给 <code>welcome</code> 控制器中的 <code>index</code> 动作处理。&lt;code>get 'welcome/index'</code> 告知 Rails，访问 <a href="http://localhost:3000/welcome/index">http://localhost:3000/welcome/index</a> 时，交给 <code>welcome</code> 控制器中的 <code>index</code> 动作处理。&lt;code>get 'welcome/index'</code> 是运行 <code>rails generate controller welcome index</code> 时生成的。

如果生成控制器时停止了服务器，请再次启动（&lt;code>rails server</code>），然后在浏览器中访问&lt;a href="http://localhost:3000/">http://localhost:3000</a>。你会看到之前写入 <code>app/views/welcome/index.html.erb</code> 文件的“Hello, Rails!”，说明新定义的路由把根目录交给 <code>WelcomeController</code> 的 <code>index</code> 动作处理了，而且也正确的渲染了视图。
<div class="info">

关于路由的详细介绍，请阅读“&lt;a href="http://guides.ruby-china.org/routing.html">Rails 路由全解</a>”一文。

</div>
<h3 id="开始使用&quot;>5 开始使用&lt;/h3>
前文已经介绍如何创建控制器、动作和视图，下面我们来创建一些更实质的功能。

在博客程序中，我们要创建一个新“资源”。资源是指一系列类似的对象，比如文章，人和动物。

资源可以被创建、读取、更新和删除，这些操作简称 CRUD。

Rails 提供了一个 <code>resources</code> 方法，可以声明一个符合 REST 架构的资源。创建文章资源后，&lt;code>config/routes.rb</code> 文件的内容如下：
<div class="code_container">
<div>
<div id="highlighter_690600" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby plain">Rails.application.routes.draw </code><code class="ruby keyword">do</code></div>
<div class="line number2 index1 alt1"></div>
<div class="line number3 index2 alt2"><code class="ruby spaces">  </code><code class="ruby plain">resources </code><code class="ruby color2">:articles</code></div>
<div class="line number4 index3 alt1"></div>
<div class="line number5 index4 alt2"><code class="ruby spaces">  </code><code class="ruby plain">root </code><code class="ruby string">'welcome#index'</code></div>
<div class="line number6 index5 alt1"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
执行 <code>rake routes</code> 任务，会看到定义了所有标准的 REST 动作。输出结果中各列的意义稍后会说明，现在只要留意 <code>article</code> 的单复数形式，这在 Rails 中有特殊的含义。
<div class="code_container">
<div>
<div id="highlighter_687875" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ bin/rake routes</code></div>
<div class="line number2 index1 alt1"><code class="plain spaces">      </code><code class="plain plain">Prefix Verb   URI Pattern                  Controller#Action</code></div>
<div class="line number3 index2 alt2"><code class="plain spaces">    </code><code class="plain plain">articles GET    /articles(.:format)          articles#index</code></div>
<div class="line number4 index3 alt1"><code class="plain spaces">             </code><code class="plain plain">POST   /articles(.:format)          articles#create</code></div>
<div class="line number5 index4 alt2"><code class="plain spaces"> </code><code class="plain plain">new_article GET    /articles/new(.:format)      articles#new</code></div>
<div class="line number6 index5 alt1"><code class="plain plain">edit_article GET    /articles/:id/edit(.:format) articles#edit</code></div>
<div class="line number7 index6 alt2"><code class="plain spaces">     </code><code class="plain plain">article GET    /articles/:id(.:format)      articles#show</code></div>
<div class="line number8 index7 alt1"><code class="plain spaces">             </code><code class="plain plain">PATCH  /articles/:id(.:format)      articles#update</code></div>
<div class="line number9 index8 alt2"><code class="plain spaces">             </code><code class="plain plain">PUT    /articles/:id(.:format)      articles#update</code></div>
<div class="line number10 index9 alt1"><code class="plain spaces">             </code><code class="plain plain">DELETE /articles/:id(.:format)      articles#destroy</code></div>
<div class="line number11 index10 alt2"><code class="plain spaces">        </code><code class="plain plain">root GET    /                            welcome#index</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
下一节，我们会加入新建文章和查看文章的功能。这两个操作分别对应于 CRUD 的 C 和 R，即创建和读取。新建文章的表单如下所示：

<img src="http://guides.ruby-china.org/images/getting_started/new_article.png" alt="新建文章表单" />

表单看起来很简陋，不过没关系，后文会加入更多的样式。
<h4 id="挖地基&quot;>5.1 挖地基&lt;/h4>
首先，程序中要有个页面用来新建文章。一个比较好的选择是 <code>/articles/new</code>。这个路由前面已经定义了，可以访问。打开 <a href="http://localhost:3000/articles/new">http://localhost:3000/articles/new</a> ，会看到如下的路由错误：

<img src="http://guides.ruby-china.org/images/getting_started/routing_error_no_controller.png" alt="路由错误，常量 ArticlesController 未初始化" />

产生这个错误的原因是，没有定义用来处理该请求的控制器。解决这个问题的方法很简单，执行下面的命令创建名为 <code>ArticlesController</code> 的控制器即可：
<div class="code_container">
<div>
<div id="highlighter_417780" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ bin/rails g controller articles</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
打开刚生成的 <code>app/controllers/articles_controller.rb</code> 文件，会看到一个几乎没什么内容的控制器：
<div class="code_container">
<div>
<div id="highlighter_589303" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">class</code> <code class="ruby plain">ArticlesController &lt; ApplicationController</code></div>
<div class="line number2 index1 alt1"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
控制器就是一个类，继承自 <code>ApplicationController</code>。在这个类中定义的方法就是控制器的动作。动作的作用是处理文章的 CRUD 操作。
<div class="note">

在 Ruby 中，方法分为 <code>public</code>、&lt;code>private</code> 和 <code>protected</code> 三种，只有 <code>public</code> 方法才能作为控制器的动作。详情参阅 <a href="http://www.ruby-doc.org/docs/ProgrammingRuby/">Programming Ruby</a> 一书。

</div>
现在刷新 <a href="http://localhost:3000/articles/new">http://localhost:3000/articles/new</a>，会看到一个新错误：

<img src="http://guides.ruby-china.org/images/getting_started/unknown_action_new_for_articles.png" alt="ArticlesController 控制器不知如何处理 new 动作" />

这个错误的意思是，在刚生成的 <code>ArticlesController</code> 控制器中找不到 <code>new</code> 动作。因为在生成控制器时，除非指定要哪些动作，否则不会生成，控制器是空的。

手动创建动作只需在控制器中定义一个新方法。打开 <code>app/controllers/articles_controller.rb</code> 文件，在 <code>ArticlesController</code> 类中，定义 <code>new</code> 方法，如下所示：
<div class="code_container">
<div>
<div id="highlighter_93577" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">class</code> <code class="ruby plain">ArticlesController &lt; ApplicationController</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby keyword">def</code> <code class="ruby keyword">new</code></div>
<div class="line number3 index2 alt2"><code class="ruby spaces">  </code><code class="ruby keyword">end</code></div>
<div class="line number4 index3 alt1"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
在 <code>ArticlesController</code> 中定义 <code>new</code> 方法后，再刷新 <a href="http://localhost:3000/articles/new">http://localhost:3000/articles/new</a>，看到的还是个错误：

<img src="http://guides.ruby-china.org/images/getting_started/template_is_missing_articles_new.png" alt="找不到 articles/new 所用模板&quot; />

产生这个错误的原因是，Rails 希望这样的常规动作有对应的视图，用来显示内容。没有视图可用，Rails 就报错了。

在上图中，最后一行被截断了，我们来看一下完整的信息：
<div class="code_container">
<div>
<div id="highlighter_173243" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">Missing template articles/new, application/new with {locale:[:en], formats:[:html], handlers:[:erb, :builder, :coffee]}. Searched in: * "/path/to/blog/app/views"</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
这行信息还挺长，我们来看一下到底是什么意思。

第一部分说明找不到哪个模板，这里，丢失的是 <code>articles/new</code> 模板。Rails 首先会寻找这个模板，如果找不到，再找名为 <code>application/new</code> 的模板。之所以这么找，是因为 <code>ArticlesController</code>继承自 <code>ApplicationController</code>。

后面一部分是个 Hash。&lt;code>:locale</code> 表示要找哪国语言模板，默认是英语（&lt;code>"en"</code>）。&lt;code>:format</code> 表示响应使用的模板格式，默认为 <code>:html</code>，所以 Rails 要寻找一个 HTML 模板。&lt;code>:handlers</code> 表示用来处理模板的程序，HTML 模板一般使用 <code>:erb</code>，XML 模板使用 <code>:builder</code>，&lt;code>:coffee</code> 用来把 CoffeeScript 转换成 JavaScript。

最后一部分说明 Rails 在哪里寻找模板。在这个简单的程序里，模板都存放在一个地方，复杂的程序可能存放在多个位置。

让这个程序正常运行，最简单的一种模板是 <code>app/views/articles/new.html.erb</code>。模板文件的扩展名是关键所在：第一个扩展名是模板的类型，第二个扩展名是模板的处理程序。Rails 会尝试在 <code>app/views</code> 文件夹中寻找名为 <code>articles/new</code> 的模板。这个模板的类型只能是 <code>html</code>，处理程序可以是 <code>erb</code>、&lt;code>builder</code> 或 <code>coffee</code>。因为我们要编写一个 HTML 表单，所以使用 <code>erb</code>。所以这个模板文件应该命名为 <code>articles/new.html.erb</code>，还要放在 <code>app/views</code> 文件夹中。

新建文件 <code>app/views/articles/new.html.erb</code>，写入如下代码：
<div class="code_container">
<div>
<div id="highlighter_417319" class="syntaxhighlighter nogutter  xml">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="xml plain">&lt;</code><code class="xml keyword">h1</code><code class="xml plain">&gt;New Article&lt;/</code><code class="xml keyword">h1</code><code class="xml plain">&gt;</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
再次刷新 <a href="http://localhost:3000/articles/new">http://localhost:3000/articles/new</a>，可以看到页面中显示了一个标头。现在路由、控制器、动作和视图都能正常运行了。接下来要编写新建文章的表单了。
<h4 id="首个表单">5.2 首个表单</h4>
要在模板中编写表单，可以使用“表单构造器”。Rails 中常用的表单构造器是 <code>form_for</code>。在 <code>app/views/articles/new.html.erb</code> 文件中加入以下代码：
<div class="code_container">
<div>
<div id="highlighter_194238" class="syntaxhighlighter nogutter  htmlscript">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby script">&lt;%=</code> <code class="ruby plain">form_for </code><code class="ruby color2">:article</code> <code class="ruby keyword">do</code> <code class="ruby plain">|f| </code><code class="ruby script">%&gt;</code></div>
<div class="line number2 index1 alt1"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">p</code><code class="ruby plain">&gt;</code></div>
<div class="line number3 index2 alt2"><code class="htmlscript spaces">    </code><code class="ruby script">&lt;%=</code> <code class="ruby plain">f.label </code><code class="ruby color2">:title</code> <code class="ruby script">%&gt;</code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">br</code><code class="ruby plain">&gt;</code></div>
<div class="line number4 index3 alt1"><code class="htmlscript spaces">    </code><code class="ruby script">&lt;%=</code> <code class="ruby plain">f.text_field </code><code class="ruby color2">:title</code> <code class="ruby script">%&gt;</code></div>
<div class="line number5 index4 alt2"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">p</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number6 index5 alt1"></div>
<div class="line number7 index6 alt2"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">p</code><code class="ruby plain">&gt;</code></div>
<div class="line number8 index7 alt1"><code class="htmlscript spaces">    </code><code class="ruby script">&lt;%=</code> <code class="ruby plain">f.label </code><code class="ruby color2">:text</code> <code class="ruby script">%&gt;</code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">br</code><code class="ruby plain">&gt;</code></div>
<div class="line number9 index8 alt2"><code class="htmlscript spaces">    </code><code class="ruby script">&lt;%=</code> <code class="ruby plain">f.text_area </code><code class="ruby color2">:text</code> <code class="ruby script">%&gt;</code></div>
<div class="line number10 index9 alt1"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">p</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number11 index10 alt2"></div>
<div class="line number12 index11 alt1"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">p</code><code class="ruby plain">&gt;</code></div>
<div class="line number13 index12 alt2"><code class="htmlscript spaces">    </code><code class="ruby script">&lt;%=</code> <code class="ruby plain">f.submit </code><code class="ruby script">%&gt;</code></div>
<div class="line number14 index13 alt1"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">p</code><code class="ruby plain">&gt;</code></div>
<div class="line number15 index14 alt2"><code class="ruby script">&lt;%</code> <code class="ruby keyword">end</code> <code class="ruby script">%&gt;</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
现在刷新页面，会看到上述代码生成的表单。在 Rails 中编写表单就是这么简单！

调用 <code>form_for</code> 方法时，要指定一个对象。在上面的表单中，指定的是 <code>:article</code>。这个对象告诉 <code>form_for</code>，这个表单是用来处理哪个资源的。在 <code>form_for</code> 方法的块中，<code>FormBuilder</code> 对象（用 <code>f</code>表示）创建了两个标签和两个文本字段，一个用于文章标题，一个用于文章内容。最后，在 <code>f</code> 对象上调用 <code>submit</code> 方法，创建一个提交按钮。

不过这个表单还有个问题。如果查看这个页面的源码，会发现表单 <code>action</code> 属性的值是 <code>/articles/new</code>。这就是问题所在，因为其指向的地址就是现在这个页面，而这个页面是用来显示新建文章表单的。

要想转到其他地址，就要使用其他的地址。这个问题可使用 <code>form_for</code> 方法的 <code>:url</code> 选项解决。在 Rails 中，用来处理新建资源表单提交数据的动作是 <code>create</code>，所以表单应该转向这个动作。

修改 <code>app/views/articles/new.html.erb</code> 文件中的 <code>form_for</code>，改成这样：
<div class="code_container">
<div>
<div id="highlighter_65955" class="syntaxhighlighter nogutter  htmlscript">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby script">&lt;%=</code> <code class="ruby plain">form_for </code><code class="ruby color2">:article</code><code class="ruby plain">, url: articles_path </code><code class="ruby keyword">do</code> <code class="ruby plain">|f| </code><code class="ruby script">%&gt;</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
这里，我们把 <code>:url</code> 选项的值设为 <code>articles_path</code> 帮助方法。要想知道这个方法有什么作用，我们要回过头再看一下 <code>rake routes</code> 的输出：
<div class="code_container">
<div>
<div id="highlighter_104657" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ bin/rake routes</code></div>
<div class="line number2 index1 alt1"><code class="plain spaces">      </code><code class="plain plain">Prefix Verb   URI Pattern                  Controller#Action</code></div>
<div class="line number3 index2 alt2"><code class="plain spaces">    </code><code class="plain plain">articles GET    /articles(.:format)          articles#index</code></div>
<div class="line number4 index3 alt1"><code class="plain spaces">             </code><code class="plain plain">POST   /articles(.:format)          articles#create</code></div>
<div class="line number5 index4 alt2"><code class="plain spaces"> </code><code class="plain plain">new_article GET    /articles/new(.:format)      articles#new</code></div>
<div class="line number6 index5 alt1"><code class="plain plain">edit_article GET    /articles/:id/edit(.:format) articles#edit</code></div>
<div class="line number7 index6 alt2"><code class="plain spaces">     </code><code class="plain plain">article GET    /articles/:id(.:format)      articles#show</code></div>
<div class="line number8 index7 alt1"><code class="plain spaces">             </code><code class="plain plain">PATCH  /articles/:id(.:format)      articles#update</code></div>
<div class="line number9 index8 alt2"><code class="plain spaces">             </code><code class="plain plain">PUT    /articles/:id(.:format)      articles#update</code></div>
<div class="line number10 index9 alt1"><code class="plain spaces">             </code><code class="plain plain">DELETE /articles/:id(.:format)      articles#destroy</code></div>
<div class="line number11 index10 alt2"><code class="plain spaces">        </code><code class="plain plain">root GET    /                            welcome#index</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<code>articles_path</code> 帮助方法告诉 Rails，对应的地址是 <code>/articles</code>，默认情况下，这个表单会向这个路由发起 <code>POST</code> 请求。这个路由对应于 <code>ArticlesController</code> 控制器的 <code>create</code> 动作。

表单写好了，路由也定义了，现在可以填写表单，然后点击提交按钮新建文章了。请实际操作一下。提交表单后，会看到一个熟悉的错误：

<img src="http://guides.ruby-china.org/images/getting_started/unknown_action_create_for_articles.png" alt="ArticlesController 控制器不知如何处理 create 动作" />

解决这个错误，要在 <code>ArticlesController</code> 控制器中定义 <code>create</code> 动作。
<h4 id="创建文章">5.3 创建文章</h4>
要解决前一节出现的错误，可以在 <code>ArticlesController</code> 类中定义 <code>create</code> 方法。在 <code>app/controllers/articles_controller.rb</code> 文件中 <code>new</code> 方法后面添加以下代码：
<div class="code_container">
<div>
<div id="highlighter_763455" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">class</code> <code class="ruby plain">ArticlesController &lt; ApplicationController</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby keyword">def</code> <code class="ruby keyword">new</code></div>
<div class="line number3 index2 alt2"><code class="ruby spaces">  </code><code class="ruby keyword">end</code></div>
<div class="line number4 index3 alt1"></div>
<div class="line number5 index4 alt2"><code class="ruby spaces">  </code><code class="ruby keyword">def</code> <code class="ruby plain">create</code></div>
<div class="line number6 index5 alt1"><code class="ruby spaces">  </code><code class="ruby keyword">end</code></div>
<div class="line number7 index6 alt2"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
然后再次提交表单，会看到另一个熟悉的错误：找不到模板。现在暂且不管这个错误。&lt;code>create</code> 动作的作用是把新文章保存到数据库中。

提交表单后，其中的字段以参数的形式传递给 Rails。这些参数可以在控制器的动作中使用，完成指定的操作。要想查看这些参数的内容，可以把 <code>create</code> 动作改成：
<div class="code_container">
<div>
<div id="highlighter_905946" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">def</code> <code class="ruby plain">create</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby plain">render plain: params[</code><code class="ruby color2">:article</code><code class="ruby plain">].inspect</code></div>
<div class="line number3 index2 alt2"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<code>render</code> 方法接受一个简单的 Hash 为参数，这个 Hash 的键是 <code>plain</code>，对应的值为 <code>params[:article].inspect</code>。&lt;code>params</code> 方法表示通过表单提交的参数，返回 <code>ActiveSupport::HashWithIndifferentAccess</code> 对象，可以使用字符串或者 Symbol 获取键对应的值。现在，我们只关注通过表单提交的参数。

如果现在再次提交表单，不会再看到找不到模板错误，而是会看到类似下面的文字：
<div class="code_container">
<div>
<div id="highlighter_395206" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby plain">{</code><code class="ruby string">"title"</code><code class="ruby plain">=&gt;</code><code class="ruby string">"First article!"</code><code class="ruby plain">, </code><code class="ruby string">"text"</code><code class="ruby plain">=&gt;</code><code class="ruby string">"This is my first article."</code><code class="ruby plain">}</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<code>create</code> 动作把表单提交的参数显示出来了。不过这么做没什么用，看到了参数又怎样，什么都没发生。
<h4 id="创建-article-模型">5.4 创建 Article 模型</h4>
在 Rails 中，模型的名字使用单数，对应的数据表名使用复数。Rails 提供了一个生成器用来创建模型，大多数 Rails 开发者创建模型时都会使用。创建模型，请在终端里执行下面的命令：
<div class="code_container">
<div>
<div id="highlighter_752788" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ bin/rails generate model Article title:string text:text</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
这个命令告知 Rails，我们要创建 <code>Article</code> 模型，以及一个字符串属性 <code>title</code> 和文本属性 <code>text</code>。这两个属性会自动添加到 <code>articles</code> 数据表中，映射到 <code>Article</code> 模型。

执行这个命令后，Rails 会生成一堆文件。现在我们只关注 <code>app/models/article.rb</code> 和 <code>db/migrate/20140120191729_create_articles.rb</code>（你得到的文件名可能有点不一样）这两个文件。后者用来创建数据库结构，下一节会详细说明。
<div class="info">

Active Record 很智能，能自动把数据表中的字段映射到模型的属性上。所以无需在 Rails 的模型中声明属性，因为 Active Record 会自动映射。

</div>
<h4 id="运行迁移">5.5 运行迁移</h4>
如前文所述，<code>rails generate model</code> 命令会在 <code>db/migrate</code> 文件夹中生成一个数据库迁移文件。迁移是一个 Ruby 类，能简化创建和修改数据库结构的操作。Rails 使用 rake 任务运行迁移，修改数据库结构后还能撤销操作。迁移的文件名中有个时间戳，这样能保证迁移按照创建的时间顺序运行。

<code>db/migrate/20140120191729_create_articles.rb</code>（还记得吗，你的迁移文件名可能有点不一样）文件的内容如下所示：
<div class="code_container">
<div>
<div id="highlighter_679831" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">class</code> <code class="ruby plain">CreateArticles &lt; ActiveRecord::Migration</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby keyword">def</code> <code class="ruby plain">change</code></div>
<div class="line number3 index2 alt2"><code class="ruby spaces">    </code><code class="ruby plain">create_table </code><code class="ruby color2">:articles</code> <code class="ruby keyword">do</code> <code class="ruby plain">|t|</code></div>
<div class="line number4 index3 alt1"><code class="ruby spaces">      </code><code class="ruby plain">t.string </code><code class="ruby color2">:title</code></div>
<div class="line number5 index4 alt2"><code class="ruby spaces">      </code><code class="ruby plain">t.text </code><code class="ruby color2">:text</code></div>
<div class="line number6 index5 alt1"></div>
<div class="line number7 index6 alt2"><code class="ruby spaces">      </code><code class="ruby plain">t.timestamps</code></div>
<div class="line number8 index7 alt1"><code class="ruby spaces">    </code><code class="ruby keyword">end</code></div>
<div class="line number9 index8 alt2"><code class="ruby spaces">  </code><code class="ruby keyword">end</code></div>
<div class="line number10 index9 alt1"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
在这个迁移中定义了一个名为 <code>change</code> 的方法，在运行迁移时执行。&lt;code>change</code> 方法中定义的操作都是可逆的，Rails 知道如何撤销这次迁移操作。运行迁移后，会创建 <code>articles</code> 表，以及一个字符串字段和文本字段。同时还会创建两个时间戳字段，用来跟踪记录的创建时间和更新时间。
<div class="info">

关于迁移的详细说明，请参阅“&lt;a href="http://guides.ruby-china.org/migrations.html">Active Record 数据库迁移&lt;/a>”一文。

</div>
然后，使用 rake 命令运行迁移：
<div class="code_container">
<div>
<div id="highlighter_448776" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">$ bin/rake db:migrate</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
Rails 会执行迁移操作，告诉你创建了 <code>articles</code> 表。
<div class="code_container">
<div>
<div id="highlighter_347622" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">==  CreateArticles: migrating ==================================================</code></div>
<div class="line number2 index1 alt1"><code class="plain plain">-- create_table(:articles)</code></div>
<div class="line number3 index2 alt2"><code class="plain spaces">   </code><code class="plain plain">-&gt; 0.0019s</code></div>
<div class="line number4 index3 alt1"><code class="plain plain">==  CreateArticles: migrated (0.0020s) =========================================</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<div class="note">

因为默认情况下，程序运行在开发环境中，所以相关的操作应用于 <code>config/database.yml</code> 文件中 <code>development</code> 区域设置的数据库上。如果想在其他环境中运行迁移，必须在命令中指明：<code>rake db:migrate RAILS_ENV=production</code>。

</div>
<h4 id="在控制器中保存数据&quot;>5.6 在控制器中保存数据&lt;/h4>
再回到 <code>ArticlesController</code> 控制器，我们要修改 <code>create</code> 动作，使用 <code>Article</code> 模型把数据保存到数据库中。打开 <code>app/controllers/articles_controller.rb</code> 文件，把 <code>create</code> 动作修改成这样：
<div class="code_container">
<div>
<div id="highlighter_540305" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">def</code> <code class="ruby plain">create</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby variable bold">@article</code> <code class="ruby plain">= Article.</code><code class="ruby keyword">new</code><code class="ruby plain">(params[</code><code class="ruby color2">:article</code><code class="ruby plain">])</code></div>
<div class="line number3 index2 alt2"></div>
<div class="line number4 index3 alt1"><code class="ruby spaces">  </code><code class="ruby variable bold">@article</code><code class="ruby plain">.save</code></div>
<div class="line number5 index4 alt2"><code class="ruby spaces">  </code><code class="ruby plain">redirect_to </code><code class="ruby variable bold">@article</code></div>
<div class="line number6 index5 alt1"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
在 Rails 中，每个模型可以使用各自的属性初始化，自动映射到数据库字段上。&lt;code>create</code> 动作中的第一行就是这个目的（还记得吗，&lt;code>params[:article]</code> 就是我们要获取的属性）。&lt;code>@article.save</code> 的作用是把模型保存到数据库中。保存完后转向 <code>show</code> 动作。稍后再编写 <code>show</code> 动作。
<div class="info">

后文会看到，<code>@article.save</code> 返回一个布尔值，表示保存是否成功。

</div>
再次访问 <a href="http://localhost:3000/articles/new">http://localhost:3000/articles/new</a>，填写表单，还差一步就能创建文章了，会看到一个错误页面：

<img src="http://guides.ruby-china.org/images/getting_started/forbidden_attributes_for_new_article.png" alt="新建文章时禁止使用属性&quot; />

Rails 提供了很多安全防范措施保证程序的安全，你所看到的错误就是因为违反了其中一个措施。这个防范措施叫做“健壮参数”，我们要明确地告知 Rails 哪些参数可在控制器中使用。这里，我们想使用 <code>title</code> 和 <code>text</code> 参数。请把 <code>create</code> 动作修改成：
<div class="code_container">
<div>
<div id="highlighter_676903" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">def</code> <code class="ruby plain">create</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby variable bold">@article</code> <code class="ruby plain">= Article.</code><code class="ruby keyword">new</code><code class="ruby plain">(article_params)</code></div>
<div class="line number3 index2 alt2"></div>
<div class="line number4 index3 alt1"><code class="ruby spaces">  </code><code class="ruby variable bold">@article</code><code class="ruby plain">.save</code></div>
<div class="line number5 index4 alt2"><code class="ruby spaces">  </code><code class="ruby plain">redirect_to </code><code class="ruby variable bold">@article</code></div>
<div class="line number6 index5 alt1"><code class="ruby keyword">end</code></div>
<div class="line number7 index6 alt2"></div>
<div class="line number8 index7 alt1"><code class="ruby plain">private</code></div>
<div class="line number9 index8 alt2"><code class="ruby spaces">  </code><code class="ruby keyword">def</code> <code class="ruby plain">article_params</code></div>
<div class="line number10 index9 alt1"><code class="ruby spaces">    </code><code class="ruby plain">params.require(</code><code class="ruby color2">:article</code><code class="ruby plain">).permit(</code><code class="ruby color2">:title</code><code class="ruby plain">, </code><code class="ruby color2">:text</code><code class="ruby plain">)</code></div>
<div class="line number11 index10 alt2"><code class="ruby spaces">  </code><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
看到 <code>permit</code> 方法了吗？这个方法允许在动作中使用 <code>title</code> 和 <code>text</code> 属性。
<div class="info">

注意，&lt;code>article_params</code> 是私有方法。这种用法可以防止攻击者把修改后的属性传递给模型。关于健壮参数的更多介绍，请阅读<a href="http://weblog.rubyonrails.org/2012/3/21/strong-parameters/">这篇文章</a>。

</div>
<h4 id="显示文章">5.7 显示文章</h4>
现在再次提交表单，Rails 会提示找不到 <code>show</code> 动作。这个提示没多大用，我们还是先添加 <code>show</code> 动作吧。

我们在 <code>rake routes</code> 的输出中看到，&lt;code>show</code> 动作的路由是：
<div class="code_container">
<div>
<div id="highlighter_568053" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">article GET    /articles/:id(.:format)      articles#show</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<code>:id</code> 的意思是，路由期望接收一个名为 <code>id</code> 的参数，在这个例子中，就是文章的 ID。

和前面一样，我们要在 <code>app/controllers/articles_controller.rb</code> 文件中添加 <code>show</code> 动作，以及相应的视图文件。
<div class="code_container">
<div>
<div id="highlighter_928324" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">def</code> <code class="ruby plain">show</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby variable bold">@article</code> <code class="ruby plain">= Article.find(params[</code><code class="ruby color2">:id</code><code class="ruby plain">])</code></div>
<div class="line number3 index2 alt2"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
有几点要注意。我们调用 <code>Article.find</code> 方法查找想查看的文章，传入的参数 <code>params[:id]</code> 会从请求中获取 <code>:id</code> 参数。我们还把文章对象存储在一个实例变量中（以 <code>@</code> 开头的变量），只有这样，变量才能在视图中使用。

然后，新建 <code>app/views/articles/show.html.erb</code> 文件，写入下面的代码：
<div class="code_container">
<div>
<div id="highlighter_661468" class="syntaxhighlighter nogutter  htmlscript">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">p</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number2 index1 alt1"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">strong</code><code class="htmlscript plain">&gt;Title:&lt;/</code><code class="htmlscript keyword">strong</code><code class="ruby plain">&gt;</code></div>
<div class="line number3 index2 alt2"><code class="htmlscript spaces">  </code><code class="ruby script">&lt;%=</code> <code class="ruby variable bold">@article</code><code class="ruby plain">.title </code><code class="ruby script">%&gt;</code></div>
<div class="line number4 index3 alt1"><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">p</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number5 index4 alt2"></div>
<div class="line number6 index5 alt1"><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">p</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number7 index6 alt2"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">strong</code><code class="htmlscript plain">&gt;Text:&lt;/</code><code class="htmlscript keyword">strong</code><code class="ruby plain">&gt;</code></div>
<div class="line number8 index7 alt1"><code class="htmlscript spaces">  </code><code class="ruby script">&lt;%=</code> <code class="ruby variable bold">@article</code><code class="ruby plain">.text </code><code class="ruby script">%&gt;</code></div>
<div class="line number9 index8 alt2"><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">p</code><code class="htmlscript plain">&gt;</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
做了以上修改后，就能真正的新建文章了。访问 <a href="http://localhost:3000/articles/new">http://localhost:3000/articles/new</a>，自己试试。

<img src="http://guides.ruby-china.org/images/getting_started/show_action_for_articles.png" alt="显示文章" />
<h4 id="列出所有文章&quot;>5.8 列出所有文章&lt;/h4>
我们还要列出所有文章，对应的路由是：
<div class="code_container">
<div>
<div id="highlighter_257439" class="syntaxhighlighter nogutter  plain">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="plain plain">articles GET    /articles(.:format)          articles#index</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
在 <code>app/controllers/articles_controller.rb</code> 文件中，为 <code>ArticlesController</code> 控制器添加 <code>index</code> 动作：
<div class="code_container">
<div>
<div id="highlighter_663462" class="syntaxhighlighter nogutter  ruby">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="ruby keyword">def</code> <code class="ruby plain">index</code></div>
<div class="line number2 index1 alt1"><code class="ruby spaces">  </code><code class="ruby variable bold">@articles</code> <code class="ruby plain">= Article.all</code></div>
<div class="line number3 index2 alt2"><code class="ruby keyword">end</code></div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
然后编写这个动作的视图，保存为 <code>app/views/articles/index.html.erb</code>：
<div class="code_container">
<div>
<div id="highlighter_113054" class="syntaxhighlighter nogutter  htmlscript">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="code">
<div class="container">
<div class="line number1 index0 alt2"><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">h1</code><code class="htmlscript plain">&gt;Listing articles&lt;/</code><code class="htmlscript keyword">h1</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number2 index1 alt1"></div>
<div class="line number3 index2 alt2"><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">table</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number4 index3 alt1"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">tr</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number5 index4 alt2"><code class="htmlscript spaces">    </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">th</code><code class="htmlscript plain">&gt;Title&lt;/</code><code class="htmlscript keyword">th</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number6 index5 alt1"><code class="htmlscript spaces">    </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">th</code><code class="htmlscript plain">&gt;Text&lt;/</code><code class="htmlscript keyword">th</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number7 index6 alt2"><code class="htmlscript spaces">  </code><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">tr</code><code class="ruby plain">&gt;</code></div>
<div class="line number8 index7 alt1"></div>
<div class="line number9 index8 alt2"><code class="htmlscript spaces">  </code><code class="ruby script">&lt;%</code> <code class="ruby variable bold">@articles</code><code class="ruby plain">.</code><code class="ruby keyword">each</code> <code class="ruby keyword">do</code> <code class="ruby plain">|article| </code><code class="ruby script">%&gt;</code></div>
<div class="line number10 index9 alt1"><code class="htmlscript spaces">    </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">tr</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number11 index10 alt2"><code class="htmlscript spaces">      </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">td</code><code class="ruby plain">&gt;</code><code class="ruby script">&lt;%=</code> <code class="ruby plain">article.title </code><code class="ruby script">%&gt;</code><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">td</code><code class="htmlscript plain">&gt;</code></div>
<div class="line number12 index11 alt1"><code class="htmlscript spaces">      </code><code class="htmlscript plain">&lt;</code><code class="htmlscript keyword">td</code><code class="ruby plain">&gt;</code><code class="ruby script">&lt;%=</code> <code class="ruby plain">article.text </code><code class="ruby script">%&gt;</code><code class="htmlscript plain">&lt;/</code><code class="htmlscript keyword">td</code><code