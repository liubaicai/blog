---
layout:     post
title:      "解决多模块多程序集之间相互循环引用的问题一种思路"
date:       2014-09-03 03:39:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2014/09/ac.jpg"><img alt="ac" class="alignnone size-medium wp-image-360" height="300" src="http://www.liubaicai.net/wp-content/uploads/2014/09/ac-300x300.jpg" width="300" /></a>
</p>

<p>
	那就是利用mvvmlight中的messager组件(可单独提取出)，制作双向的一个消息发送。通过公共的类的定义，来传递数据。
</p>

<p>
	首先有一个数据提供者的概念，他负责对外提供接口。
</p>

<p>
	这个时候调用者如果想获取某个数据，就发送消息，数据提供者如果提供这个数据，就会响应。
</p>

<p>
	比如:A:我发送一个应用的ID，我想获取应用的详细数据。B:我提供接收ID返回详情的服务，我发回给你。
</p>

<p>
	核心组件:
</p>

<p>
	1：MVVMLight中的Messager组件
</p>

<p>
	2：DataProviderBase.cs 所有提供接口和数据的类必须继承的(以单例模式)，每一个类的RegisterInit方法需要在程序启动时候初始化。
</p>

<p>
	需要提供什么对外接口，就通过Register注册什么接口
</p>

<p>
	同时通过MessagerHandler添加对该接口数据的处理
</p>

<pre class="brush:csharp;">
    public abstract class DataProviderBase&lt;T&gt; where T : new()
    {
        private static T _instance;
        public static T Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new T();
                return _instance;
            }
        }

        public abstract void RegisterInit();

        public abstract Task&lt;IMessager&gt; MessagerHandler(IMessager messager);

        public void Register&lt;TRequest, TResponse&gt;()
            where TRequest : IMessager
            where TResponse : IMessager
        {
            Action&lt;TRequest&gt; requestAction = async messager =&gt;
            {
                var returnmessager = await MessagerHandler(messager);
                Messenger.Default.Send((TResponse)returnmessager);
            };
            Messenger.Default.Register(this, requestAction);
        }
    }</pre>

<p>
	3：IMessager.cs所有消息需要继承的接口
</p>

<pre class="brush:csharp;">
    public interface IMessager
    {
        int Code { set; get; }

        string Msg { set; get; }
    }</pre>

<p>
	4：MessagerCenter.cs提供发送数据的方法，由数据请求方使用
</p>

<pre class="brush:csharp;">
    public class MessagerCenter
    {
        public static void Send&lt;TRequest, TResponse&gt;(object recipient, IMessager requestMessager, Action&lt;TResponse&gt; action)
            where TRequest : IMessager
            where TResponse : IMessager
        {
            Messenger.Default.Unregister(recipient, action);
            Messenger.Default.Register(recipient, action);
            Messenger.Default.Send((TRequest)requestMessager);
        }
    }</pre>

<p>
	使用案例：我有一个数据提供者，传入应用详情ID，返回应用标题
</p>

<p>
	1:首先定义一组Messager
</p>

<pre class="brush:csharp;">
    public class AppDetailRequestMessager : IMessager
    {
        public int Code { get; set; }
        public string Msg { get; set; }
        public string Appid { get; set; }
    }

    public class AppDetailResponseMessager : IMessager
    {
        public int Code { get; set; }
        public string Msg { get; set; }
        public string AppTitle { get; set; }
    }</pre>

<p>
	2:添加AppDataProvider继承DataProviderBase，并实现方法
</p>

<pre class="brush:csharp;">
    public sealed class AppDataProvider : DataProviderBase&lt;appdataprovider&gt;
    {
        public override void RegisterInit()
        {
            Register&lt;AppDetailRequestMessager, AppDetailResponseMessager&gt;();
        }

        public async override Task&lt;IMessager&gt; MessagerHandler(IMessager messager)
        {
            if (messager is AppDetailRequestMessager)
            {
                var m = messager as AppDetailRequestMessager;
                var title = await getAppDetailTask(m.Appid);
                return new AppDetailResponseMessager() { Code = m.Code, Msg = m.Msg, AppTitle = title };
            }
            else
            {
                return null;
            }
        }

        private async Task&lt;string&gt; getAppDetailTask(string msg)
        {
            await Task.Delay(500);
            return "return:" + msg;
        }
    }</pre>

<p>
	3：在主程序启动或者初始化或者必要的时候执行注册
</p>

<pre class="brush:csharp;">
AppDataProvider.Instance.RegisterInit();</pre>

<p>
	这样数据提供者就完成了
</p>

<p>
	当如果有地方需要调用此接口，只需要调用发送方法并处理返回值就OK：
</p>

<pre class="brush:csharp;">
            MessagerCenter.Send&lt;AppDetailRequestMessager, AppDetailResponseMessager&gt;(this,
                new AppDetailRequestMessager() { Code = 1, Msg = "Test", Appid = "12315" },
                messager =&gt;
                {
                    Debug.WriteLine("=======================");
                    Debug.WriteLine(messager.AppTitle);
                    Debug.WriteLine("=======================");
                });</pre>

<p>
	这样就实现了不添加程序集引用就调用相关API的方法了。
</p>

<p>
	有不合理的地方欢迎交♂流~（包子,Paradox 提供部分技术支持~）
</p>