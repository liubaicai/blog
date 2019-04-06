---
layout:     post
title:      "WP8程序内禁止截图"
date:       2014-04-14 10:29:16 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="brush:csharp;">
public static class PhoneApplicationPageExtensionMethods
{
    public static bool CanSetScreenCaptureEnabled(this PhoneApplicationPage page)
    {
        return Environment.OSVersion.Version &gt;= new Version(8, 0, 10322);
    }

    public static void SetScreenCaptureEnabled(this PhoneApplicationPage page, bool enabled)
    {
        var propertyInfo = typeof(PhoneApplicationPage).GetProperty("IsScreenCaptureEnabled");

        if (propertyInfo == null)
        {
            throw new NotSupportedException("Not supported in this Windows Phone version!");
        }

        propertyInfo.SetValue(page, enabled);
    }

    public static bool GetScreenCaptureEnabled(this PhoneApplicationPage page)
    {
        var propertyInfo = typeof(PhoneApplicationPage).GetProperty("IsScreenCaptureEnabled");

        if (propertyInfo == null)
        {
            throw new NotSupportedException("Not supported in this Windows Phone version!");
        }

        return (bool)propertyInfo.GetValue(page);
    }
}</pre>

<pre class="brush:csharp;">
public partial class MainPage : PhoneApplicationPage
{
    public MainPage()
    {
        InitializeComponent();

        if (this.CanSetScreenCaptureEnabled())
        {
            this.SetScreenCaptureEnabled(false);
        }
    }
}</pre>

<p>
	&nbsp;
</p>