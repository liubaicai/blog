---
layout:     post
title:      "WP开发-开启推送通知Notification工具类 附服务端设置"
date:       2013-07-05 06:40:02 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="prettyprint lang-cs">public class Notification
    {
        #region Property
        private string ChannelName { get; set; }
        private string ServiceName { get; set; }
        private string AddUrl { get; set; }//开启推送向服务器发送微软返回的地址
        private string DelUrl { get; set; }//关闭推送时通知自己的服务器
        private string UserAgent { get; set; }
        private HttpNotificationChannel NotificationChannel { get; set; }
        #endregion

        public Notification(string channelName, string seviceName, string addUrl, string delUrl, string userAgent)
        {
            ChannelName = channelName;
            ServiceName = seviceName;
            AddUrl = addUrl;
            DelUrl = delUrl;
            UserAgent = userAgent;
        }

        #region method
        public void Connect()
        {
            try
            {
                NotificationChannel = HttpNotificationChannel.Find(ChannelName);
                if (NotificationChannel != null)
                {
                    NotificationChannel.Close();
                    NotificationChannel.Dispose();
                }
                NotificationChannel = new HttpNotificationChannel(ChannelName, ServiceName);
                SetChannelEvents();
                NotificationChannel.Open();
                NotificationChannel.BindToShellToast();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }

        public void Disconnect()
        {
            try
            {
                NotificationChannel = HttpNotificationChannel.Find(ChannelName);

                if (NotificationChannel != null)
                {
                    try
                    {
                        new HttpHelper(UserAgent).request(string.Format(DelUrl + "&amp;url=" + Uri.EscapeDataString(NotificationChannel.ChannelUri.ToString())), null, null);
                    }
                    catch { }
                    if (NotificationChannel.IsShellToastBound)
                    {
                        NotificationChannel.UnbindToShellToast();
                    }
                    NotificationChannel.Close();
                    NotificationChannel.Dispose();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            finally
            {
                NotificationChannel = null;
            }
        }

        private void SetChannelEvents()
        {
            NotificationChannel.ChannelUriUpdated += new EventHandler&lt;NotificationChannelUriEventArgs&gt;(httpChannel_ChannelUriUpdated);
            NotificationChannel.ErrorOccurred += new EventHandler&lt;NotificationChannelErrorEventArgs&gt;(httpChannel_ErrorOccurred);
            NotificationChannel.HttpNotificationReceived += new EventHandler&lt;HttpNotificationEventArgs&gt;(httpChannel_HttpNotificationReceived); 
            NotificationChannel.ShellToastNotificationReceived += new EventHandler&lt;NotificationEventArgs&gt;(httpChannel_ShellToastNotificationReceived);
        }
        #endregion

        #region Privates

        //Toast推送
        private void httpChannel_ShellToastNotificationReceived(object sender, NotificationEventArgs e)
        {
        }
        //RAW推送
        private void httpChannel_HttpNotificationReceived(object sender, HttpNotificationEventArgs e)
        {
        }
        //申请推送api错误
        private void httpChannel_ErrorOccurred(object sender, NotificationChannelErrorEventArgs e)
        {
        }
        //申请推送api成功
        private void httpChannel_ChannelUriUpdated(object sender, NotificationChannelUriEventArgs e)
        {
            try
            {
                string url = string.Format(AddUrl + "?url=" + Uri.EscapeDataString(e.ChannelUri.ToString()));
                new HttpHelper(UserAgent).request(url, null, null);
            }
            catch { }
        }
        #endregion</pre>
<pre class="prettyprint lang-cs">HttpHelper类是一个HTTP请求的辅助类 参见：&lt;a href="http://blog.liubaicai.com/?p=67">http://blog.liu<span id="__kindeditor_bookmark_start_0__"></span>baicai.com/?p=67</a></pre>
<pre class="prettyprint lang-cs">服务器端设置参见Demo：&lt;a href="http://files.cnblogs.com/liubaicai/WebCast20101203_Demo.zip">http://files.cnblogs.com/liubaicai/WebCast20101203_Demo.zip</a></pre>