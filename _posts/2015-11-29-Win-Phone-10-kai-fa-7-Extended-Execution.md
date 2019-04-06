---
layout:     post
title:      "Win(Phone)10开发第(7)弹，Extended Execution"
date:       2015-11-29 14:50:37 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

众所周知，在WindowsPhone8中，app在转入后台并且没有挂起的这段时间是可以继续运行的，此时可以继续执行程序的操作，这个功能在位置追踪app中时很有用的，当接电话来短信或者锁屏后不影响程序运行，然而在uap中，这个功能很遗憾的被取消了。

此时想要app锁屏后继续运行的话，需要用到ExtendedExecution，以便在手机锁屏后，挂起前，可以继续进行位置追踪。

ExtendedExecution的用法很简单：
<pre class="lang:c# decode:true ">private async void StartLocationExtensionSession()
{
    session = new ExtendedExecutionSession();
    session.Description = "Location Tracker";
    session.Reason = ExtendedExecutionReason.LocationTracking;
    session.Revoked += ExtendedExecutionSession_Revoked;
    var result = await session.RequestExtensionAsync();
    if (result == ExtendedExecutionResult.Denied)
    {
        MessageDialog md = new MessageDialog("ExtendedExecution Denied.");
        await md.ShowAsync();
    }
}</pre>
ExtendedExecutionReason有3种，LocationTracking，SavingData，Unspecified，分别对应着位置追踪，保存数据，和其他操作。如果选择了前两种，但是却没有对应方法，则会获得ExtendedExecutionResult.Denied的result.比如:
<pre class="lang:c# decode:true ">private void MainPage_Loaded(object sender, RoutedEventArgs e)
{
    DoWork();
    StartLocationExtensionSession();
}
private async void DoWork()
{
    for (int i = 0; i &lt; 1000; i++)
    {
        Debug.WriteLine(i);
        await Task.Delay(1000);
    }
}
private async void StartLocationExtensionSession()
{
    session = new ExtendedExecutionSession();
    session.Description = "Location Tracker";
    session.Reason = ExtendedExecutionReason.LocationTracking;
    var result = await session.RequestExtensionAsync();
    if (result == ExtendedExecutionResult.Denied)
    {
        MessageDialog md = new MessageDialog("ExtendedExecution Denied.");
        await md.ShowAsync();
    }
}</pre>
实际上并没有LocationTracking的操作，这时候就会被拒绝。
在使用中，RequestExtensionAsync在正确选择了Reason的情况下，没有遇到Denied的情况ExtendedExecutionSession_Revoked注册的废除事件
<pre class="lang:c# decode:true ">private void ExtendedExecutionSession_Revoked(object sender, ExtendedExecutionRevokedEventArgs args)
{
    Debug.WriteLine($"ExtendedExecutionSession_Revoked:{ExtendedExecutionRevokedReason.SystemPolicy}");
}</pre>
取到的 ExtendedExecutionRevokedReason 有2个，一个SystemPolicy，发生在解锁后恢复前台运行时 另一个Resumed发生在挂起恢复时。

然而经过尝试，SystemPolicy导致的Revoked发生后，继续锁屏，依然可以运行，然后解锁后，不再触发Revoked事件。

当位置追踪或者保存数据结束，将session Dispose掉，重复的RequestExtensionAsync会报错。并且本着省电的原则，当需要时请求，不需要时候注销掉。
<pre class="lang:c# decode:true ">if (session != null)
{
    session.Dispose();
    session = null;
}</pre>
这样就可以锁屏后继续运行app了。

在使用过程中，注意到有另一个类：ExtendedExecutionForegroundSession，用法跟ExtendedExecutionSession几乎完全一致，它的Reason有四种：BackgroundAudio，SavingData，Unconstrained，Unspecified。

但经过尝试，无论如何RequestExtensionAsync的结果都是Denied。而且没有文档说明，因此并不知道具体有什么用。如有知道的欢迎答疑解惑