---
layout:     post
title:      "WP8中使用async/await扩展HttpWebRequest"
date:       2014-04-03 16:53:28 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	<a href="http://blog.liubaicai.com/?p=192">前文</a>讲到WP8中使用Async执行HTTP请求，用了微软提供的扩展。下面提供了一种方法，自己实现HttpWebRequest的扩展。
</p>

<p>
	namespace HttpExtensions<br />
	{<br />
	&nbsp; &nbsp; public static class WebRequestExtensions<br />
	&nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; public async static Task&lt;WebResponse&gt; GetResponseAsync(this HttpWebRequest request)<br />
	&nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; return await Task&lt;WebResponse&gt;.Factory.FromAsync(request.BeginGetResponse, request.EndGetResponse, request);<br />
	&nbsp; &nbsp; &nbsp; &nbsp; }
</p>

<p>
	&nbsp; &nbsp; &nbsp; &nbsp; public async static Task&lt;Stream&gt; GetRequestStreamAsync(this HttpWebRequest request)<br />
	&nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; return await Task&lt;Stream&gt;.Factory.FromAsync(request.BeginGetRequestStream, request.EndGetRequestStream, request);<br />
	&nbsp; &nbsp; &nbsp; &nbsp; }<br />
	&nbsp; &nbsp; }<br />
	}
</p>

<p>
	随后就可以使用 await&nbsp;<span style="line-height: 1.6em;">HttpWebRequest.</span><span style="line-height: 1.6em;">GetResponseAsync() 轻松使用http请求了。&lt;/span>
</p>

<p>
	附带一个WebClient的扩展
</p>

<p>
	namespace HttpExtensions<br />
	{<br />
	&nbsp; &nbsp; public static class WebClientExtensions<br />
	&nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; public async static Task&lt;Stream&gt; GetStreamAsync(this WebClient webClient, Uri uri)<br />
	&nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; var tcs = new TaskCompletionSource&lt;Stream&gt;();
</p>

<p>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; webClient.OpenReadCompleted += (s, e) =&gt;<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (e.Error != null)<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; tcs.SetException(e.Error);<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; else<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; tcs.SetResult(e.Result);<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; };<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; webClient.OpenReadAsync(uri);
</p>

<p>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; return await tcs.Task;<br />
	&nbsp; &nbsp; &nbsp; &nbsp; }
</p>

<p>
	&nbsp; &nbsp; &nbsp; &nbsp; public async static Task&lt;string&gt; GetStringAsync(this WebClient webClient, Uri uri)<br />
	&nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; var tcs = new TaskCompletionSource&lt;string&gt;();
</p>

<p>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; webClient.DownloadStringCompleted += (s, e) =&gt;<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (e.Error != null)<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; tcs.SetException(e.Error);<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; else<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; tcs.SetResult(e.Result);<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; };<br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; webClient.DownloadStringAsync(uri);
</p>

<p>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; return await tcs.Task;<br />
	&nbsp; &nbsp; &nbsp; &nbsp; }<br />
	&nbsp; &nbsp; }<br />
	}
</p>