---
layout:     post
title:      "Win(Phone)10开发第(3)弹，简单的Demo程序网络请求json解析列表显示"
date:       2015-04-02 07:45:18 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	先分享一个由Json字符串直接生成解析对应的类的工具：
</p>

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2015/04/jsonclassgenerator14.zip">jsonclassgenerator14</a>
</p>

<p>
	<a href="http://www.liubaicai.net/archives/380">百度天气接口</a>
</p>

<p>
	下面是由一个小功能(又特么的是天气)的实现，记录下下UAP的流程和结构(其实跟之前一模一样)
</p>

<p>
	1：获取地理位置，需要在Package.appxmanifest 中添加声明，但是目前vs2015 ctp6 这个设计模式好像是打不开的，只能手动添加了：
</p>

<pre class="brush:xml;">
  &lt;Capabilities&gt;
    &lt;Capability Name="internetClient" /&gt;
    &lt;DeviceCapability Name="location" /&gt;
  &lt;/Capabilities&gt;</pre>

<p>
	2：访问网络数据
</p>

<pre class="brush:csharp;">
                var http = new System.Net.Http.HttpClient();
                http.DefaultRequestHeaders.Add("UserAgent", "woshiuseragent");
                var resp = await http.GetStringAsync(new Uri("http://api.map.baidu.com/telematics/v3/weather?location="
                    + pos.Coordinate.Point.Position.Longitude + ","+ pos.Coordinate.Point.Position.Latitude
                    + "&amp;output=json&amp;ak=yourappkey"));</pre>

<p>
	3：解析
</p>

<pre class="brush:csharp;">
                using (MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(resp)))
                {
                    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(WeatherDetail));
                    WeatherDetail info = (WeatherDetail)serializer.ReadObject(ms);
                }</pre>

<p>
	4：显示
</p>

<pre class="brush:csharp;">
                    ResultBox.Text = info.Results.FirstOrDefault().CurrentCity;
                    ResultList.ItemsSource = info.Results.FirstOrDefault().WeatherData.ToList();</pre>

<p>
	界面UI是这样的：
</p>

<pre class="brush:xml;">
    &lt;Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}"&gt;
        &lt;Grid.RowDefinitions&gt;
            &lt;RowDefinition Height="40"/&gt;
            &lt;RowDefinition Height="*"/&gt;
        &lt;/Grid.RowDefinitions&gt;
        &lt;TextBlock Grid.Row="0" x:Name="ResultBox" FontSize="30" TextWrapping="Wrap" VerticalAlignment="Center" HorizontalAlignment="Center"/&gt;
        &lt;ListView x:Name="ResultList" Grid.Row="1" Margin="20" HorizontalAlignment="Center"&gt;
            &lt;ListView.Resources&gt;
                &lt;DataTemplate x:Key="ListBoxDataTemplate"&gt;
                    &lt;Grid Margin="0,10"&gt;
                        &lt;Grid.ColumnDefinitions&gt;
                            &lt;ColumnDefinition Width="80"/&gt;
                            &lt;ColumnDefinition Width="*"/&gt;
                        &lt;/Grid.ColumnDefinitions&gt;
                        &lt;Image Grid.Column="0" Width="80" Height="80" Source="{Binding Logo}"/&gt;
                        &lt;StackPanel Margin="20,0,0,0" Grid.Column="1"&gt;
                            &lt;TextBlock Text="{Binding Weather}" FontSize="16" /&gt;
                            &lt;TextBlock Text="{Binding Wind}" FontSize="16" /&gt;
                            &lt;TextBlock Text="{Binding Temperature}" FontSize="16" /&gt;
                            &lt;TextBlock Text="{Binding Date}" FontSize="16" /&gt;
                        &lt;/StackPanel&gt;
                    &lt;/Grid&gt;
                &lt;/DataTemplate&gt;
            &lt;/ListView.Resources&gt;
            &lt;ListView.ItemTemplate&gt;
                &lt;StaticResource ResourceKey="ListBoxDataTemplate"/&gt;
            &lt;/ListView.ItemTemplate&gt;
        &lt;/ListView&gt;
    &lt;/Grid&gt;</pre>

<p>
	App.cs里生命流程的控制，页面的导航和状态等等，跟之前win8.1乃至wp8是没什么太大区别的，两个平台的适配，才是迁移到UAP的最大工程。
</p>

<p>
	来一张最终效果图：
</p>

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2015/04/20150402153413.png"><img alt="20150402153413" class="alignnone size-medium wp-image-451" height="227" src="http://www.liubaicai.net/wp-content/uploads/2015/04/20150402153413-300x227.png" width="300" /></a>
</p>