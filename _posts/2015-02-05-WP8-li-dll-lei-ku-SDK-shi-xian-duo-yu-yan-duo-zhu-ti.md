---
layout:     post
title:      "WP8里dll类库(SDK)实现多语言多主题"
date:       2015-02-05 10:16:12 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	<span style="font-family:comic sans ms,cursive;">近日在做一个sdk项目，因为要实现多语言切换，单独类库多语言这方面的实现不是很多，故整理如下。&lt;/span>
</p>

<h2>
	<span style="font-family:comic sans ms,cursive;">1.添加AppResource.resx(英文)和AppResource-zh-CN.resx&nbsp;</span>
</h2>

<p>
	<span style="font-family:comic sans ms,cursive;">假设我们默认语言是英文，添加这两个文件。两个资源文件中均添加&amp;nbsp;UserCenter_Title 字段，并给其赋值。注意访问修饰符设置成public。&lt;/span>
</p>

<p>
	<span style="font-family:comic sans ms,cursive;">如果是要实现多主题的话，可相应添加图片等资源。&lt;/span>
</p>

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2015/02/20150205180508.jpg"><img alt="20150205180508" class="alignnone size-medium wp-image-431" height="97" src="http://www.liubaicai.net/wp-content/uploads/2015/02/20150205180508-300x97.jpg" width="300" /></a>
</p>

<h2>
	<span style="font-family:comic sans ms,cursive;">2.添加LocalizedStrings类&lt;/span>
</h2>

<p>
	<span style="font-family:comic sans ms,cursive;">继承INotifyPropertyChanged并实现，最终代码可能如下&lt;/span>
</p>

<pre class="brush:csharp;">
public class AdeasygoLocalizedStrings : INotifyPropertyChanged
    {
        private static AppResource _localizedResources = new AppResource();

        public AppResource AdeasygoLocalizedResource
        {

            get
            {

                return _localizedResources;

            }

            set
            {

                _localizedResources = value;

                NotifyPropertyChanged("AdeasygoLocalizedResource");

            }

        }

        public event PropertyChangedEventHandler PropertyChanged;
        public void NotifyPropertyChanged(string propertyName)
        {
            if (this.PropertyChanged != null)
            {
                this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    }</pre>

<h2>
	<span style="font-family:comic sans ms,cursive;"><span style="color:#FF0000;">3.修改AppResource.Designer.cs</span></span>
</h2>

<p>
	<span style="font-family:comic sans ms,cursive;">这一步非常重要，添加ResourceManager属性的Set方法，以支持语言的动态切换：</span>
</p>

<pre class="brush:csharp;">
/// &lt;summary&gt;
        ///   返回此类使用的缓存的 ResourceManager 实例。
        /// &lt;/summary&gt;
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("Adeasygo.Community.Sdk.Resources.AppResource", typeof(AppResource).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
            set { resourceMan = value; }
        }</pre>

<h2>
	<span style="font-family:comic sans ms,cursive;">4.控制语言(主题)切换</span>
</h2>

<pre class="brush:csharp;">
public static void Init(string lang = "en")
        {
            ResourceManager resManager;
            switch (lang)
            {
                case "zh":
                    resManager = new ResourceManager("Sdk.Resources.AppResource-zh-CN", Assembly.Load("Sdk"));
                    break;
                default:
                    resManager = new ResourceManager("Sdk.Resources.AppResource", Assembly.Load("Sdk"));
                    break;
            }
            AppResource.ResourceManager = resManager;
        }</pre>

<p>
	<span style="color:#0000FF;"><span style="font-size:20px;"><span style="font-family:comic sans ms,cursive;">如此就实现了类库中动态的语言切换，图像资源等，也可以定义在resx中实现根据语言变化或者多主题切换。&lt;/span></span></span>
</p>