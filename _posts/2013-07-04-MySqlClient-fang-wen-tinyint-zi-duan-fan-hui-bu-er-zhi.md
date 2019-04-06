---
layout:     post
title:      "MySqlClient访问tinyint字段返回布尔值"
date:       2013-07-04 15:22:39 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

症状:<br />
<br />
使用MySqlClient访问tinyint&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; unsign 字段返回布尔值 true 和&amp;nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; false,但是实际上该字段存储值为1-255<br />
分析:<br />
<br />
由于在Mysql中没有布尔类型值，MySqlClient在访问tinyint类型字段时默认作为布尔值使用。&lt;br />
<br />
解决:<br />
<br />
1.在连接串中增加&amp;nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Treat Tiny As Boolean=false&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 配置.<br />
<br />
2.对应字段在SQL语句中*1，这样,读取出的字段值默认会被转换成int类型.<br />
<br />
相关资料:<br />
<br />
　　根据官方文档&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10.1.1. Overview of Numeric Types ，在 MySql 中还没有严格的 bool 类型，但使用 TINYINT(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 隐式用作 bool 类型，零作为false，而非零值（包括负数）作为true。但，这是不对称的。在执行逻辑比较时，true 等于 1，false&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 等于 0，但 true 不等于 2。这个文档显示的 MySql 5.0，其他后续版本是否有严格的 bool 类型未知。&lt;br />
<br />
在 MySql&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Connector/Net 中，遵循了上面这个约定，假如某个字段类型是 tinyint(1)，则会被自动映射成 Boolean&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 类型。如果要禁用这个映射，可以在连接字符串中，配置 Treat Tiny As Boolean=false。这个选项的默认值是 true。参考&amp;nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 21.2.6. Connector/NET Connection String Options Reference 。没有查到这个选项从&amp;nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Connector/Net 哪个版本开始支持，应该是 Connector/Net 5.x 之后都支持。