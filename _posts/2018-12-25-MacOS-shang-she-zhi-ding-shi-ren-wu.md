---
layout:     post
title:      "MacOS上设置定时任务"
date:       2018-12-25 07:28:32 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="ql-syntax" spellcheck="false">在MACOS上设置定时任务大体有两种方案。一种是使用crontab，一种是使用Schedule，今天结合我的使用简单介绍一下。
先说一下背景，为什么MAC可以用crontab。如果使用过Linux的同学，设置定时任务经常会使用crontab、nohup。苹果根据FreeBSD开发了Mac OS，后续的每一个新版本的Mac OS系统都很大程度上保留了FreeBSD的新特性。当然也包括Shell，也包括crontab。
适用的场景，举个例子，公司每天下午4点钟准时订餐，错过可能就要饿肚子了，为了在繁忙的工作中，还能够记起这个事情，决定设置个定时任务提醒自己。
我第一选择了写个简单的applescript。
on&nbsp;callmeican()
&nbsp;&nbsp;&nbsp;&nbsp;set&nbsp;meican_url&nbsp;to&nbsp;"https://meican.com"&nbsp;as&nbsp;string
&nbsp;&nbsp;&nbsp;&nbsp;tell&nbsp;application&nbsp;"Google Chrome"
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;open location&nbsp;meican_url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activate
&nbsp;&nbsp;&nbsp;&nbsp;end tell
end&nbsp;callmeican
&nbsp;
say&nbsp;"不要这么拼了，预订美餐时间到了"
&nbsp;
display dialog&nbsp;"不要这么拼了，预订美餐时间到了(截至时间16:30)！"&nbsp;buttons&nbsp;{"好的",&nbsp;"我不定了"}&nbsp;default button&nbsp;1
&nbsp;
if&nbsp;the&nbsp;button&nbsp;returned&nbsp;of&nbsp;the&nbsp;result&nbsp;is&nbsp;"好的"&nbsp;then
&nbsp;&nbsp;&nbsp;&nbsp;-- action for 1st button goes here
&nbsp;&nbsp;&nbsp;&nbsp;callmeican()
end if
脚本的作用大概是MAC会通过弹窗和语音提醒我该订餐了，如果选择定，就自动用浏览器打开订餐的页面。这个脚本每天在四点执行。
1、使用crontab设置定时任务
crontab -e 或者sudo crontab -e。
00 16 * * * osascript /Users/hanlingzhi/project/applescript/meican.scpt
输入完成后，保存退出。系统自动建立新cron，提示如下：crontab: installing new crontab。设置非常简单。
2、使用苹果的Schedule jobs using launchd设置定时任务。需要写一个plist文件，描述任务的动作、间隔的时间、日志输出等参数。
我创建一个plist文件com.hanlingzhi.cron.meican.plist，大概内容如下：
&lt;?xml&nbsp;version="1.0"&nbsp;encoding="UTF-8"?&gt;
&lt;!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"&gt;
&lt;plist&nbsp;version="1.0"&gt;
&nbsp;&nbsp;&lt;dict&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 名称，要全局唯一 --&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;Label&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;string&gt;com.hanlingzhi.cron.meican&lt;/string&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 命令， 第一个为命令，其它为参数--&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;ProgramArguments&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;array&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;string&gt;osascript&lt;/string&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;string&gt;/Users/hanlingzhi/project/applescript/meican.scpt&lt;/string&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/array&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 运行时间 --&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;StartCalendarInterval&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;dict&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;Minute&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;integer&gt;0&lt;/integer&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;Hour&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;integer&gt;16&lt;/integer&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dict&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 标准输入文件 --&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;StandardInPath&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;string&gt;/Users/hanlingzhi/project/applescript/log/run-in-meican.log&lt;/string&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 标准输出文件 --&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;StandardOutPath&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;string&gt;/Users/hanlingzhi/project/applescript/log/run-out-meican.log&lt;/string&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 标准错误输出文件 --&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;key&gt;StandardErrorPath&lt;/key&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;string&gt;/Users/hanlingzhi/project/applescript/log/run-err-meican.log&lt;/string&gt;
&nbsp;&nbsp;&lt;/dict&gt;
&lt;/plist&gt;
然后将plist文件放在/Users/hanlingzhi/Library/LaunchAgents，你的用户目录下，然后执行launchctl load plist就可以启动了。
plist脚本存放路径为/Library/LaunchDaemons或用户目录/Library/LaunchAgents，其区别是后一个路径的脚本当用户登陆系统后才会被执行，前一个只要系统启动了，哪怕用户不登陆系统也会被执行。
系统定义了几个位置来存放任务列表
~/Library/LaunchAgents 由用户自己定义的任务项
/Library/LaunchAgents 由管理员为用户定义的任务项
/Library/LaunchDaemons 由管理员定义的守护进程任务项
/System/Library/LaunchAgents 由Mac OS X为用户定义的任务项
/System/Library/LaunchDaemons 由Mac OS X定义的守护进程任务项
可以通过两种方式来设置脚本的执行时间。一个是使用StartInterval，它指定脚本每间隔多长时间（单位：秒）执行一次；另外一个使用StartCalendarInterval，它可以指定脚本在多少分钟、小时、天、星期几、月时间上执行，类似如crontab的中的设置。
&lt;key&gt;StartInterval&lt;/key&gt;
&lt;integer&gt;3600&lt;/integer&gt;
或者
&lt;key&gt;StartCalendarInterval&lt;/key&gt;
&lt;dict&gt;
&nbsp;&nbsp;&lt;key&gt;Minute&lt;/key&gt;
&nbsp;&nbsp;&lt;integer&gt;30&lt;/integer&gt;
&nbsp;&nbsp;&lt;key&gt;Hour&lt;/key&gt;
&nbsp;&nbsp;&lt;integer&gt;9&lt;/integer&gt;
&lt;/dict&gt;
launchctl的命令使用大家看一下帮助文档。
由于操作还是比较复杂，为了帮助快速执行，写了个shell快速拷贝新的plist并完成服务重启
__path='/Users/hanlingzhi/project/applescript'
__plist_path=${__path}/plist
__launchagents_path='/Users/hanlingzhi/Library/LaunchAgents'
# 拷贝plist到用户自己定义的任务项目录
cp&nbsp;-rf ${__plist_path}/* ${__launchagents_path}
# 根据plist中的文件遍历load
for&nbsp;plist_file&nbsp;in&nbsp;`ls&nbsp;${__plist_path}`
do
&nbsp;&nbsp;&nbsp;&nbsp;echo&nbsp;"重启${plist_file}定时任务"
&nbsp;&nbsp;&nbsp;&nbsp;launchctl unload ${__launchagents_path}/${plist_file}
&nbsp;&nbsp;&nbsp;&nbsp;sleep&nbsp;0.5
&nbsp;&nbsp;&nbsp;&nbsp;launchctl load ${__launchagents_path}/${plist_file}
&nbsp;&nbsp;&nbsp;&nbsp;task_name=`echo&nbsp;${plist_file} |&nbsp;sed&nbsp;'s/.plist//g'`
&nbsp;&nbsp;&nbsp;&nbsp;launchctl list |&nbsp;grep&nbsp;${task_name}
done
&nbsp;
总结一下
虽然plist的设置会复杂很多。但是当前在mac os还是倾向于推荐使用Plist的方法，crontab已不推荐使用。
两者的区别：
1、plist可以设置到秒，而crontab只能到分钟。
2、plist可以同时应用于Mac OS/Iphone。
3、plist对于MAC上系统交互的操作更支持(我就出现过用crontab设置，运行时出现execution error: 不允许用户交互。 (-1713)的错误)
</pre><p><br></p>