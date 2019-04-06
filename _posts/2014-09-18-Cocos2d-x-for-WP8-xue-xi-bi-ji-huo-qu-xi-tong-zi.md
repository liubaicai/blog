---
layout:     post
title:      "[Cocos2d-x for WP8学习笔记] 获取系统字体"
date:       2014-09-18 06:10:47 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	在Cocos2d-x for WP8较新的版本中，获取字体这一块，在wp8下默认返回了null，只能内嵌字体文件解决。 其实可以通过下面的方法获取系统的字体文件
</p>

<h2>
	<span style="color: #ff0000;">CCFreeTypeFont::loadSystemFont</span>
</h2>

<pre class="brush:cpp">
std::string fontName(pFontName);
if (fontName.find(".ttf") == -1)
        fontName += ".ttf";
CCLog("FontName:%s", fontName.c_str());
std::string fontPath = "C:\\Windows\\Fonts\\" + fontName;
return CCFileUtils::sharedFileUtils()-&gt;getFileData(fontPath.c_str(), "rb", size);</pre>