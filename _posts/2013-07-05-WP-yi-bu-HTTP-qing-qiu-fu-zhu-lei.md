---
layout:     post
title:      "WP异步HTTP请求辅助类"
date:       2013-07-05 06:35:23 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="prettyprint lang-cs">/// &lt;summary&gt;
    /// 异步HTTP请求辅助类
    /// &lt;/summary&gt;
    public class HttpHelper
    {
        public class HttpArgs
        {
            public HttpWebRequest request { set; get; }
            public string post { set; get; }
        }
        public HttpHelper(string userAgent)
        {
            UserAgent = userAgent;
        }
        public string Referer { set; get; }
        public string UserAgent { set; get; }
        public object Tag { set; get; }
        public String subString { set; get; }
        private HttpResponseDelegate httpResponseDelegate;
        public delegate void HttpResponseDelegate(HttpHelper sender, Stream stream);
        /// &lt;summary&gt;
        /// 开始一个请求
        /// &lt;/summary&gt;
        /// &lt;param name="url"&gt;网址&lt;/param&gt;
        /// &lt;param name="post"&gt;如果为NULL，则为GET请求&lt;/param&gt;
        /// &lt;param name="resp"&gt;回调方法&lt;/param&gt;
        public void request(string url, string post, HttpResponseDelegate resp)
        {

            Random random = new Random();
            if (url.Contains("?b") || url.Contains("&amp;b") || url.Contains("notic"))
            {
                request(new Uri(url), post, resp);
            }
            else
            {
                if (url.Contains("?"))
                {
                    subString = url + "&amp;b=" + random.Next(1000, 9000).ToString();
                }
                else
                {
                    subString = url + "?b=" + random.Next(1000, 9000).ToString();
                }
                request(new Uri(subString), post, resp);
            }
        }
        /// &lt;summary&gt;
        /// 开始一个请求
        /// &lt;/summary&gt;
        /// &lt;param name="url"&gt;网址&lt;/param&gt;
        /// &lt;param name="post"&gt;如果为NULL，则为GET请求&lt;/param&gt;
        /// &lt;param name="resp"&gt;回调方法&lt;/param&gt;
        public void request(Uri url, string post, HttpResponseDelegate resp)
        {
            httpResponseDelegate = resp;
            HttpWebRequest request = HttpWebRequest.Create(url) as HttpWebRequest;
            WebHeaderCollection whc = new WebHeaderCollection();
            if (Referer != null)
            {
                request.Headers[HttpRequestHeader.Referer] = Referer;
            }
            request.UserAgent = UserAgent;
            if (post != null)
            {
                request.ContentType = "application/x-www-form-urlencoded";
                request.Method = "POST";
                request.BeginGetRequestStream(requestReady, new HttpArgs() { request = request, post = post });
            }
            else
            {
                request.BeginGetResponse(responseReady, request);
            }
        }
        /// &lt;summary&gt;
        /// 准备
        /// &lt;/summary&gt;
        /// &lt;param name="result"&gt;&lt;/param&gt;
        private void requestReady(IAsyncResult result)
        {
            HttpArgs obj = result.AsyncState as HttpArgs;
            HttpWebRequest request = obj.request;
            String webpost = obj.post;

            var stream = request.EndGetRequestStream(result);
            using (StreamWriter writer = new StreamWriter(stream))
            {
                writer.Write(webpost);
                writer.Flush();
            }
            request.BeginGetResponse(responseReady, request);
        }
        private void responseReady(IAsyncResult result)
        {
            HttpWebRequest webrequest = result.AsyncState as HttpWebRequest;
            try
            {
                WebResponse response = webrequest.EndGetResponse(result);
                using (var stream = response.GetResponseStream())
                {
                    if (httpResponseDelegate != null)
                    {
                        httpResponseDelegate.Invoke(this, stream);
                    }
                }
                response.Close();
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                if (httpResponseDelegate != null)
                {
                    httpResponseDelegate.Invoke(this, null);
                }
            }
        }
    }</pre>