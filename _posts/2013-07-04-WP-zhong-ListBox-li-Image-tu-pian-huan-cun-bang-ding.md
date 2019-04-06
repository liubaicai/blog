---
layout:     post
title:      "WP中ListBox里Image图片缓存绑定"
date:       2013-07-04 15:33:19 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	如果想在ListBox中的Image绑定网络图片，同时将图片缓存，以便下次访问该图片时可以直接从独立存储中绑定，可以这么做：<br />
首先，新建一个继承自BitmapSource的类:StorageCachedImage
</p>
<pre class="prettyprint lang-cs">using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.IsolatedStorage;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Media.Imaging;

namespace Cache
{
    /// &lt;summary&gt;
    /// 独立存储缓存的图片源
    /// &lt;/summary&gt;
    public sealed class StorageCachedImage : BitmapSource
    {
        private readonly Uri uriSource;
        private readonly string filePath;
        private const string CacheDirectory = "ImageCache";

        static StorageCachedImage()
        {
            //创建缓存目录
            using (var isolatedStorageFile = IsolatedStorageFile.GetUserStoreForApplication())
            {
                if (!isolatedStorageFile.DirectoryExists(CacheDirectory))
                {
                    isolatedStorageFile.CreateDirectory(CacheDirectory);
                }
            }
        }

        /// &lt;summary&gt;
        /// 创建一个独立存储缓存的图片源
        /// &lt;/summary&gt;
        /// &lt;param name="uriSource"&gt;&lt;/param&gt;
        public StorageCachedImage(Uri uriSource)
        {
            this.uriSource = uriSource;

            //文件路径
            filePath = Path.Combine(CacheDirectory, uriSource.AbsolutePath.TrimStart('/').Replace('/', '_'));
            OpenCatchSource();
        }

        /// &lt;summary&gt;
        /// 打开缓存源
        /// &lt;/summary&gt;
        private void OpenCatchSource()
        {
            bool exist;
            using (var isolatedStorageFile = IsolatedStorageFile.GetUserStoreForApplication())
            {
                exist = isolatedStorageFile.FileExists(filePath);
            }
            if (exist)
            {
                SetCacheStreamSource();
            }
            else
            {
                SetWebStreamSource();
            }
        }

        /// &lt;summary&gt;
        /// 设置缓存流到图片
        /// &lt;/summary&gt;
        private void SetCacheStreamSource()
        {
            try
            {
                using (var isolatedStorageFile = IsolatedStorageFile.GetUserStoreForApplication())
                using (var stream = isolatedStorageFile.OpenFile(filePath, FileMode.Open, FileAccess.Read))
                {
                    SetSource(stream);
                }
            }
            catch
            {
            }
        }

        /// &lt;summary&gt;
        /// 下载Uri中的图片
        /// &lt;/summary&gt;
        private void SetWebStreamSource()
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(uriSource);
            httpWebRequest.AllowReadStreamBuffering = true;
            httpWebRequest.BeginGetResponse(ResponseCallBack, httpWebRequest);
        }

        /// &lt;summary&gt;
        /// 下载回调
        /// &lt;/summary&gt;
        /// &lt;param name="asyncResult"&gt;&lt;/param&gt;
        private void ResponseCallBack(IAsyncResult asyncResult)
        {
            var httpWebRequest = asyncResult.AsyncState as HttpWebRequest;
            if (httpWebRequest == null) return;
            try
            {
                var response = httpWebRequest.EndGetResponse(asyncResult);
                using (var stream = response.GetResponseStream())
                using (var isolatedStorageFile = IsolatedStorageFile.GetUserStoreForApplication())
                using (var fileStream = isolatedStorageFile.OpenFile
                    (filePath, FileMode.OpenOrCreate, FileAccess.Write))
                {
                    stream.CopyTo(fileStream);
                }
                Dispatcher.BeginInvoke(SetCacheStreamSource);
            }
            catch (Exception err)
            {
                Debug.WriteLine(err.Message);
            }
        }
    }

}</pre>
然后在数据绑定时，将Image的Source绑定至
<pre class="prettyprint lang-cs">public BitmapSource cacheImage
        {
            get
            {
                return new StorageCachedImage(new Uri(image_url));
            }
        }</pre>
同时不要加载太多图片，同时进行太多的下载和存储有可能会报异常，导致图片变空。
<p>
	经测试一次10个之内比较好
</p>
<p>
	&nbsp;
</p>
<p>
	<span style="color:#E53333;font-size:24px;">缓存清理</span>
</p>
<p>
	<span style="color:#000000;">由于使用缓存技术，可能导致占用空间逐渐增大，因此需要定时清理缓存&lt;br />
下面的代码可以清理制定目录中超过30天的缓存图片：&lt;/span>
</p>
<p>
<pre class="prettyprint lang-cs">public static void ClearCacheImageAuto()
        {
            try
            {
                using (IsolatedStorageFile isFile = IsolatedStorageFile.GetUserStoreForApplication())
                {
                    if (isFile.DirectoryExists("ImageCache"))
                    {
                        foreach (String str in isFile.GetFileNames("ImageCache/*.*"))
                        {
                            try
                            {
                                if (DateTimeOffset.Compare(isFile.GetLastAccessTime("ImageCache/" + str).AddDays(30), DateTimeOffset.Now) &lt; 0)
                                {
                                    isFile.DeleteFile("ImageCache/" + str);
                                }
                            }
                            catch { }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }</pre>
<span style="color:#000000;"></span>
</p>
<p>
	&nbsp;
</p>