---
layout:     post
title:      "Ruby使用ActiveRecord通过设置外键联表查询"
date:       2015-12-31 15:09:14 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

文章介绍了ruby使用active record开发数据库应用中，通过设置外键，实现联表查询的功能。

如有以下需求：

一个用户表，含有id,name,type_id三个字段，type_id设置外键，关联另一个type表。

type表两个字段，id,name。

如果想在查询user时同时查出type_id所代表的type name，则需要以下方法：
<pre class="lang:ruby decode:true"># encoding : UTF-8

require 'mysql2'
require 'active_record'

# 连接数据库
ActiveRecord::Base.establish_connection(
	:adapter =&gt; "mysql2", 
	:host =&gt; "192.168.1.151", 
	:database =&gt; "test", 
	:username =&gt; "test", 
	:password =&gt; "123456")

# User表
class User &lt; ActiveRecord::Base
	self.table_name = "user"
	self.primary_key = "id"

	#设置关联关系，指定外键
	belongs_to :type, foreign_key: "type_id"
end

# Type表
class Type &lt; ActiveRecord::Base
	self.table_name = "type"
	self.primary_key = "id"
end

# 查询某用户
user = User.find(1)

# 此时用户中会自动添加type属性
# 则可得到相对应的name值
puts user.type.name</pre>
其中belongs_to就是一种两个 Active Record 模型之间的关联类型。

ActiveRecord声明一个模型属于（<code>belongs_to</code>）另一个模型后，会维护两个模型之间的“主键-外键”关系，而且还向模型中添加了很多实用的方法。

ActiveRecord支持六种关联：
<ul>
	<li><code>belongs_to</code></li>
	<li><code>has_one</code></li>
	<li><code>has_many</code></li>
	<li><code>has_many :through</code></li>
	<li><code>has_one :through</code></li>
	<li><code>has_and_belongs_to_many</code></li>
</ul>
Active Record 的关联功能还是挺复杂的，这里只是介绍了最简单的一种情况，更详细的功能查阅文档：&lt;a href="http://guides.ruby-china.org/association_basics.html" target="_blank">点这里&lt;/a>