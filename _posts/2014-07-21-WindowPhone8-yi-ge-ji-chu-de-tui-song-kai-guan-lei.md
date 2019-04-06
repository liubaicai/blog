---
layout:     post
title:      "WindowPhone8一个基础的推送开关类"
date:       2014-07-21 02:20:38 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="brush:csharp;">
using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Notification;

namespace Tools.Notification
{
    internal class NotificationBase
    {
        #region 参数
        private string _channelName = "Baicai";
        private string _serviceName = "BaicaiPushService";

        internal HttpNotificationChannel NotificationChannel { get; private set; }
        #endregion

        #region 构造函数
        private static NotificationBase _instance;

        internal NotificationBase CreateInstance(string channelName, string serviceName)
        {
            if (_instance==null)
            {
                _instance = new NotificationBase();
            }

            _instance._channelName = channelName;
            _instance._serviceName = serviceName;

            return _instance;
        }
        #endregion

        #region 推送地址获取
        internal event EventHandler&lt;UriEventArgs&gt; UriOpenOrUpdated;

        protected virtual void OnUriOpenOrUpdated(UriEventArgs e)
        {
            EventHandler&lt;UriEventArgs&gt; handler = UriOpenOrUpdated;
            if (handler != null) handler(this, e);
        }

        internal event EventHandler ChannelClosed;

        protected virtual void OnChannelClosed()
        {
            EventHandler handler = ChannelClosed;
            if (handler != null) handler(this, EventArgs.Empty);
        }

        #endregion

        #region 外部方法
        /// &lt;summary&gt;
        /// 开启推送
        /// &lt;/summary&gt;
        internal void Connect()
        {
            NotificationChannel = HttpNotificationChannel.Find(_channelName);
            if (NotificationChannel != null)
            {
                if (NotificationChannel.ChannelUri != null)
                {
                    OnUriOpenOrUpdated(new UriEventArgs(true, NotificationChannel.ChannelUri, null));
                }
            }
            else
            {
                NotificationChannel = new HttpNotificationChannel(_channelName, _serviceName);
            }
            if (!NotificationChannel.IsShellTileBound)
            {
                NotificationChannel.BindToShellTile();
            }
            if (!NotificationChannel.IsShellToastBound)
            {
                NotificationChannel.BindToShellToast();
            }
            NotificationChannel.ChannelUriUpdated += 
				(sender, args) =&gt; OnUriOpenOrUpdated(new UriEventArgs(true, args.ChannelUri, null));
            NotificationChannel.Open();
        }

        /// &lt;summary&gt;
        /// 关闭推送
        /// &lt;/summary&gt;
        internal void DisConnect()
        {
            if (NotificationChannel != null)
            {
                NotificationChannel.Close();
                NotificationChannel.Dispose();
                NotificationChannel = null;
            }
            OnChannelClosed();
        }
        #endregion
    }

    public class UriEventArgs : EventArgs
    {
        public bool IsSuccess { get; set; }
        public Uri Uri { get; set; }
        public Exception Exception { get; set; }

        public UriEventArgs(bool isSuccess, Uri uri, Exception exception)
        {
            IsSuccess = isSuccess;
            Uri = uri;
            Exception = exception;
        }
    }
}
</pre>

<p>
	&nbsp;
</p>