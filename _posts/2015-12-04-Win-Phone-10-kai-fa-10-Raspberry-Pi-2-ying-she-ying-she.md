---
layout:     post
title:      "Win(Phone)10开发第(10)弹，Raspberry Pi 2 引脚映射"
date:       2015-12-04 05:59:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<div class="default-main">
<div class="row">
<div class="default-max-width">
<div class="content-container col-md-12">
<h2 id="raspberry-pi-2-"><img class="img-responsive" src="http://ms-iot.github.io/content/images/PinMappings/RP2_Pinout.png" alt="RPi2 排针" /></h2>
<sub>*使用 <a href="http://fritzing.org/">Fritzing</a> 制作的图像*</sub>

Raspberry Pi 2 的硬件接口通过开发板上的 40 排针 <strong>J8</strong> 公开。功能包括：
<ul>
	<li><strong>13x</strong> - GPIO 引脚</li>
	<li><strong>2x</strong> - SPI 总线</li>
	<li><strong>1x</strong> - I2C 总线</li>
	<li><strong>2x</strong> - 5V 电源引脚</li>
	<li><strong>2x</strong> - 3.3V 电源引脚</li>
	<li><strong>8x</strong> - 接地引脚</li>
</ul>
<h2 id="a-namerpi2gpiogpio-">GPIO 引脚</h2>
以下 GPIO 引脚可通过 API 访问：
<table class="table table-bordered">
<thead>
<tr>
<th>GPIO#</th>
<th>Power-on Pull</th>
<th>Header Pin</th>
</tr>
</thead>
<tbody>
<tr>
<td>4</td>
<td>PullUp</td>
<td>7</td>
</tr>
<tr>
<td>5</td>
<td>PullUp</td>
<td>29</td>
</tr>
<tr>
<td>6</td>
<td>PullUp</td>
<td>31</td>
</tr>
<tr>
<td>12</td>
<td>PullDown</td>
<td>32</td>
</tr>
<tr>
<td>13</td>
<td>PullDown</td>
<td>33</td>
</tr>
<tr>
<td>16</td>
<td>PullDown</td>
<td>36</td>
</tr>
<tr>
<td>17</td>
<td>PullDown</td>
<td>11</td>
</tr>
<tr>
<td>18</td>
<td>PullDown</td>
<td>12</td>
</tr>
<tr>
<td>19</td>
<td>PullDown</td>
<td>35</td>
</tr>
<tr>
<td>20</td>
<td>PullDown</td>
<td>38</td>
</tr>
<tr>
<td>21</td>
<td>PullDown</td>
<td>40</td>
</tr>
<tr>
<td>22</td>
<td>PullDown</td>
<td>15</td>
</tr>
<tr>
<td>23</td>
<td>PullDown</td>
<td>16</td>
</tr>
<tr>
<td>24</td>
<td>PullDown</td>
<td>18</td>
</tr>
<tr>
<td>25</td>
<td>PullDown</td>
<td>22</td>
</tr>
<tr>
<td>26</td>
<td>PullDown</td>
<td>37</td>
</tr>
<tr>
<td>27</td>
<td>PullDown</td>
<td>13</td>
</tr>
<tr>
<td>35</td>
<td>PullUp</td>
<td>Red Power LED</td>
</tr>
<tr>
<td>47</td>
<td>PullUp</td>
<td>Green Activity LED</td>
</tr>
</tbody>
</table>
<span class="k">using</span> <span class="nn">Windows.Devices.Gpio</span><span class="p">;</span>例如，以下代码将 <strong>GPIO 5</strong> 作为输出打开，并在该引脚上写出数字“&lt;strong>1</strong>”：
<div class="highlight">
<pre class="lang:c# decode:true">public void GPIO()
{
    // Get the default GPIO controller on the system
    GpioController gpio = GpioController.GetDefault();
    if (gpio == null)
        return; // GPIO not available on this system

    // Open GPIO 5
    using (GpioPin pin = gpio.OpenPin(5))
    {
        // Latch HIGH value first. This ensures a default value when the pin is set as output
        pin.Write(GpioPinValue.High);
    
        // Set the IO direction as output
        pin.SetDriveMode(GpioPinDriveMode.Output);

    } // Close pin - will revert to its power-on state 
}</pre>
当你打开引脚时，它将处于其通电状态。若要断开拉电阻的连接并获取高阻抗输入，请将驱动程序模式设置为 GpioPinDriveMode.Input：

</div>
<pre class="lang:c decode:true">pin.SetDriveMode(GpioDriveMode.Input);</pre>
当关闭引脚时，它将还原到其通电状态。
<h2>I2C 总线</h2>
排针上公开了一个 I2C 控制器 <strong>I2C1</strong>，带有 <strong>SDA</strong> 和 <strong>SCL</strong> 两条线。用于此总线的 1.8KΩ 内部上拉电阻已安装在开发板上。
<ul>
	<li>引脚 3 - <strong>I2C1 SDA</strong></li>
	<li>引脚 5 - <strong>I2C1 SCL</strong></li>
</ul>
下面的示例将初始化 <strong>I2C1</strong> 并将数据写入地址为 <strong>0x40</strong> 的 I2C 设备：
<div class="highlight">
<pre class="lang:c# decode:true">using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

public async void I2C()
{
    // Get a selector string for bus "I2C1"
    string aqs = I2cDevice.GetDeviceSelector("I2C1");
    
    // Find the I2C bus controller with our selector string
    var dis = await DeviceInformation.FindAllAsync(aqs);
    if (dis.Count == 0)
        return; // bus not found
    
    // 0x40 is the I2C device address
    var settings = new I2cConnectionSettings(0x40);
    
    // Create an I2cDevice with our selected bus controller and I2C settings
    using (I2cDevice device = await I2cDevice.FromIdAsync(dis[0].Id, settings))
    {
        byte[] writeBuf = { 0x01, 0x02, 0x03, 0x04 };
        device.Write(writeBuf);
    }
}</pre>
</div>
<h2 id="a-namerpi2spiaspi-">SPI 总线</h2>
RPi2 上有 2 个 SPI 总线控制器可用： <strong>SPI0</strong> 和 <strong>SPI1</strong>。

<strong>SPI0</strong> 具有标准的 <strong>MOSI</strong>、&lt;strong>MISO</strong> 和 <strong>SCLK</strong> 线，并且可以配置为使用 <strong>SPI0 CS0</strong> 和 <strong>SPI0 CS1</strong> 两种芯片选择线之一。
<ul>
	<li>引脚 19 - <strong>SPI0 MOSI</strong></li>
	<li>引脚 21 - <strong>SPI0 MISO</strong></li>
	<li>引脚 23 - <strong>SPI0 SCLK</strong></li>
	<li>引脚 24 - <strong>SPI0 CS0</strong></li>
	<li>引脚 26 - <strong>SPI0 CS1</strong></li>
</ul>
<strong>SPI1</strong> 包括 <strong>MOSI</strong>、&lt;strong>MISO</strong> 和 <strong>SCLK</strong> 线，并且只有 <strong>SPI1 CS0</strong> 一种芯片选择线。
<ul>
	<li>引脚 38 - <strong>SPI1 MOSI</strong></li>
	<li>引脚 35 - <strong>SPI1 MISO</strong></li>
	<li>引脚 40 - <strong>SPI1 SCLK</strong></li>
	<li>引脚 11 - <strong>SPI1 CS0</strong></li>
</ul>
有关如何在总线 <strong>SPI0</strong> 上执行 SPI 写入的示例如下所示：
<div class="highlight">
<pre class="lang:c# decode:true ">using Windows.Devices.Enumeration;
using Windows.Devices.Spi;

public async void SPI()
{
    // Get a selector string for bus "SPI0"
    string aqs = SpiDevice.GetDeviceSelector("SPI0");
    
    // Find the SPI bus controller device with our selector string
    var dis = await DeviceInformation.FindAllAsync(aqs);
    if (dis.Count == 0);
        return; // "SPI0" not found on this system
    
    // Use chip select line CS0
    var settings = new SpiConnectionSettings(0);
    
    // Create an SpiDevice with our bus controller and SPI settings
    using (SpiDevice device = await SpiDevice.FromIdAsync(dis[0].Id, settings))
    {
        byte[] writeBuf = { 0x01, 0x02, 0x03, 0x04 };
        device.Write(writeBuf);
    }
}</pre>
</div>
</div>
</div>
</div>
</div>