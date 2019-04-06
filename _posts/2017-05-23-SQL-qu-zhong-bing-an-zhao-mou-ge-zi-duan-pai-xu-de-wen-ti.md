---
layout:     post
title:      "SQL去重并按照某个字段排序的问题"
date:       2017-05-23 05:33:56 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p><br></p><pre>select book_id,min(catalog_id) as catalog_id
from catalogs
group by book_id
order by catalog_id desc
select a.*,b.book_id,catalog_id,c.title as category_title from books a inner join 
(select book_id,max(catalog_id) as catalog_id 
from catalogs 
group by book_id 
order by catalog_id desc
limit 10) b on a.id = b.book_id
inner join categories c on a.category_id = c.id
order by catalog_id desc
</pre><p><img src="http://7xpagu.com1.z0.glb.clouddn.com/yhsmff7jqhb1vz3hk7dw8h.jpg-500p"></p><p><br></p>