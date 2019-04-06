---
layout:     post
title:      "Ruby用Net::SMTP发送邮件"
date:       2015-12-22 15:27:56 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

一个简单的ruby发送邮件的类，以及一个发送带附件邮件的方法
<pre class="lang:ruby decode:true ">#encoding : UTF-8

require 'net/smtp' 

class Email

	def send(to_mail,subj,msg_body)
		#Senders and Recipients 
		from_name = '刘白菜&apos; 
		from_mail = 'liubaicai@163.com'

		#Servers and Authentication 
		smtp_host   = 'smtp.163.com' 
		smtp_port   = 25 
		smtp_domain = '163.com' 
		smtp_user   = 'liubaicai@163.com' 
		smtp_pwd    = 'liubaicai' 

		#The subject and the message 
		
		#The date/time should look something like: Thu, 03 Jan 2006 12:33:22 -0700 
		t = Time.now 
		msg_date = t.strftime("%a, %d %b %Y %H:%M:%S +0800") 

		#Compose the message for the email 
msg = &lt;&lt;END_OF_MESSAGE 
Date: #{msg_date} 
From: #{from_name} &lt;#{from_mail}&gt; 
To: #{to_mail}
Subject: #{subj}

#{msg_body}
END_OF_MESSAGE

		Net::SMTP.start(smtp_host, smtp_port, smtp_domain, smtp_user, smtp_pwd, :plain) do |smtp| 
  			smtp.send_message msg, smtp_user, to_mail 
		end 
	end

end

Email.new.send('liubaicai@qq.com','Sending 邮件','测试测试')</pre>
发送带附件的邮件的方法：
<pre class="lang:ruby decode:true">require 'net/smtp'
  
filename = "/tmp/test.txt"
# 读取文件并编码为base64格式
filecontent = File.read(filename)
encodedcontent = [filecontent].pack("m")  # base64
  
marker = "AUNIQUEMARKER"
  
body =&lt;&lt;EOF
This is a test email to send an attachement.
EOF
  
# 定义主要的头部信息
part1 =&lt;&lt;EOF
From: Private Person &lt;me@fromdomain.net&gt;
To: A Test User &lt;test@todmain.com&gt;
Subject: Sending Attachement
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=#{marker}
--#{marker}
EOF
  
# 定义消息动作
part2 =&lt;&lt;EOF
Content-Type: text/plain
Content-Transfer-Encoding:8bit
  
#{body}
--#{marker}
EOF
  
# 定义附件部分
part3 =&lt;&lt;EOF
Content-Type: multipart/mixed; name=\"#{filename}\"
Content-Transfer-Encoding:base64
Content-Disposition: attachment; filename="#{filename}"
  
#{encodedcontent}
--#{marker}--
EOF
  
mailtext = part1 + part2 + part3
  
# 发送邮件
begin
 Net::SMTP.start('localhost') do |smtp|
   smtp.sendmail(mailtext, 'me@fromdomain.net',
             ['test@todmain.com'])
 end
rescue Exception =&gt; e 
 print "Exception occured: " + e 
end</pre>