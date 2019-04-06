---
layout:     post
title:      "summernote使用onImageUpload上传图片的问题"
date:       2016-04-23 16:20:41 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

最新版可能之前的方法失效了。经过查阅源码，发现需要注册callback，下面的方法可行：
<pre class="lang:js decode:true ">$(document).ready(function() {
      $('#summernote').summernote({
        height: "200px",
        callbacks: {
          onImageUpload: function(files) {
            var $editor = $(this);
            var data = new FormData();
            data.append('fileup', files[0]);
            $.ajax({
              url: '/image/upload',
              method: 'POST',
              data: data,
              processData: false,
              contentType: false,
              success: function(url) {
                $editor.summernote('insertImage', url);
              }
            });
          }
        }
      });
    });</pre>
<h3 id="onimageupload">onImageUpload</h3>
Override image upload handler(default: base64 dataURL on <code class="highlighter-rouge">IMG</code> tag). You can upload image to server or AWS S3: <a href="https://github.com/summernote/summernote/issues/72">more…&lt;/a>
<pre class="lang:js decode:true">// onImageUpload callback
$('#summernote').summernote({
  callbacks: {
    onImageUpload: function(files) {
      // upload image to server and create imgNode...
      $summernote.summernote('insertNode', imgNode);
    }
  }
});

// summernote.image.upload
$('#summernote').on('summernote.image.upload', function(we, files) {
  // upload image to server and create imgNode...
  $summernote.summernote('insertNode', imgNode);
});</pre>
下面有个demo：

<a href="https://output.jsbin.com/taxire">https://output.jsbin.com/taxire</a>