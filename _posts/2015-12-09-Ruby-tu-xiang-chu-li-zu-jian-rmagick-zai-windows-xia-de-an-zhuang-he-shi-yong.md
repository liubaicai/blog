---
layout:     post
title:      "Ruby图像处理组件rmagick在windows下的安装和使用"
date:       2015-12-09 15:33:40 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p><p>windows下安装rmagick比较麻烦

</p><p>安装 DevKit，这个DevKit就是Ruby在windows下调用的编译器 : https://github.com/oneclick/rubyinstaller/wiki/Development-Kit
</p><p>安装 ImageMagick，勾选安装头文件，目录不要带空格。 http://www.imagemagick.org/script/binary-releases.php/#windows
</p><p>设置到环境变量
</p><pre class="lang:sh decode:true">set DFImageMagick ImageMagick的安装目录
set PATH=%DFImageMagick%;%PATH% 
set CPATH=%DFImageMagick%\include;%CPATH%
set LIBRARY_PATH=%DFImageMagick%\lib;%LIBRARY_PATH%</pre>
安装 RMagick : gem install rmagick
</p><p>
校验一下安装的结果：
</p><p>
A. convert -version
显示ImageMagick的版本
</p><p>B. gem list –local

输出中应该包含 rmagick 2.13.1
</p><p>进入irb 测试
require ‘rmagick’
应该输出 ‘true’

</p><p>使用RMagick，重要会用到两个对象：Image和Draw。
<pre class="lang:ruby decode:true  ">#encoding : UTF-8

require 'rmagick'

img = Magick::Image.read('D:\\demo4.jpg').first
thumb = img.resize_to_fit(1280)
thumb.write('D:\\demo4.thumb.jpg') {self.quality = 50}

puts 'down'</pre>
Magick::Image的resize有数种方法
<pre class="lang:xhtml decode:true ">#resize ⇒ Object
Scale an image to the desired dimensions using the specified filter and blur factor.

#resize_to_fill(ncols, nrows = nil, gravity = CenterGravity) ⇒ Object (also: #crop_resized)
Force an image to exact dimensions without changing the aspect ratio.

#resize_to_fit(cols, rows = nil) ⇒ Object
Convenience method to resize retaining the aspect ratio.</pre>
更多用法：http://www.rubydoc.info/gems/rmagick/2.15.4/Magick<p></p></p>