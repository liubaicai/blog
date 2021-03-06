---
layout:     post
title:      "[转]Windows7下安装Ruby2的MySQL连接gem"
date:       2015-11-12 11:30:25 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<div class="iteye-blog-content-contain">
	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; 不得不感慨的是，学习一门语言其实是学习一个技术栈，包括语言的本身、基于该语言的常用组件、基于该语言的基础框架和该语言的常用场景示例。其实这一切都是很有趣的事情，但是学习这些有意思的东西时候肯定不止是看看书籍或文章那么简单，我们需要实践。实践的重要部分就是准备学习环境，对环境的熟悉程度实际上也很大程度的标识着对该技术栈的掌握程度。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; 说了一堆废话，其实不就是在Windows7下装了个Ruby2的MySQL的连接gem嘛？但是真的是要感慨一下，被这东西折腾了3个多小时，极大的妨碍了学习Ruby的进程。
	</p>

	<p style="font-size: 14px;">
		<a href="http://www.liubaicai.net/wp-content/uploads/2015/11/qinhongshang.jpg"><img alt="qinhongshang" class="alignnone size-full wp-image-511" height="172" src="http://www.liubaicai.net/wp-content/uploads/2015/11/qinhongshang.jpg" width="157" /></a>
	</p>

	<p style="font-size: 14px;">
		一 环境说明
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;1 安装的环境
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1).Windows7 &nbsp; &nbsp; &nbsp; x64 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Ultimate
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2).Mysql5.6 &nbsp; &nbsp; &nbsp; &nbsp; x64 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 5.6.10.1
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3).Ruby2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; x64 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;2.0.0-p247
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;4).DevKit &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; x64 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;4.7.2
	</p>

	<p style="font-size: 14px;">
		&nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;2 Ruby2.0和DevKit 安装说明
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;2.1) 在ruby官网 <a href="/admin/blogs/%20http:/rubyinstaller.org/downloads/" target="_blank">&nbsp;http://rubyinstaller.org/downloads/</a> &nbsp;下载Ruby2.0和DevKit的安装包，比如：rubyinstaller-2.0.0-p247-x64.exe和DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;2.2) rubyinstaller-2.0.0-p247-x64.exe直接双击运行，安装好可以在命令行用ruby -v检查是否安装成功，如果显示版本号就对了。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;2.3) 双击下载的7z文件:DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe，指定解压路径，路径中不能有空格。如C:\DevKit，这个路径就是&amp;lt;DEVKIT_INSTALL_DIR&gt;。
	</p>

	<div class="dp-highlighter" id="">
		<div class="bar">
			<div class="tools">
				Ruby代码<embed allowscriptaccess="always" flashvars="clipboard=%3E%20cd%20%3CDEVKIT_INSTALL_DIR%3E%0A%3E%20ruby%20dk.rb%20init%0A%23%E7%94%9F%E6%88%90config.yml%EF%BC%8C%E8%BF%99%E9%87%8C%E4%BC%9A%E6%A3%80%E6%9F%A5%E5%B0%86%E8%A6%81%E6%B7%BB%E5%8A%A0DevKit%E6%94%AF%E6%8C%81%E7%9A%84Ruby%E5%88%97%E8%A1%A8%EF%BC%8C%E5%8F%AA%E6%94%AF%E6%8C%81%E9%80%9A%E8%BF%87RubyInstaller%E5%AE%89%E8%A3%85%E7%9A%84Ruby%0A%23%E5%A6%82%E6%9E%9C%E8%BF%99%E9%87%8C%E5%88%97%E5%87%BA%E7%9A%84Ruby%E4%B8%8E%E4%BD%A0%E7%9A%84%E8%A6%81%E6%B1%82%E4%B8%8D%E7%AC%A6%EF%BC%8C%E5%8F%AF%E4%BB%A5%E6%89%8B%E5%8A%A8%E4%BF%AE%E6%94%B9%EF%BC%8C%E6%B3%A8%E6%84%8F%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0%20%E2%80%9C%20-%20C%3A%2FRuby2%E2%80%9D%E4%B8%AD-%E5%89%8D%E5%90%8E%E7%9A%84%E7%A9%BA%E6%A0%BC%0A%3E%20ruby%20dk.rb%20review%20%20%23%E6%A3%80%E6%9F%A5%E8%A6%81%E6%B7%BB%E5%8A%A0DevKit%E6%94%AF%E6%8C%81%E7%9A%84Ruby%E5%88%97%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E8%AF%AF%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%95%A5%E8%BF%87%0A%3E%20ruby%20dk.rb%20install%0A%5BINFO%5D%20Updating%20convenience%20notice%20gem%20override%20for%20'C%3A%2FRuby2'%0A%5BINFO%5D%20Installing%20'C%3A%2FRuby2%2Flib%2Fruby%2Fsite_ruby%2Fdevkit.rb'" height="15" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="/javascripts/syntaxhighlighter/clipboard_new.swf" type="application/x-shockwave-flash" width="14" wmode="transparent"></embed>&nbsp;<a href="javascript:void()" onclick="code_favorites_do_favorite(this);return false;" title="收藏这段代码"><img alt="收藏代码" class="star" src="/images/icon_star.png" /><img class="spinner" src="/images/spinner.gif" style="display:none" /></a>
			</div>

			<p>
				&nbsp;
			</p>

			<p>
				&nbsp;
			</p>
		</div>

		<ol class="dp-rb" start="1">
			<li>
				<span><span>&gt;&nbsp;cd&nbsp;&lt;DEVKIT_INSTALL_DIR&gt;&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>&gt;&nbsp;ruby&nbsp;dk.rb&nbsp;init&nbsp;&nbsp;</span>
			</li>
			<li>
				<span><span class="comment">#生成config.yml，这里会检查将要添加DevKit支持的Ruby列表，只支持通过RubyInstaller安装的Ruby</span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span><span class="comment">#如果这里列出的Ruby与你的要求不符，可以手动修改，注意配置参数&amp;nbsp;&ldquo;&nbsp;-&nbsp;C:/Ruby2&rdquo;中-前后的空格&lt;/span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>&gt;&nbsp;ruby&nbsp;dk.rb&nbsp;review&nbsp;&nbsp;<span class="comment">#检查要添加DevKit支持的Ruby列表是否有误，可以略过&lt;/span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>&gt;&nbsp;ruby&nbsp;dk.rb&nbsp;install&nbsp;&nbsp;</span>
			</li>
			<li>
				<span>[INFO]&nbsp;Updating&nbsp;convenience&nbsp;notice&nbsp;gem&nbsp;override&nbsp;<span class="keyword">for</span><span>&nbsp;</span><span class="string">&#39;C:/Ruby2&#39;</span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>[INFO]&nbsp;Installing&nbsp;<span class="string">&#39;C:/Ruby2/lib/ruby/site_ruby/devkit.rb&#39;</span><span>&nbsp;&nbsp;</span></span>
			</li>
		</ol>
	</div>

	<pre class="ruby" codeable_id="2014443" codeable_type="Blog" name="code" pre_index="0" source_url="http://kingxss.iteye.com/blog/2014443" style="display: none;" title="Windows7下安装Ruby2的MySQL连接gem">
&gt; cd &lt;DEVKIT_INSTALL_DIR&gt;
&gt; ruby dk.rb init
#生成config.yml，这里会检查将要添加DevKit支持的Ruby列表，只支持通过RubyInstaller安装的Ruby
#如果这里列出的Ruby与你的要求不符，可以手动修改，注意配置参数 &ldquo; - C:/Ruby2&rdquo;中-前后的空格
&gt; ruby dk.rb review  #检查要添加DevKit支持的Ruby列表是否有误，可以略过
&gt; ruby dk.rb install
[INFO] Updating convenience notice gem override for &#39;C:/Ruby2&#39;
[INFO] Installing &#39;C:/Ruby2/lib/ruby/site_ruby/devkit.rb&#39;</pre>

	<p style="font-size: 14px;">
		&nbsp; &nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp;检查是否安装成功：
	</p>

	<div class="dp-highlighter" id="">
		<div class="bar">
			<div class="tools">
				Ruby代码<embed allowscriptaccess="always" flashvars="clipboard=%3E%20gem%20install%20rdiscount%20--platform%3Druby%0AFetching%3A%20rdiscount-1.6.8.gem%20(100%25)%0ATemporarily%20enhancing%20PATH%20to%20include%20DevKit...%0ABuilding%20native%20extensions.%20%20This%20could%20take%20a%20while...%0ASuccessfully%20installed%20rdiscount-1.6.8%0A1%20gem%20installed%0AInstalling%20ri%20documentation%20for%20rdiscount-1.6.8...%0AInstalling%20RDoc%20documentation%20for%20rdiscount-1.6.8..." height="15" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="/javascripts/syntaxhighlighter/clipboard_new.swf" type="application/x-shockwave-flash" width="14" wmode="transparent"></embed>&nbsp;<a href="javascript:void()" onclick="code_favorites_do_favorite(this);return false;" title="收藏这段代码"><img alt="收藏代码" class="star" src="/images/icon_star.png" /><img class="spinner" src="/images/spinner.gif" style="display:none" /></a>
			</div>

			<p>
				&nbsp;
			</p>

			<p>
				&nbsp;
			</p>
		</div>

		<ol class="dp-rb" start="1">
			<li>
				<span><span>&gt;&nbsp;gem&nbsp;install&nbsp;rdiscount&nbsp;--platform=ruby&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>Fetching:&nbsp;rdiscount-1.6.8.gem&nbsp;(100%)&nbsp;&nbsp;</span>
			</li>
			<li>
				<span>Temporarily&nbsp;enhancing&nbsp;PATH&nbsp;to&nbsp;include&nbsp;DevKit...&nbsp;&nbsp;</span>
			</li>
			<li>
				<span>Building&nbsp;native&nbsp;extensions.&nbsp;&nbsp;This&nbsp;could&nbsp;take&nbsp;a&nbsp;<span class="keyword">while</span><span>...&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>Successfully&nbsp;installed&nbsp;rdiscount-1.6.8&nbsp;&nbsp;</span>
			</li>
			<li>
				<span>1&nbsp;gem&nbsp;installed&nbsp;&nbsp;</span>
			</li>
			<li>
				<span>Installing&nbsp;ri&nbsp;documentation&nbsp;<span class="keyword">for</span><span>&nbsp;rdiscount-1.6.8...&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>Installing&nbsp;RDoc&nbsp;documentation&nbsp;<span class="keyword">for</span><span>&nbsp;rdiscount-1.6.8...&nbsp;&nbsp;</span></span>
			</li>
		</ol>
	</div>

	<pre class="ruby" codeable_id="2014443" codeable_type="Blog" name="code" pre_index="1" source_url="http://kingxss.iteye.com/blog/2014443" style="display: none;" title="Windows7下安装Ruby2的MySQL连接gem">
&gt; gem install rdiscount --platform=ruby
Fetching: rdiscount-1.6.8.gem (100%)
Temporarily enhancing PATH to include DevKit...
Building native extensions.  This could take a while...
Successfully installed rdiscount-1.6.8
1 gem installed
Installing ri documentation for rdiscount-1.6.8...
Installing RDoc documentation for rdiscount-1.6.8...</pre>

	<p style="font-size: 14px;">
		&nbsp; &nbsp;如果能安装rdiscount成功说明安装DevKit成功。最后需要将DevKit的&lt;span style="font-size: 14px; line-height: 1.5;">&lt;DEVKIT_INSTALL_DIR&gt;\bin加入到环境变量的Path中。&lt;/span>
	</p>

	<p style="font-size: 14px;">
		&nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp;具体参考：<a href="https://github.com/oneclick/rubyinstaller/wiki/development-kit" target="_blank">https://github.com/oneclick/rubyinstaller/wiki/development-kit</a> &nbsp;&nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp;&nbsp; &nbsp;&nbsp;
	</p>

	<p style="font-size: 14px;">
		二 mysql和mysql2安装过程
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp;&nbsp;1. 从mysql官网 &nbsp;<a href="http://dev.mysql.com/downloads/connector/c/%20">http://dev.mysql.com/downloads/connector/c/ </a>&nbsp;下载mysql-connector-c-noinstall-6.0.2-winx64.zip，该包下的libmysql.dll 文件是MySQL的动态链接库文件，缺少此文件数据库无法正常工作。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1.1) 这里需要下载6.0版本，将该文件解压到相应目录，例如：c:\mysql-connector-c 。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1.2) 从 c:\mysql-connector-c\lib 中拷贝libmysql.dll到ruby/bin文件夹
	</p>

	<p style="font-size: 14px;">
		&nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;2. 由于mysql-connector-c中的 libmysql.lib 不与mingw64-gcc编译器兼容，所以需要生成mingw64兼容libmysql.lib文件。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;具体原因参考：<a href="https://bugs.ruby-lang.org/issues/8591">https://bugs.ruby-lang.org/issues/8591</a>
	</p>

	<p style="font-size: 14px;">
		&nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;下载需要的工具，主要是gendef.exe，这个应用从 <a href="https://structure-svm-map.googlecode.com/files/svm-map-win.zip" target="_blank">https://structure-svm-map.googlecode.com/files/svm-map-win.zip</a> 下载。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2.1) 解压该文件，拷贝gendef.exe到devkit/mingw/bin下。所以拷贝到这里，是因为dlltool.exe也在这里，都放到path里方便。
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2.2) 打开cmd， 进入 C:\mysql-connector-c\lib，依次运行如下命令：
	</p>

	<div class="dp-highlighter" id="">
		<div class="bar">
			<div class="tools">
				Ruby代码<embed allowscriptaccess="always" flashvars="clipboard=%23%E7%94%9F%E6%88%90libmysql.def%E6%96%87%E4%BB%B6%0Agendef.exe%20libmysql.dll%0A%0A%23%E7%94%9F%E6%88%90%E6%96%B0%E7%9A%84lib%E4%BA%86%0Adlltool%20-v%20--dllname%20libmysql.dll%20--def%20libmysql.def%20--output-lib%20libmysql.lib" height="15" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="/javascripts/syntaxhighlighter/clipboard_new.swf" type="application/x-shockwave-flash" width="14" wmode="transparent"></embed>&nbsp;<a href="javascript:void()" onclick="code_favorites_do_favorite(this);return false;" title="收藏这段代码"><img alt="收藏代码" class="star" src="/images/icon_star.png" /><img class="spinner" src="/images/spinner.gif" style="display:none" /></a>
			</div>

			<p>
				&nbsp;
			</p>

			<p>
				&nbsp;
			</p>
		</div>

		<ol class="dp-rb" start="1">
			<li>
				<span><span class="comment">#生成libmysql.def文件</span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>gendef.exe&nbsp;libmysql.dll&nbsp;&nbsp;</span>
			</li>
			<li>
				<span>&nbsp;&nbsp;</span>
			</li>
			<li>
				<span><span class="comment">#生成新的lib了&lt;/span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>dlltool&nbsp;-v&nbsp;--dllname&nbsp;libmysql.dll&nbsp;--<span class="keyword">def</span><span>&nbsp;libmysql.</span><span class="keyword">def</span><span>&nbsp;--output-lib&nbsp;libmysql.lib&nbsp;&nbsp;</span></span>
			</li>
		</ol>
	</div>

	<pre class="ruby" codeable_id="2014443" codeable_type="Blog" name="code" pre_index="2" source_url="http://kingxss.iteye.com/blog/2014443" style="display: none;" title="Windows7下安装Ruby2的MySQL连接gem">
#生成libmysql.def文件
gendef.exe libmysql.dll

#生成新的lib了
dlltool -v --dllname libmysql.dll --def libmysql.def --output-lib libmysql.lib</pre>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; 3. gem安装mysql和mysql2
	</p>

	<div class="dp-highlighter" id="">
		<div class="bar">
			<div class="tools">
				Ruby代码<embed allowscriptaccess="always" flashvars="clipboard=%23mysql%0Agem%20install%20mysql%20--platform%3Druby%20--%20--with-opt-dir%3DC%3A%2Fmysql-connector-c%0A%23mysql2%0Agem%20install%20mysql2%20--platform%3Druby%20--%20--with-mysql-dir%3DC%3A%2Fmysql-connector-c" height="15" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="/javascripts/syntaxhighlighter/clipboard_new.swf" type="application/x-shockwave-flash" width="14" wmode="transparent"></embed>&nbsp;<a href="javascript:void()" onclick="code_favorites_do_favorite(this);return false;" title="收藏这段代码"><img alt="收藏代码" class="star" src="/images/icon_star.png" /><img class="spinner" src="/images/spinner.gif" style="display:none" /></a>
			</div>

			<p>
				&nbsp;
			</p>

			<p>
				&nbsp;
			</p>
		</div>

		<ol class="dp-rb" start="1">
			<li>
				<span><span class="comment">#mysql</span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>gem&nbsp;install&nbsp;mysql&nbsp;--platform=ruby&nbsp;--&nbsp;--with-opt-dir=C:/mysql-connector-c&nbsp;&nbsp;</span>
			</li>
			<li>
				<span><span class="comment">#mysql2</span><span>&nbsp;&nbsp;</span></span>
			</li>
			<li>
				<span>gem&nbsp;install&nbsp;mysql2&nbsp;--platform=ruby&nbsp;--&nbsp;--with-mysql-dir=C:/mysql-connector-c&nbsp;&nbsp;</span>
			</li>
		</ol>
	</div>

	<pre class="ruby" codeable_id="2014443" codeable_type="Blog" name="code" pre_index="3" source_url="http://kingxss.iteye.com/blog/2014443" style="display: none;" title="Windows7下安装Ruby2的MySQL连接gem">
#mysql
gem install mysql --platform=ruby -- --with-opt-dir=C:/mysql-connector-c
#mysql2
gem install mysql2 --platform=ruby -- --with-mysql-dir=C:/mysql-connector-c</pre>

	<p style="font-size: 14px;">
		&nbsp; &nbsp; &nbsp;安装过程过程中可能会碰到相应的问题，可以参考这里：
	</p>

	<p style="font-size: 14px;">
		mysql安装参数问题：&lt;a href="http://stackoverflow.com/questions/17673612/installing-mysql-ruby-gem-in-windows-fails-using-ruby-2-0-0" style="color: #bc2a4d; text-decoration: underline;" target="_blank">http://stackoverflow.com/questions/17673612/installing-mysql-ruby-gem-in-windows-fails-using-ruby-2-0-0</a>
	</p>

	<p style="font-size: 14px;">
		&nbsp;
	</p>

	<p style="font-size: 14px;">
		mysql2安装参数问题：&lt;a href="http://stackoverflow.com/questions/19014117/ruby-mysql2-gem-installation-on-windows-7" target="_blank">http://stackoverflow.com/questions/19014117/ruby-mysql2-gem-installation-on-windows-7</a>
	</p>

	<p style="font-size: 14px;">
		&nbsp;
	</p>

	<p style="font-size: 14px;">
		编码问题&ldquo;unable to convert "\x90" from ASCII-8BIT to UTF-8 for lib/mysql/mysql_api.so, skipping&rdquo;：&lt;a href="http://stackoverflow.com/questions/4917859/ruby-error-utf-8-to-ascii" target="_blank">http://stackoverflow.com/questions/4917859/ruby-error-utf-8-to-ascii</a>
	</p>

	<p style="font-size: 14px;">
		&nbsp; &nbsp;&nbsp;
	</p>

	<p style="font-size: 14px;">
		&nbsp;
	</p>
</div>