---
layout:     post
title:      "命令行的艺术"
date:       2016-01-21 13:33:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<a href="https://github.com/jlevy/the-art-of-command-line/blob/master/cowsay.png" target="_blank"><img src="https://github.com/jlevy/the-art-of-command-line/raw/master/cowsay.png" alt="curl -s 'https://raw.githubusercontent.com/jlevy/the-art-of-command-line/master/README.md' | egrep -o '&#96;\w+&#96;' | tr -d '&#96;' | cowsay -W50" /></a>

熟练使用命令行是一种常常被忽视，或被认为难以掌握的技能，但实际上，它会提高你作为工程师的灵活性以及生产力。本文是一份我在 Linux 上工作时，发现的一些命令行使用技巧的摘要。有些技巧非常基础，而另一些则相当复杂，甚至晦涩难懂。这篇文章并不长，但当你能够熟练掌握这里列出的所有技巧时，你就学会了很多关于命令行的东西了。

这篇文章是&lt;a href="https://github.com/jlevy/the-art-of-command-line/blob/master/AUTHORS.md">许多作者和译者&lt;/a>共同的成果。这里的大部分内容 <a href="http://www.quora.com/What-are-some-lesser-known-but-useful-Unix-commands">首次</a> <a href="http://www.quora.com/What-are-the-most-useful-Swiss-army-knife-one-liners-on-Unix">出现</a> 于 <a href="http://www.quora.com/What-are-some-time-saving-tips-that-every-Linux-user-should-know">Quora</a>，但考虑到这里的人们都具有学习的天赋且乐于接受别人的建议，使用 Github 来做这件事是更佳的选择。如果你在本文中发现了错误或者存在可以改善的地方，请果断提交 Issue 或 Pull Request！(当然在提交前请看一下必读节和已有的 PR/issue）。
<h2><a id="user-content-必读" class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#必读"></a>必读</h2>
涵盖范围：
<ul>
	<li>这篇文章对刚接触命令行的新手以及具有命令行使用经验的人都有用处。本文致力于做到<em>覆盖面广</em>（尽量包括一切重要的内容），<em>具体</em>（给出最常见的具体的例子）以及&lt;em>简洁&lt;/em>（避免不必要的，或是可以在其他地方轻松查到的细枝末节）。每个技巧在特定情境下或是基本的，或是能显著节约时间。&lt;/li>
	<li>本文为 Linux 所写，除了<a href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#%E4%BB%85%E9%99%90-os-x-%E7%B3%BB%E7%BB%9F">仅限 OS X 系统</a>节。其它节中的大部分内容都适用于其它 Unix 系统或 MacOS 系统，甚至 Cygwin。&lt;/li>
	<li>本文关注于交互式 Bash，尽管很多技巧也适用于其他 shell 或 Bash 脚本。&lt;/li>
	<li>本文包括了“标准的”Unix 命令和需要安装特定包的命令，只要它们足够重要。&lt;/li>
</ul>
注意事项：
<ul>
	<li>为了能在一页内展示尽量多的东西，一些具体的信息会被间接的包含在引用页里。聪明机智的你如果掌握了使用 Google 搜索引擎的基本思路与命令，那么你将可以查阅到更多的详细信息。使用 <code>apt-get</code>／&lt;code>yum</code>／&lt;code>dnf</code>／&lt;code>pacman</code>／&lt;code>pip</code>／&lt;code>brew</code>（以及其它合适的包管理器）来安装新程序。&lt;/li>
	<li>使用 <a href="http://explainshell.com/">Explainshell</a> 去获取相关命令、参数、管道等内容的解释。&lt;/li>
</ul>
<h2><a id="user-content-基础" class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#基础"></a>基础</h2>
<ul>
	<li>学习 Bash 的基础知识。具体来说，输入 <code>man bash</code> 并至少全文浏览一遍; 它很简单并且不长。其他的 shell 可能很好用，但 Bash 功能强大且几乎所有情况下都是可用的 （ <em>只&lt;/em>学习 zsh，fish 或其他的 shell 的话，在你自己的电脑上会显得很方便，但在很多情况下会限制你，比如当你需要在服务器上工作时）。&lt;/li>
	<li>学习并掌握至少一个基于文本的编辑器。通常 Vim （&lt;code>vi</code>） 会是你最好的选择，因为在终端里进行随机编辑 Vim 真的毫无敌手，哪怕是 Emacs、某大型 IDE 甚至时下非常流行的编辑器。&lt;/li>
	<li>学会如何使用 <code>man</code> 命令去阅读文档。学会使用 <code>apropos</code> 去查找文档。了解有些命令并不对应可执行文件，而是Bash内置的，可以使用 <code>help</code> 和 <code>help -d</code> 命令获取帮助信息。&lt;/li>
	<li>学会使用 <code>&gt;</code> 和 <code>&lt;</code> 来重定向输出和输入，学会使用 <code>|</code> 来重定向管道。明白 <code>&gt;</code> 会覆盖了输出文件而 <code>&gt;&gt;</code> 是在文件末添加。了解标准输出 stdout 和标准错误 stderr。&lt;/li>
	<li>学会使用通配符 <code>*</code> （或许再算上 <code>?</code> 和 <code>[</code>...<code>]</code>） 和引用以及引用中 <code>'</code> 和 <code>"</code> 的区别。&lt;/li>
	<li>熟悉 Bash 任务管理工具：&lt;code>&amp;</code>，&lt;strong>ctrl-z</strong>，&lt;strong>ctrl-c</strong>，&lt;code>jobs</code>，&lt;code>fg</code>，&lt;code>bg</code>，&lt;code>kill</code> 等。&lt;/li>
	<li>了解 <code>ssh</code>，以及学会通过使用 <code>ssh-agent</code>，&lt;code>ssh-add</code> 等命令来实现基本的无密码认证。&lt;/li>
	<li>学会基本的文件管理：<code>ls</code> 和 <code>ls -l</code> （了解 <code>ls -l</code> 中每一列代表的意义），<code>less</code>，&lt;code>head</code>，&lt;code>tail</code> 和 <code>tail -f</code> （甚至&lt;code>less +F</code>），<code>ln</code> 和 <code>ln -s</code> （了解硬链接与软链接的区别），&lt;code>chown</code>，&lt;code>chmod</code>，&lt;code>du</code> （硬盘使用情况概述：<code>du -hs *</code>）。 关于文件系统的管理，学习 <code>df</code>，&lt;code>mount</code>，&lt;code>fdisk</code>，&lt;code>mkfs</code>，&lt;code>lsblk</code>。知道 inode 是什么（与 <code>ls -i</code> 和 <code>df -i</code> 等命令相关）。&lt;/li>
	<li>学习基本的网络管理：<code>ip</code> 或 <code>ifconfig</code>，&lt;code>dig</code>。&lt;/li>
	<li>熟悉正则表达式，以及 <code>grep</code>／&lt;code>egrep</code> 里不同参数的作用，例如 <code>-i</code>，&lt;code>-o</code>，&lt;code>-v</code>，&lt;code>-A</code>，&lt;code>-B</code> 和 <code>-C</code>，这些参数是值得学习并掌握的。&lt;/li>
	<li>学会使用 <code>apt-get</code>，&lt;code>yum</code>，&lt;code>dnf</code> 或 <code>pacman</code> （取决于你使用的 Linux 发行版）来查找或安装软件包。并确保你的环境中有<code>pip</code> 来安装基于 Python 的命令行工具 （接下来提到的部分程序使用 <code>pip</code> 来安装会很方便）。&lt;/li>
</ul>
<h2><a id="user-content-日常使用" class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#日常使用"></a>日常使用</h2>
<ul>
	<li>在 Bash 中，可以使用 <strong>Tab</strong> 自动补全参数，使用 <strong>ctrl-r</strong> 搜索命令行历史（在按下之后，键入便可以搜索，重复按下 <strong>ctrl-r</strong>会在更多匹配中循环，按下 <strong>Enter</strong> 会执行找到的命令，按下右方向键会将结果放入当前行中，使你可以进行编辑）。&lt;/li>
	<li>在 Bash 中，可以使用 <strong>ctrl-w</strong> 删除你键入的最后一个单词，使用 <strong>ctrl-u</strong> 删除整行，使用 <strong>alt-b</strong> 和 <strong>alt-f</strong> 以单词为单位移动光标，使用 <strong>ctrl-a</strong> 将光标移至行首，使用 <strong>ctrl-e</strong> 将光标移至行尾，使用 <strong>ctrl-k</strong> 删除光标至行尾的所有内容，使用 <strong>ctrl-l</strong> 清屏。键入 <code>man readline</code> 查看 Bash 中的默认快捷键，内容很多。例如 <strong>alt-.</strong> 循环地移向前一个参数，以及 <strong>alt-</strong>* 展开通配符。&lt;/li>
	<li>你喜欢的话，可以键入 <code>set -o vi</code> 来使用 vi 风格的快捷键，而 <code>set -o emacs</code> 可以把它改回来。&lt;/li>
	<li>为了方便地键入长命令，在设置你的编辑器后（例如 <code>export EDITOR=vim</code>），键入 <strong>ctrl-x</strong> <strong>ctrl-e</strong> 会打开一个编辑器来编辑当前命令。在 vi 模式下则键入 <strong>escape-v</strong> 实现相同的功能。&lt;/li>
	<li>键入 <code>history</code> 查看命令行历史记录。其中有许多缩写，例如 <code>!$</code>（最后键入的参数）和 <code>!!</code>（最后键入的命令），尽管通常被 <strong>ctrl-r</strong> 和 <strong>alt-.</strong> 取代。&lt;/li>
	<li>回到上一个工作路径：<code>cd -</code></li>
	<li>如果你输入命令的时候改变了主意，按下 <strong>alt-#</strong> 来在行首添加 <code>#</code>，或者依次按下 <strong>ctrl-a</strong>， <strong>#</strong>， <strong>enter</strong>。这样做的话，之后你可以很方便的利用命令行历史回到你刚才输入到一半的命令。&lt;/li>
	<li>使用 <code>xargs</code> （ 或 <code>parallel</code>）。他们非常给力。注意到你可以控制每行参数个数（<code>-L</code>）和最大并行数（&lt;code>-P</code>）。如果你不确定它们是否会按你想的那样工作，先使用 <code>xargs echo</code> 查看一下。此外，使用 <code>-I{}</code> 会很方便。例如：</li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      find <span class="pl-c1">.</span> -name <span class="pl-s"><span class="pl-pds">'</span>*.py<span class="pl-pds">'</span></span> <span class="pl-k">|</span> xargs grep some_function
      cat hosts <span class="pl-k">|</span> xargs -I{} ssh root@{} hostname</pre>
</div>
<ul>
	<li><code>pstree -p</code> 有助于展示进程树。&lt;/li>
	<li>使用 <code>pgrep</code> 和 <code>pkill</code> 根据名字查找进程或发送信号（<code>-f</code> 参数通常有用）。&lt;/li>
	<li>了解你可以发往进程的信号的种类。比如，使用 <code>kill -STOP [pid]</code> 停止一个进程。使用 <code>man 7 signal</code> 查看详细列表。&lt;/li>
	<li>使用 <code>nohup</code> 或 <code>disown</code> 使一个后台进程持续运行。&lt;/li>
	<li>使用 <code>netstat -lntp</code> 或 <code>ss -plat</code> 检查哪些进程在监听端口（默认是检查 TCP 端口; 使用参数 <code>-u</code> 检查 UDP 端口）。&lt;/li>
	<li>有关打开套接字和文件，请参阅 <code>lsof</code>。&lt;/li>
	<li>使用 <code>uptime</code> 或 <code>w</code> 来查看系统已经运行多长时间。&lt;/li>
	<li>使用 <code>alias</code> 来创建常用命令的快捷形式。例如：<code>alias ll='ls -latr'</code> 使你可以方便地执行&lt;code>ls -latr</code>命令。&lt;/li>
	<li>在 Bash 脚本中，使用 <code>set -x</code> 去调试输出，尽可能的使用严格模式，使用 <code>set -e</code> 令脚本在发生错误时退出而不是继续运行，使用 <code>set -u</code> 来检查是否使用了未赋值的变量，使用 <code>set -o pipefail</code> 严谨地对待错误（尽管问题可能很微妙）。当牵扯到很多脚本时，使用 <code>trap</code>。一个好的习惯是在脚本文件开头这样写，这会使它检测一些错误，并在错误发生时中断程序并输出信息：&lt;/li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      <span class="pl-c1">set</span> -euo pipefail
      <span class="pl-c1">trap</span> <span class="pl-s"><span class="pl-pds">"</span>echo 'error: Script failed: see failed command above'<span class="pl-pds">"</span></span> ERR</pre>
</div>
<ul>
	<li>在 Bash 脚本中，子 shell（使用括号 <code>(...)</code>）是一种组织参数的便捷方式。一个常见的例子是临时地移动工作路径，代码如下：</li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      <span class="pl-c"># do something in current dir</span>
      (<span class="pl-c1">cd</span> /some/other/dir <span class="pl-k">&amp;&amp;</span> other-command)
      <span class="pl-c"># continue in original dir</span></pre>
</div>
<ul>
	<li>在 Bash 中，要注意其中有许多形式的扩展。检查变量是否存在：<code>${name:?error message}</code>。例如，当 Bash 脚本需要一个参数时，可以使用这样的代码 <code>input_file=${1:?usage: $0 input_file}</code>。数学表达式：&lt;code>i=$(( (i + 1) % 5 ))</code>。序列：<code>{1..10}</code>。截断字符串：&lt;code>${var%suffix}</code> 和 <code>${var#prefix}</code>。例如，假设 <code>var=foo.pdf</code>，那么 <code>echo ${var%.pdf}.txt</code>将输出 <code>foo.txt</code>。&lt;/li>
	<li>使用括号扩展（&lt;code>{</code>...<code>}</code>）来减少输入相似文本，并自动化文本组合。这在某些情况下会很有用，例如 <code>mv foo.{txt,pdf} some-dir</code>（同时移动两个文件），&lt;code>cp somefile{,.bak}</code>（会被扩展成 <code>cp somefile somefile.bak</code>）或者 <code>mkdir -p test-{a,b,c}/subtest-{1,2,3}</code>（会被扩展成所有可能的组合，并创建一个目录树）。&lt;/li>
	<li>通过使用 <code>&lt;(some command)</code> 可以将输出视为文件。例如，对比本地文件 <code>/etc/hosts</code> 和一个远程文件：</li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      diff /etc/hosts <span class="pl-s"><span class="pl-pds">&lt;(</span>ssh somehost cat /etc/hosts<span class="pl-pds">)</span></span></pre>
</div>
<ul>
	<li>了解 Bash 中的“here documents”，例如 <code>cat &lt;&lt;EOF ...</code>。&lt;/li>
	<li>在 Bash 中，同时重定向标准输出和标准错误，&lt;code>some-command &gt;logfile 2&gt;&amp;1</code>。通常，为了保证命令不会在标准输入里残留一个打开了的文件句柄导致你当前所在的终端无法操作，添加 <code>&lt;/dev/null</code> 是一个好习惯。&lt;/li>
	<li>使用 <code>man ascii</code> 查看具有十六进制和十进制值的ASCII表。&lt;code>man unicode</code>，&lt;code>man utf-8</code>，以及 <code>man latin1</code> 有助于你去了解通用的编码信息。&lt;/li>
	<li>使用 <code>screen</code> 或 <a href="https://tmux.github.io/"><code>tmux</code></a> 来使用多个屏幕，当你在使用 ssh 时（保存 session 信息）将尤为有用。另一个轻量级的解决方案是 <code>dtach</code>。&lt;/li>
	<li>ssh 中，了解如何使用 <code>-L</code> 或 <code>-D</code>（偶尔需要用 <code>-R</code>）去开启隧道是非常有用的，例如当你需要从一台远程服务器上访问 web。&lt;/li>
	<li>对 ssh 设置做一些小优化可能是很有用的，例如这个 <code>~/.ssh/config</code> 文件包含了防止特定环境下断开连接、压缩数据、多通道等选项：&lt;/li>
</ul>
<pre><code>      TCPKeepAlive=yes
      ServerAliveInterval=15
      ServerAliveCountMax=6
      Compression=yes
      ControlMaster auto
      ControlPath /tmp/%r@%h:%p
      ControlPersist yes
</code></pre>
<ul>
	<li>部分其他的关于 ssh 的选项是安全敏感且应当小心启用的。例如在可信任的网络中：<code>StrictHostKeyChecking=no</code>，&lt;code>ForwardAgent=yes</code></li>
	<li>考虑使用 <a href="https://mosh.mit.edu/"><code>mosh</code></a> 作为 ssh 的替代品，它使用 UDP 协议。&lt;/li>
	<li>获取文件的八进制格式权限，使用类似如下的代码：&lt;/li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      stat -c <span class="pl-s"><span class="pl-pds">'</span>%A %a %n<span class="pl-pds">'</span></span> /etc/timezone</pre>
</div>
<ul>
	<li>使用 <a href="https://github.com/mooz/percol"><code>percol</code></a> 或者 <a href="https://github.com/junegunn/fzf"><code>fzf</code></a> 可以交互式地从另一个命令输出中选取值。&lt;/li>
	<li>使用 <code>fpp</code>（&lt;a href="https://github.com/facebook/PathPicker">PathPicker</a>）可以与基于另一个命令(例如 <code>git</code>）输出的文件交互。&lt;/li>
	<li>将 web 服务器上当前目录下所有的文件（以及子目录）暴露给你所处网络的所有用户，使用： <code>python -m SimpleHTTPServer 7777</code> （使用端口 7777 和 Python 2）或<code>python -m http.server 7777</code> （使用端口 7777 和 Python 3）。&lt;/li>
	<li>以某种权限执行命令，使用<code>sudo</code>（root 权限）或<code>sudo -u</code>（其他用户）。使用&lt;code>su</code>或者&lt;code>sudo bash</code>来启动一个以对应用户权限运行的 shell。使用&lt;code>su -</code>模拟其他用户的登录。&lt;/li>
</ul>
<h2><a id="user-content-文件及数据处理&quot; class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#文件及数据处理&quot;></a>文件及数据处理&lt;/h2>
<ul>
	<li>在当前路径下通过文件名定位一个文件，<code>find . -iname '*something*'</code>（或类似的）。在所有路径下通过文件名查找文件，使用 <code>locate something</code> （但请记住 <code>updatedb</code> 可能没有对最近新建的文件建立索引）。&lt;/li>
	<li>使用 <a href="https://github.com/ggreer/the_silver_searcher"><code>ag</code></a> 在源代码或数据文件里检索（比 <code>grep -r</code> 更好）。&lt;/li>
	<li>将 HTML 转为文本：&lt;code>lynx -dump -stdin</code></li>
	<li>Markdown，HTML，以及所有文档格式之间的转换，试试 <a href="http://pandoc.org/"><code>pandoc</code></a>。&lt;/li>
	<li>如果你不得不处理 XML，&lt;code>xmlstarlet</code> 宝刀未老。&lt;/li>
	<li>使用 <a href="http://stedolan.github.io/jq/"><code>jq</code></a> 处理 JSON。&lt;/li>
	<li>使用 <a href="https://github.com/0k/shyaml"><code>shyaml</code></a> 处理 YAML。&lt;/li>
	<li>Excel 或 CSV 文件的处理，<a href="https://github.com/onyxfish/csvkit">csvkit</a> 提供了 <code>in2csv</code>，&lt;code>csvcut</code>，&lt;code>csvjoin</code>，&lt;code>csvgrep</code> 等工具。&lt;/li>
	<li>关于 Amazon S3，&lt;a href="https://github.com/s3tools/s3cmd"><code>s3cmd</code></a> 很方便而 <a href="https://github.com/bloomreach/s4cmd"><code>s4cmd</code></a> 更快。Amazon 官方的 <a href="https://github.com/aws/aws-cli"><code>aws</code></a> 以及 <a href="https://github.com/donnemartin/saws"><code>saws</code></a> 是其他 AWS 相关工作的基础。&lt;/li>
	<li>了解如何使用 <code>sort</code> 和 <code>uniq</code>，包括 uniq 的 <code>-u</code> 参数和 <code>-d</code> 参数，详见后文单行脚本节。另外可以了解一下 <code>comm</code>。&lt;/li>
	<li>了解如何使用 <code>cut</code>，&lt;code>paste</code> 和 <code>join</code> 来更改文件。很多人都会使用 <code>cut</code>，但几乎都不会使用 <code>join</code>。&lt;/li>
	<li>了解如何运用 <code>wc</code> 去计算新行数（&lt;code>-l</code>），字符数（<code>-m</code>），单词数（<code>-w</code>）以及字节数（&lt;code>-c</code>）。&lt;/li>
	<li>了解如何使用 <code>tee</code> 将标准输入复制到文件甚至标准输出，例如 <code>ls -al | tee file.txt</code>。&lt;/li>
	<li>了解语言环境对许多命令行工具的微妙影响，包括排序的顺序和性能。大多数 Linux 的安装过程会将 <code>LANG</code> 或其他有关的变量设置为符合本地的设置。意识到当你改变语言环境时，排序的结果可能会改变。明白国际化可能会使 sort 或其他命令运行效率下降&lt;em>许多倍&lt;/em>。某些情况下（例如集合运算）你可以放心的使用 <code>export LC_ALL=C</code> 来忽略掉国际化并使用基于字节的顺序。&lt;/li>
	<li>了解 <code>awk</code> 和 <code>sed</code> 关于数据的简单处理的用法。例如，将文本文件中第三列的所有数字求和：<code>awk '{ x += $3 } END { print x }'</code>. 这可能比同等作用的 Python 代码快三倍且代码量少三倍。&lt;/li>
	<li>替换一个或多个文件中出现的字符串：</li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      perl -pi.bak -e <span class="pl-s"><span class="pl-pds">'</span>s/old-string/new-string/g<span class="pl-pds">'</span></span> my-files-<span class="pl-k">*</span>.txt</pre>
</div>
<ul>
	<li>使用 <a href="https://github.com/jlevy/repren"><code>repren</code></a> 来批量重命名，或是在多个文件中搜索替换。（有些时候 <code>rename</code> 命令也可以批量重命名，但要注意，它在不同 Linux 发行版中的功能并不完全一样。）</li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      <span class="pl-c"># Full rename of filenames, directories, and contents foo -&gt; bar:</span>
      repren --full --preserve-case --from foo --to bar <span class="pl-c1">.</span>
      <span class="pl-c"># Recover backup files whatever.bak -&gt; whatever:</span>
      repren --renames --from <span class="pl-s"><span class="pl-pds">'</span>(.*)\.bak<span class="pl-pds">'</span></span> --to <span class="pl-s"><span class="pl-pds">'</span>\1<span class="pl-pds">'</span></span> <span class="pl-k">*</span>.bak
      <span class="pl-c"># Same as above, using rename, if available:</span>
      rename <span class="pl-s"><span class="pl-pds">'</span>s/\.bak$//<span class="pl-pds">'</span></span> <span class="pl-k">*</span>.bak</pre>
</div>
<ul>
	<li>根据 man 页面的描述，<code>rsync</code> 真的是一个快速且非常灵活的文件复制工具。它通常被用于机器间的同步，但在本地也同样有用。它同时也是删除大量文件的&lt;a href="https://web.archive.org/web/20130929001850/http://linuxnote.net/jianingy/en/linux/a-fast-way-to-remove-huge-number-of-files.html">最快方法&lt;/a>之一：&lt;/li>
</ul>
<div class="highlight highlight-source-shell">
<pre>mkdir empty <span class="pl-k">&amp;&amp;</span> rsync -r --delete empty/ some-dir <span class="pl-k">&amp;&amp;</span> rmdir some-dir</pre>
</div>
<ul>
	<li>使用 <code>shuf</code> 从一个文件中随机选取多行。&lt;/li>
	<li>了解 <code>sort</code> 的参数。处理数字方面，使用 <code>-n</code> 或者 <code>-h</code> 来处理可读性数字（例如 <code>du -h</code> 的输出）。明白键的工作原理（<code>-t</code> 和 <code>-k</code>）。例如，注意到你需要 <code>-k1，1</code> 来仅按第一个域来排序，而 <code>-k1</code> 意味着按整行排序。稳定排序（<code>sort -s</code>）在某些情况下很有用。例如，以第二个域为主关键字，第一个域为次关键字进行排序，你可以使用 <code>sort -k1，1 | sort -s -k2，2</code>。&lt;/li>
	<li>如果你想在 Bash 命令行中写 tab 制表符，按下 <strong>ctrl-v</strong> <strong>[Tab]</strong> 或键入 <code>$'\t'</code> （后者可能更好，因为你可以复制粘贴它）。&lt;/li>
	<li>标准的源代码对比及合并工具是 <code>diff</code> 和 <code>patch</code>。使用 <code>diffstat</code> 查看变更总览数据。注意到 <code>diff -r</code> 对整个文件夹有效。使用 <code>diff -r tree1 tree2 | diffstat</code> 查看变更总览数据。&lt;/li>
	<li>对于二进制文件，使用 <code>hd</code> 使其以十六进制显示以及使用 <code>bvi</code> 来编辑二进制。&lt;/li>
	<li>同样对于二进制文件，<code>strings</code>（包括 <code>grep</code> 等等）允许你查找一些文本。&lt;/li>
	<li>二进制文件对比（Delta 压缩），使用 <code>xdelta3</code>。&lt;/li>
	<li>使用 <code>iconv</code> 更改文本编码。而更高级的用法，可以使用 <code>uconv</code>，它支持一些高级的 Unicode 功能。例如，这条命令将所有元音字母转为小写并移除了：</li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      uconv -f utf-8 -t utf-8 -x <span class="pl-s"><span class="pl-pds">'</span>::Any-Lower; ::Any-NFD; [:Nonspacing Mark:] &gt;; ::Any-NFC; <span class="pl-pds">'</span></span> <span class="pl-k">&lt;</span> input.txt <span class="pl-k">&gt;</span> output.txt</pre>
</div>
<ul>
	<li>拆分文件，查看 <code>split</code>（按大小拆分）和 <code>csplit</code>（按模式拆分）。&lt;/li>
	<li>用 <a href="http://www.fresse.org/dateutils/"><code>dateutils</code></a> 中的 <code>dateadd</code>, <code>datediff</code>, <code>strptime</code> 等工具操作日期和时间表达式。&lt;/li>
	<li>使用 <code>zless</code>，&lt;code>zmore</code>，&lt;code>zcat</code> 和 <code>zgrep</code> 对压缩过的文件进行操作。&lt;/li>
</ul>
<h2><a id="user-content-系统调试" class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#系统调试"></a>系统调试</h2>
<ul>
	<li><code>curl</code> 和 <code>curl -I</code> 可以便捷地被应用于 web 调试中，它们的好兄弟 <code>wget</code> 也可以，或者是更潮的 <a href="https://github.com/jakubroztocil/httpie"><code>httpie</code></a>。&lt;/li>
	<li>使用 <code>iostat</code>、&lt;code>netstat</code>、&lt;code>top</code> （&lt;code>htop</code> 更佳）和 <code>dstat</code> 去获取硬盘、cpu 和网络的状态。熟练掌握这些工具可以使你快速的对系统的当前状态有一个大概的认识。&lt;/li>
	<li>使用 <code>netstat</code> 和 <code>ss</code> 查看网络连接的细节。&lt;/li>
	<li>若要对系统有一个深度的总体认识，使用 <a href="https://github.com/nicolargo/glances"><code>glances</code></a>。它在一个终端窗口中向你提供一些系统级的数据。这对于快速的检查各个子系统非常有帮助。&lt;/li>
	<li>若要了解内存状态，运行并理解 <code>free</code> 和 <code>vmstat</code> 的输出。尤其注意“cached”的值，它指的是 Linux 内核用来作为文件缓存的内存大小，因此它与空闲内存无关。&lt;/li>
	<li>Java 系统调试则是一件截然不同的事，一个可以用于 Oracle 的 JVM 或其他 JVM 上的调试的技巧是你可以运行 <code>kill -3 &lt;pid&gt;</code> 同时一个完整的栈轨迹和堆概述（包括 GC 的细节）会被保存到标准输出/日志文件。JDK 中的<code>jps</code>，&lt;code>jstat</code>，&lt;code>jstack</code>，&lt;code>jmap</code> 很有用。&lt;a href="https://github.com/aragozin/jvm-tools">SJK tools</a> 更高级.</li>
	<li>使用 <code>mtr</code> 去跟踪路由，用于确定网络问题。&lt;/li>
	<li>用 <code>ncdu</code> 来查看磁盘使用情况，它比常用的命令，如 <code>du -sh *</code>，更节省时间。&lt;/li>
	<li>查找正在使用带宽的套接字连接或进程，使用 <code>iftop</code> 或 <code>nethogs</code>。&lt;/li>
	<li><code>ab</code> 工具（捆绑于 Apache）可以简单粗暴地检查 web 服务器的性能。对于更复杂的负载测试，使用 <code>siege</code>。&lt;/li>
	<li><code>wireshark</code>，&lt;code>tshark</code> 和 <code>ngrep</code> 可用于复杂的网络调试。&lt;/li>
	<li>了解 <code>strace</code> 和 <code>ltrace</code>。这俩工具在你的程序运行失败、挂起甚至崩溃，而你却不知道为什么或你想对性能有个总体的认识的时候是非常有用的。注意 profile 参数（&lt;code>-c</code>）和附加到一个运行的进程参数 （&lt;code>-p</code>）。&lt;/li>
	<li>了解使用 <code>ldd</code> 来检查共享库。&lt;/li>
	<li>了解如何运用 <code>gdb</code> 连接到一个运行着的进程并获取它的堆栈轨迹。&lt;/li>
	<li>学会使用 <code>/proc</code>。它在调试正在出现的问题的时候有时会效果惊人。比如：<code>/proc/cpuinfo</code>，&lt;code>/proc/meminfo</code>，&lt;code>/proc/cmdline</code>，&lt;code>/proc/xxx/cwd</code>，&lt;code>/proc/xxx/exe</code>，&lt;code>/proc/xxx/fd/</code>，&lt;code>/proc/xxx/smaps</code>（这里的 <code>xxx</code> 表示进程的 id 或 pid）。&lt;/li>
	<li>当调试一些之前出现的问题的时候，<code>sar</code> 非常有用。它展示了 cpu、内存以及网络等的历史数据。&lt;/li>
	<li>关于更深层次的系统分析以及性能分析，看看 <code>stap</code>（&lt;a href="https://sourceware.org/systemtap/wiki">SystemTap</a>），<a href="http://en.wikipedia.org/wiki/Perf_(Linux)"><code>perf</code></a>，以及&lt;a href="https://github.com/draios/sysdig"><code>sysdig</code></a>。&lt;/li>
	<li>查看你当前使用的系统，使用 <code>uname</code> ， <code>uname -a</code> （Unix／kernel 信息） 或者 <code>lsb_release -a</code> （Linux 发行版信息）。&lt;/li>
	<li>无论什么东西工作得很欢乐时试试 <code>dmesg</code>（可能是硬件或驱动问题）。&lt;/li>
</ul>
<h2><a id="user-content-单行脚本" class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#单行脚本"></a>单行脚本</h2>
一些命令组合的例子：
<ul>
	<li>当你需要对文本文件做集合交、并、差运算时，结合使用 <code>sort</code>/<code>uniq</code> 很有帮助。假设 <code>a</code> 与 <code>b</code> 是两内容不同的文件。这种方式效率很高，并且在小文件和上G的文件上都能运用 （&lt;code>sort</code> 不被内存大小约束，尽管在 <code>/tmp</code> 在一个小的根分区上时你可能需要 <code>-T</code> 参数），参阅前文中关于 <code>LC_ALL</code> 和 <code>sort</code> 的 <code>-u</code> 参数的部分。&lt;/li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      cat a b <span class="pl-k">|</span> sort <span class="pl-k">|</span> uniq <span class="pl-k">&gt;</span> c   <span class="pl-c"># c is a union b</span>
      cat a b <span class="pl-k">|</span> sort <span class="pl-k">|</span> uniq -d <span class="pl-k">&gt;</span> c   <span class="pl-c"># c is a intersect b</span>
      cat a b b <span class="pl-k">|</span> sort <span class="pl-k">|</span> uniq -u <span class="pl-k">&gt;</span> c   <span class="pl-c"># c is set difference a - b</span></pre>
</div>
<ul>
	<li>使用 <code>grep . *</code>（每行都会附上文件名）或者 <code>head -100 *</code>（每个文件有一个标题）来阅读检查目录下所有文件的内容。这在检查一个充满配置文件的目录（如 <code>/sys</code>、&lt;code>/proc</code>、&lt;code>/etc</code>）时特别好用。&lt;/li>
	<li>计算文本文件第三列中所有数的和（可能比同等作用的 Python 代码快三倍且代码量少三倍）：&lt;/li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      awk <span class="pl-s"><span class="pl-pds">'</span>{ x += $3 } END { print x }<span class="pl-pds">'</span></span> myfile</pre>
</div>
<ul>
	<li>如果你想在文件树上查看大小/日期，这可能看起来像递归版的 <code>ls -l</code> 但比 <code>ls -lR</code> 更易于理解：</li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      find <span class="pl-c1">.</span> -type f -ls</pre>
</div>
<ul>
	<li>假设你有一个类似于 web 服务器日志文件的文本文件，并且一个确定的值只会出现在某些行上，假设一个 <code>acct_id</code> 参数在URI中。如果你想计算出每个 <code>acct_id</code> 值有多少次请求，使用如下代码：&lt;/li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      cat access.log <span class="pl-k">|</span> egrep -o <span class="pl-s"><span class="pl-pds">'</span>acct_id=[0-9]+<span class="pl-pds">'</span></span> <span class="pl-k">|</span> cut -d= -f2 <span class="pl-k">|</span> sort <span class="pl-k">|</span> uniq -c <span class="pl-k">|</span> sort -rn</pre>
</div>
<ul>
	<li>运行这个函数从这篇文档中随机获取一条技巧（解析 Markdown 文件并抽取项目）：&lt;/li>
</ul>
<div class="highlight highlight-source-shell">
<pre>      <span class="pl-k">function</span> <span class="pl-en">taocl()</span> {
        curl -s https://raw.githubusercontent.com/jlevy/the-art-of-command-line/master/README-zh.md<span class="pl-k">|</span>
          pandoc -f markdown -t html <span class="pl-k">|</span>
          iconv -f <span class="pl-s"><span class="pl-pds">'</span>utf-8<span class="pl-pds">'</span></span> -t <span class="pl-s"><span class="pl-pds">'</span>unicode<span class="pl-pds">'</span></span> <span class="pl-k">|</span>
          xmlstarlet fo --html --dropdtd <span class="pl-k">|</span>
          xmlstarlet sel -t -v <span class="pl-s"><span class="pl-pds">"</span>(html/body/ul/li[count(p)&gt;0])[<span class="pl-smi">$RANDOM</span> mod last()+1]<span class="pl-pds">"</span></span> <span class="pl-k">|</span>
          xmlstarlet unesc <span class="pl-k">|</span> fmt -80
      }</pre>
</div>
<h2><a id="user-content-冷门但有用&quot; class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#冷门但有用&quot;></a>冷门但有用&lt;/h2>
<ul>
	<li><code>expr</code>：计算表达式或正则匹配&lt;/li>
	<li><code>m4</code>：简单地宏处理器</li>
	<li><code>yes</code>：多次打印字符串</li>
	<li><code>cal</code>：漂亮的日历</li>
	<li><code>env</code>：执行一个命令（脚本文件中很有用）&lt;/li>
	<li><code>printenv</code>：打印环境变量（调试时或在使用脚本文件时很有用）</li>
	<li><code>look</code>：查找以特定字符串开头的单词</li>
	<li><code>cut</code>、&lt;code>paste</code> 和 <code>join</code>：数据修改&lt;/li>
	<li><code>fmt</code>：格式化文本段落</li>
	<li><code>pr</code>：将文本格式化成页/列形式&lt;/li>
	<li><code>fold</code>：包裹文本中的几行&lt;/li>
	<li><code>column</code>：将文本格式化成多列或表格&lt;/li>
	<li><code>expand</code> 和 <code>unexpand</code>：制表符与空格之间转换&lt;/li>
	<li><code>nl</code>：添加行号&lt;/li>
	<li><code>seq</code>：打印数字&lt;/li>
	<li><code>bc</code>：计算器</li>
	<li><code>factor</code>：分解因数&lt;/li>
	<li><a href="https://gnupg.org/"><code>gpg</code></a>：加密并签名文件</li>
	<li><code>toe</code>：terminfo entries 列表</li>
	<li><code>nc</code>：网络调试及数据传输</li>
	<li><code>socat</code>：套接字代理，与 <code>netcat</code> 类似</li>
	<li><a href="https://github.com/mattthias/slurm"><code>slurm</code></a>：网络可视化</li>
	<li><code>dd</code>：文件或设备间传输数据&lt;/li>
	<li><code>file</code>：确定文件类型&lt;/li>
	<li><code>tree</code>：以树的形式显示路径和文件，类似于递归的 <code>ls</code></li>
	<li><code>stat</code>：文件信息&lt;/li>
	<li><code>time</code>：执行命令，并计算执行时间&lt;/li>
	<li><code>lockfile</code>：使文件只能通过 <code>rm -f</code> 移除</li>
	<li><code>logrotate</code>: 切换、压缩以及发送日志文件&lt;/li>
	<li><code>watch</code>：重复运行同一个命令，展示结果并高亮有更改的部分&lt;/li>
	<li><code>tac</code>：反向输出文件&lt;/li>
	<li><code>shuf</code>：文件中随机选取几行</li>
	<li><code>comm</code>：一行一行的比较排序过的文件</li>
	<li><code>pv</code>：监视通过管道的数据&lt;/li>
	<li><code>hd</code>，&lt;code>hexdump</code>，&lt;code>xxd</code>，&lt;code>biew</code> 和 <code>bvi</code>：保存或编辑二进制文件&lt;/li>
	<li><code>strings</code>：从二进制文件中抽取文本</li>
	<li><code>tr</code>：转换字母&lt;/li>
	<li><code>iconv</code> 或 <code>uconv</code>：简易的文件编码</li>
	<li><code>split</code> 和 <code>csplit</code>：分割文件&lt;/li>
	<li><code>sponge</code>：在写入前读取所有输入，在读取文件后再向同一文件写入时比较有用，例如 <code>grep -v something some-file | sponge some-file</code></li>
	<li><code>units</code>：将一种计量单位转换为另一种等效的计量单位（参阅 <code>/usr/share/units/definitions.units</code>）&lt;/li>
	<li><code>apg</code>：随机生成密码&lt;/li>
	<li><code>7z</code>：高比例的文件压缩&lt;/li>
	<li><code>ldd</code>：动态库信息</li>
	<li><code>nm</code>：提取 obj 文件中的符号</li>
	<li><code>ab</code>：性能分析 web 服务器&lt;/li>
	<li><code>strace</code>：系统调用调试&lt;/li>
	<li><code>mtr</code>：更好的网络调试跟踪工具</li>
	<li><code>cssh</code>：可视化的并发 shell</li>
	<li><code>rsync</code>：通过 ssh 或本地文件系统同步文件和文件夹&lt;/li>
	<li><code>wireshark</code> 和 <code>tshark</code>：抓包和网络调试工具</li>
	<li><code>ngrep</code>：网络层的 grep</li>
	<li><code>host</code> 和 <code>dig</code>：DNS 查找</li>
	<li><code>lsof</code>：列出当前系统打开文件的工具以及查看端口信息&lt;/li>
	<li><code>dstat</code>：系统状态查看&lt;/li>
	<li><a href="https://github.com/nicolargo/glances"><code>glances</code></a>：高层次的多子系统总览</li>
	<li><code>iostat</code>：硬盘使用状态&lt;/li>
	<li><code>mpstat</code>: CPU 使用状态&lt;/li>
	<li><code>vmstat</code>: 内存使用状态&lt;/li>
	<li><code>htop</code>：top 的加强版</li>
	<li><code>last</code>：登入记录&lt;/li>
	<li><code>w</code>：查看处于登录状态的用户</li>
	<li><code>id</code>：用户/组 ID 信息</li>
	<li><code>sar</code>：系统历史数据&lt;/li>
	<li><code>iftop</code> 或 <code>nethogs</code>：套接字及进程的网络利用</li>
	<li><code>ss</code>：套接字数据</li>
	<li><code>dmesg</code>：引导及系统错误信息</li>
	<li><code>sysctl</code>: 在内核运行时动态地查看和修改内核的运行参数</li>
	<li><code>hdparm</code>：SATA/ATA 磁盘更改及性能分析</li>
	<li><code>lsb_release</code>：Linux 发行版信息&lt;/li>
	<li><code>lsblk</code>：列出块设备信息：以树形展示你的磁盘以及磁盘分区信息</li>
	<li><code>lshw</code>，&lt;code>lscpu</code>，&lt;code>lspci</code>，&lt;code>lsusb</code> 和 <code>dmidecode</code>：查看硬件信息，包括 CPU、BIOS、RAID、显卡、USB设备等&lt;/li>
	<li><code>lsmod</code> 和 <code>modinfo</code>：列出内核模块，并显示其细节</li>
	<li><code>fortune</code>，&lt;code>ddate</code> 和 <code>sl</code>：额，这主要取决于你是否认为蒸汽火车和莫名其妙的名人名言是否“有用”&lt;/li>
</ul>
<h2><a id="user-content-仅限-os-x-系统" class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#仅限-os-x-系统"></a>仅限 OS X 系统</h2>
以下是&lt;em>仅限于&lt;/em> MacOS 系统的技巧
<ul>
	<li>用 <code>brew</code> （Homebrew）或者 <code>port</code> （MacPorts）进行包管理。这些可以用来在 Mac 系统上安装以上的大多数命令。&lt;/li>
	<li>用 <code>pbcopy</code> 复制任何命令的输出到桌面应用，用 <code>pbpaste</code> 粘贴输入。&lt;/li>
	<li>若要在 Mac OS 终端中将 Option 键视为 alt 键（例如在上面介绍的 <strong>alt-b</strong>, <strong>alt-f</strong> 等命令中用到），打开 偏好设置 -&gt; 描述文件 -&gt; 键盘 并勾选“使用 Option 键作为 Meta 键”。&lt;/li>
	<li>用 <code>open</code> 或者 <code>open -a /Applications/Whatever.app</code> 使用桌面应用打开文件。&lt;/li>
	<li>Spotlight： 用 <code>mdfind</code> 搜索文件，用 <code>mdls</code> 列出元数据（例如照片的 EXIF 信息）。&lt;/li>
	<li>注意 MacOS 系统是基于 BSD UNIX 的，许多命令（例如 <code>ps</code>，&lt;code>ls</code>，&lt;code>tail</code>，&lt;code>awk</code>，&lt;code>sed</code>）都和 Linux 中有些微的不同，这些极大的被 System V-style Unix 和 GNU 工具影响。你可以通过标题为 "BSD General Commands Manual" 的 man 页面发现这些不同。在有些情况下 GNU 版本的命令也可能被安装（例如 <code>gawk</code> 和 <code>gsed</code> 对应 GNU 中的 awk 和 sed ）。如果要写跨平台的 Bash 脚本，避免使用这些命令（例如，考虑 Python 或者 <code>perl</code> ）或者经过仔细的测试。&lt;/li>
	<li>用 <code>sw_vers</code> 获取 MacOS 的版本信息。&lt;/li>
</ul>
<h2><a id="user-content-更多资源" class="anchor" href="https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md#更多资源"></a>更多资源</h2>
<ul>
	<li><a href="https://github.com/alebcay/awesome-shell">awesome-shell</a>：一份精心组织的命令行工具及资源的列表。&lt;/li>
	<li><a href="https://github.com/herrbischoff/awesome-osx-command-line">awesome-osx-command-line</a>：一份针对 Mac OS 命令行的更深入的指南。&lt;/li>
	<li><a href="http://redsymbol.net/articles/unofficial-bash-strict-mode/">Strict mode</a>：为了编写更好的脚本文件。&lt;/li>
	<li><a href="https://github.com/koalaman/shellcheck">shellcheck</a>：一个静态 shell 脚本分析工具，本质上是 bash／sh／zsh 的 lint。&lt;/li>
	<li><a href="http://www.dwheeler.com/essays/filenames-in-shell.html">Filenames and Pathnames in Shell</a>：有关如何在 shell 脚本里正确处理文件名的细枝末节。&lt;/li>
</ul>