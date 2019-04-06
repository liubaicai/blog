---
layout:     post
title:      "客户端向MVC4  WEBAPI发送POST数据并获取返回值"
date:       2013-07-06 12:52:04 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	POST发送:
</p>
<pre class="prettyprint lang-cs">HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(new Uri(PostInitUrl));
                httpWebRequest.ContentType = "application/json; charset=utf-8";
                httpWebRequest.Method = "POST";
                httpWebRequest.BeginGetRequestStream((IAsyncResult streamCallback) =&gt;
                {
                    try
                    {
                        HttpWebRequest webRequest = streamCallback.AsyncState as HttpWebRequest;
                        byte[] buffer = Encoding.UTF8.GetBytes(Serializer&lt;UserDevice&gt;(ud));
                        Stream stream = webRequest.EndGetRequestStream(streamCallback);
                        stream.Position = 0;
                        stream.Write(buffer, 0, buffer.Length);
                        stream.Close();
                        webRequest.BeginGetResponse((IAsyncResult responseCallback) =&gt;
                        {
                            try
                            {
                                HttpWebRequest webRequest2 = responseCallback.AsyncState as HttpWebRequest;
                                HttpWebResponse webResponse = (HttpWebResponse)webRequest2.EndGetResponse(responseCallback);
                                Stream streamResponse = webResponse.GetResponseStream();
                                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(Result));
                                Result cr = ser.ReadObject(streamResponse) as Result;
                                if (cr.code == 1)
                                {
                                    action(true, null);
                                }
                                else
                                {
                                    action(false, new Exception(cr.msg));
                                }
                            }
                            catch (Exception e2)
                            {
                                action(false, e2);
                            }
                        }, webRequest);
                    }
                    catch (Exception e1)
                    {
                        action(false, e1);
                    }
                }, httpWebRequest);</pre>
<p>
	其中序列化的方法：
</p>
<pre class="prettyprint lang-cs">private static string Serializer&lt;T&gt;(T t)
        {
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            MemoryStream ms = new MemoryStream();
            ser.WriteObject(ms, t);
            byte[] array = ms.ToArray();
            string jsonString = Encoding.UTF8.GetString(array, 0, array.Length);
            ms.Close();
            return jsonString;
        }</pre>
<p>
	服务端接收数据并返回结果：
</p>
<pre class="prettyprint lang-cs">public Result Post([FromBody]UserDevice userDevice)
{
      if (userDevice != null &amp;&amp; userDevice.deviceUniqueId != null)
      {
          return new Result(1, "OK");
      }
      else
      {
          return new Result(0, "参数错误");
      }
}</pre>
<p>
	&nbsp;
</p>