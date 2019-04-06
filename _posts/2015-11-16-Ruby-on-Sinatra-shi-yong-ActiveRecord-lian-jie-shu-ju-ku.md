---
layout:     post
title:      "Ruby on Sinatra:使用ActiveRecord连接数据库"
date:       2015-11-16 16:12:58 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

Active Record 是 &lt;a href="http://guides.ruby-china.org/getting_started.html#the-mvc-architecture">MVC</a> 中的 M（模型），处理数据和业务逻辑。Active Record 负责创建和使用需要持久存入数据库中的数据。Active Record 实现了 Active Record 模式，是一种对象关系映射系统。

使用方式：
<h3>加载ActiveRecord配置</h3>
<pre class="lang:ruby decode:true">#ActiveRecord::Base.establish_connection(:adapter =&gt; "mysql2",
#:host =&gt; "localhost", :database =&gt; "mysql",
#:username =&gt; "root", :password =&gt; "root")
dbconfig = YAML.load(File.open('config/database.yml'))['production']&amp;nbsp;
ActiveRecord::Base.establish_connection(dbconfig)
</pre>
adapter指定了连接时的驱动，如sqlite,mysql等
<h3>建立相应的类</h3>
<pre class="lang:ruby decode:true">class PromoteApp &lt; ActiveRecord::Base
	self.table_name = "promote_app"
	self.primary_key = "_id"
end</pre>
建立的类名和数据库名最好符合相应的规范，这样就能自动对应上，否则需要指定table_name，如果主键不是id，还需要手动指定主键。
<pre class="lang:sh decode:true">#数据表名：复数，下划线分隔单词（例如 book_clubs）
#模型类名：单数，每个单词的首字母大写（例如 BookClub）&lt;/pre>
<h3>增删改查</h3>
<h4>新增数据</h4>
<pre class="lang:ruby decode:true">user = User.create(name: "David", occupation: "Code Artist")
#或者
user = User.new
user.name = "David"
user.occupation = "Code Artist"
user.save</pre>
<h4>查询数据</h4>
<pre class="lang:ruby decode:true"># return a collection with all users
users = User.all

# return the first user
user = User.first

# return the first user named David
david = User.find_by(name: 'David')

# find all users named David who are Code Artists and sort by created_at
# in reverse chronological order
users = User.where(name: 'David', occupation: 'Code Artist').order('created_at DESC')

#按created_at倒叙排列,从第11个数据开始取5个
users = User.order("created_at DESC").limit(5).offset(10)</pre>
<h4>修改数据</h4>
<pre class="lang:ruby decode:true">user = User.find_by(name: 'David')
user.name = 'Dave'
user.save
#或
user = User.find_by(name: 'David')
user.update(name: 'Dave')</pre>
<h4>删除数据</h4>
<pre class="lang:ruby decode:true ">user = User.find_by(name: 'David')
user.destroy</pre>
更多信息:http://guides.ruby-china.org/active_record_basics.html