---
layout:     post
title:      "WP8.1中的MessageBox与MessageDialog"
date:       2014-04-16 17:36:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	在WP7和WP8中，MessageBox是跟WinForm中一样常用的对话框，但是有一个显著的缺点，就是WP7/8中默认的<span style="font-size: 13px;">MessageBox是阻塞线程的。也许是由于这个原因，WP8.1/Win8中采用了异步的&lt;/span>MessageDialog对话框， 其扩展性和可定制性更强。但是在很多情况下需要挂起线程等待用户响应或者是单纯怀念&lt;span style="font-size: 13px;">MessageBox的简单方便的使用方式。于是我封装了一下WP8.1中的MessageDialog，使其可以像MessageBox一样简单的使用。&lt;/span>
</p>

<pre class="brush:csharp;">
    public sealed class MessageBox
    {
        // 摘要: 
        //     显示包含指定文本和&amp;ldquo;确定&rdquo;按钮的消息框。
        //
        // 参数: 
        //   messageBoxText:
        //     要显示的消息。
        //
        // 异常: 
        //   System.ArgumentNullException:
        //     messageBoxText 为 null。
        public async static Task&lt;MessageBoxResult&gt; Show(string messageBoxText)
        {
            if (messageBoxText == null)
                throw new ArgumentNullException("messageBoxText is null");

            var tcs = new TaskCompletionSource&lt;MessageBoxResult&gt;();

            var dialog = new MessageDialog(messageBoxText);

            dialog.Commands.Add(new UICommand("确定", command =&gt;
            {
                tcs.SetResult((MessageBoxResult)command.Id);
            }, MessageBoxResult.OK));

            dialog.DefaultCommandIndex = 0;
            dialog.CancelCommandIndex = 0;

            await dialog.ShowAsync();

            return await tcs.Task;
        }

        //
        // 摘要: 
        //     显示包含指定文本、标题栏标题和响应按钮的消息框。
        //
        // 参数: 
        //   messageBoxText:
        //     要显示的消息。
        //
        //   caption:
        //     消息框的标题。
        //
        //   button:
        //     一个值，用于指示要显示哪个按钮或哪些按钮。
        //
        // 返回结果: 
        //     一个值，用于指示用户对消息的响应。
        //
        // 异常: 
        //   System.ArgumentNullException:
        //     messageBoxText 为 null。- 或 -caption 为 null。
        //
        //   System.ArgumentException:
        //     button 不是有效的 System.Windows.MessageBoxButton 值。
        public async static Task&lt;MessageBoxResult&gt; Show(string messageBoxText, string caption, MessageBoxButton button)
        {
            if (messageBoxText == null)
                throw new ArgumentNullException("messageBoxText is null");
            if (caption == null)
                throw new ArgumentNullException("caption is null");
            if (button != MessageBoxButton.OK &amp;&amp; button != MessageBoxButton.OKCancel)
                throw new ArgumentException("button is null");

            var tcs = new TaskCompletionSource&lt;MessageBoxResult&gt;();

            var dialog = new MessageDialog(messageBoxText,caption);

            dialog.Commands.Add(new UICommand("确定", command =&gt;
            {
                tcs.SetResult((MessageBoxResult)command.Id);
            }, MessageBoxResult.OK));

            if (button==MessageBoxButton.OKCancel)
            {
                dialog.Commands.Add(new UICommand("取消", command =&gt;
                {
                    tcs.SetResult((MessageBoxResult)command.Id);
                }, MessageBoxResult.Cancel));
            }

            dialog.DefaultCommandIndex = 0;
            if(button==MessageBoxButton.OKCancel)
                dialog.CancelCommandIndex = 1;
            else
                dialog.CancelCommandIndex = 0;

            await dialog.ShowAsync();

            return await tcs.Task;
        }
    }

    // 摘要: 
    //     指定显示消息框时要包含的按钮。
    public enum MessageBoxButton
    {
        // 摘要: 
        //     仅显示&amp;ldquo;确定&rdquo;按钮。
        OK = 0,
        //
        // 摘要: 
        //     同时显示&ldquo;确定&rdquo;和&amp;ldquo;取消&rdquo;按钮。
        OKCancel = 1,
    }

    // 摘要: 
    //     表示对消息框的用户响应。
    public enum MessageBoxResult
    {
        // 摘要: 
        //     当前未使用此值。
        None = 0,
        //
        // 摘要: 
        //     用户单击了&amp;ldquo;确定&rdquo;按钮。
        OK = 1,
        //
        // 摘要: 
        //     用户单击了&amp;ldquo;取消&rdquo;按钮或按下了 ESC。
        Cancel = 2,
        //
        // 摘要: 
        //     当前未使用此值。
        Yes = 6,
        //
        // 摘要: 
        //     当前未使用此值。
        No = 7,
    }</pre>

<p>
	调用方式:
</p>

<pre class="brush:csharp;">
await MessageBox.Show("demo", "liubaicai.com", MessageBoxButton.OKCancel);

await MessageBox.Show("demo");

MessageBoxResult result = await MessageBox.Show("demo", "liubaicai.com", MessageBoxButton.OKCancel);

MessageBoxResult result = await MessageBox.Show("demo");</pre>

<p>
	&nbsp;
</p>