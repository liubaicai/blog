---
layout:     post
title:      "WindowsPhone8中实现圆形图片的生成显示"
date:       2013-12-20 03:31:35 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	很多软件中(比如QQ)用到了许多圆形图片，作为用户头像等等，原始图片往往是方形的，那么怎么样将方形的图片显示成圆形呢？
</p>

<p>
	一种方法是当背景为固定纯色的时候，可以使用同背景色的边框遮罩，这种方法适用性小，这里不再赘述。
</p>

<p>
	我的做法是使用ArcSegment的功能来实现圆形图片的显示，ArcSegment派生自PathSegment，&amp;ldquo;~派生自 PathSegment 的类（例如 ArcSegment、BezierSegment 和 LineSegment），表示特定类型的几何图形段。&amp;rdquo;
</p>

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2013/12/20140109173026.png"><img alt="20140109173026" class="alignnone size-full wp-image-257" height="247" src="http://www.liubaicai.net/wp-content/uploads/2013/12/20140109173026.png" width="257" /></a>
</p>

<p>
	<a href="http://msdn.microsoft.com/zh-cn/library/vstudio/system.windows.media.pathsegment(v=vs.110).aspx">PathSegment微软文档介绍</a>
</p>

<p>
	思路来源于这篇文章:<a href="http://blog.sina.com.cn/s/blog_7d596c170101arhj.html">WP8实现图片任意形状剪裁（C#代码实现）&lt;/a>
</p>

<p>
	主要实现代码：
</p>

<pre class="brush:csharp;">
                PathGeometry pg = new PathGeometry();

                PathFigure pf1 = new PathFigure();
                pf1.StartPoint = new Point(0, height / 2);
                pf1.Segments.Add(new ArcSegment()
                {
                    IsLargeArc = true,
                    Point = new Point(width, height / 2),
                    Size = new Size(width / 4, height / 4),
                });
                pg.Figures.Add(pf1);

                PathFigure pf2 = new PathFigure();
                pf2.StartPoint = new Point(0, height / 2);
                pf2.Segments.Add(new ArcSegment()
                {
                    SweepDirection = SweepDirection.Clockwise,
                    IsLargeArc = true,
                    Point = new Point(width, height / 2),
                    Size = new Size(width / 4, height / 4),
                });
                pg.Figures.Add(pf2);

                image.Clip = pg;</pre>

<p>
	封装好的一个圆形图片控件：
</p>

<p>
	<a href="http://blog.liubaicai.com/wp-content/uploads/2013/12/CircleImage.zip">CircleImage</a>&nbsp;
</p>

<p>
	使用方法
</p>

<p>
	1:添加CircleImage.dll引用
</p>

<p>
	2:xmlns:CircleImage="clr-namespace:CircleImage;assembly=CircleImage"
</p>

<p>
	3:&lt;CircleImage:CircleImage Source="test.jpg" Width="400" Height="400"/&gt;
</p>