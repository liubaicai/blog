---
layout:     post
title:      "WP8获取设备电源信息[转载]"
date:       2014-01-07 06:57:06 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	~在WP8 SDK中加入了对电源方面的支持, 我们可以在应用中拿到电源的剩余电量百分比,剩余使用时间等相关信息.
</p>

<p>
	1、需要用到哪些东西？
</p>

<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Battery.RemainingChargePercent：获取手机电源剩余电量的百分比。
</p>

<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Battery.RemainingDischargeTime：获取手机电源剩余显示时间.
</p>

<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Battery.RemainingChargePercentChanged：剩余电量发生变化时的事件处理。
</p>

<p>
	2、代码如下：
</p>

<p>
	using Windows.Phone.Devices.Power;<br />
	&nbsp;<br />
	public partial class SystemPage : PhoneApplicationPage<br />
	&nbsp;&nbsp;&nbsp; {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; readonly Battery _battery;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public SystemPage()<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; InitializeComponent();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //获取当前设备电源对象,注意：不需要创建对象实体&lt;br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _battery = Battery.GetDefault();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _battery.RemainingChargePercentChanged += _battery_RemainingChargePercentChanged;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //更新用户界面操作<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UpdateUI();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //电源百分比变化时，及时更新UI<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; void _battery_RemainingChargePercentChanged(object sender, object e)<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UpdateUI();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; void UpdateUI()<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.tblBatteryChargePercent.Text = string.Format("{0} %", _battery.RemainingChargePercent);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //显示剩余电量使用时间,注意：RenainingDischargeTime包含多种格式的时间显示方式,可自行取值。&lt;br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.tblBatteryDisplayTime.Text = string.Format("{0} 分钟",&nbsp; _battery.RemainingDischargeTime.TotalMinutes);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	}
</p>

<p>
	<br />
	&nbsp;注意：启动时，在MainPage的构造函数中获取当前设备的电源对象,声明当电量发生改变时的委托处理。定义更新方法，当有电量发生变化后，及时与UI进行交互。
</p>