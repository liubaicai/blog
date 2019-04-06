---
layout:     post
title:      "(转)树莓派+温度传感器实现室内温度监控"
date:       2015-03-17 09:50:58 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	实现家庭室内温度远程监控只是&ldquo;智能家居&rdquo;的初步，目的是下班前如果发现家里温度过高，可提前用手机发送指令提前5-10分钟打开空调降温（如何通过手机发送指令控制空调有机会在进行介绍）。
</p>

<p>
	<strong>一、硬件准备&lt;/strong><br />
	1、树莓派（Raspberry Pi）一个&lt;br />
	2、DS18B20温度传感器一个（淘宝大概5元左右）<br />
	3、4.7k&Omega;电阻一个 或 DS18B20模块一个（笔者用，淘宝1.5元一个，其实就是店家帮忙把电阻焊好了，接线稍好看些）。&lt;br />
	4、杜邦线三根（双头母）
</p>

<p>
	<strong>二、接线方式（如图所示）</strong><br />
	<img alt="20131003214031676" class="alignnone size-full wp-image-367" height="700" src="http://shumeipai.nxez.com/wp-content/uploads/2013/10/20131003214031676.png" width="574" />
</p>

<p>
	<strong>三、确认硬件接线是否正确并生效，并读取温度</strong><br />
	1、首先升级内核(可忽略，但如果版本较老，可能影响设备读取)
</p>

<div>
	<div class="syntaxhighlighter  bash" id="highlighter_682680">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="bash plain">apt-get update</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="bash plain">apt-get upgrade</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	2、确认设备是否生效
</p>

<div>
	<div class="syntaxhighlighter  bash" id="highlighter_433737">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>

						<div class="line number3 index2 alt2">
							3
						</div>

						<div class="line number4 index3 alt1">
							4
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="bash functions">sudo</code> <code class="bash plain">modprobe w1-gpio</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="bash functions">sudo</code> <code class="bash plain">modprobe w1-therm</code>
							</div>

							<div class="line number3 index2 alt2">
								<code class="bash functions">cd</code> <code class="bash plain">/sys/bus/w1/devices/</code>
							</div>

							<div class="line number4 index3 alt1">
								<code class="bash functions">ls</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	显示结果：
</p>

<div>
	<div class="syntaxhighlighter  plain" id="highlighter_738782">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>

						<div class="line number3 index2 alt2">
							3
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="plain plain">pi@raspberrypi:~$ cd /sys/bus/w1/devices/</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="plain plain">pi@raspberrypi:/sys/bus/w1/devices$ ls</code>
							</div>

							<div class="line number3 index2 alt2">
								<code class="plain plain">28-00000494cb79 w1_bus_master1</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	28-00000494cb79就是笔者外接的温度传感器设备，但并不是每个客户端都显示一样的，这个是传感器的序列号。
</p>

<p>
	3、查看当前温度
</p>

<div>
	<div class="syntaxhighlighter  bash" id="highlighter_256858">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="bash functions">cd</code> <code class="bash plain">28-00000494cb79</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="bash functions">cat</code> <code class="bash plain">w1_slave</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	显示结果：
</p>

<div>
	<div class="syntaxhighlighter  plain" id="highlighter_902717">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="plain plain">70 01 4b 46 7f ff 10 10 e1 : crc=e1 YES</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="plain plain">70 01 4b 46 7f ff 10 10 e1 t=23000</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	第二行的t=23000就是当前的温度值，要换算成摄氏度，除以1000，即当前温度为23000/1000=23摄氏度。
</p>

<p>
	<strong>四、用python读取温度值&lt;/strong><br />
	文件存放:/home/pi/temperature.py<br />
	内容如下：
</p>

<div>
	<div class="syntaxhighlighter  python" id="highlighter_392362">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>

						<div class="line number3 index2 alt2">
							3
						</div>

						<div class="line number4 index3 alt1">
							4
						</div>

						<div class="line number5 index4 alt2">
							5
						</div>

						<div class="line number6 index5 alt1">
							6
						</div>

						<div class="line number7 index6 alt2">
							7
						</div>

						<div class="line number8 index7 alt1">
							8
						</div>

						<div class="line number9 index8 alt2">
							9
						</div>

						<div class="line number10 index9 alt1">
							10
						</div>

						<div class="line number11 index10 alt2">
							11
						</div>

						<div class="line number12 index11 alt1">
							12
						</div>

						<div class="line number13 index12 alt2">
							13
						</div>

						<div class="line number14 index13 alt1">
							14
						</div>

						<div class="line number15 index14 alt2">
							15
						</div>

						<div class="line number16 index15 alt1">
							16
						</div>

						<div class="line number17 index16 alt2">
							17
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="python comments">#/home/pi/temperature.py</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="python comments">#打开温度传感器文件&lt;/code>
							</div>

							<div class="line number3 index2 alt2">
								<code class="python plain">tfile </code><code class="python keyword">=</code> <code class="python functions">open</code><code class="python plain">(</code><code class="python string">"/sys/bus/w1/devices/28-00000494cb79/w1_slave"</code><code class="python plain">)</code>
							</div>

							<div class="line number4 index3 alt1">
								<code class="python comments">#读取文件所有内容&lt;/code>
							</div>

							<div class="line number5 index4 alt2">
								<code class="python plain">text </code><code class="python keyword">=</code> <code class="python plain">tfile.read()</code>
							</div>

							<div class="line number6 index5 alt1">
								<code class="python comments">#关闭文件</code>
							</div>

							<div class="line number7 index6 alt2">
								<code class="python plain">tfile.close()</code>
							</div>

							<div class="line number8 index7 alt1">
								<code class="python comments">#用换行符分割字符串成数组，并取第二行</code>
							</div>

							<div class="line number9 index8 alt2">
								<code class="python plain">secondline </code><code class="python keyword">=</code> <code class="python plain">text.split(</code><code class="python string">"\n"</code><code class="python plain">)[</code><code class="python value">1</code><code class="python plain">]</code>
							</div>

							<div class="line number10 index9 alt1">
								<code class="python comments">#用空格分割字符串成数组，并取最后一个，即t=23000</code>
							</div>

							<div class="line number11 index10 alt2">
								<code class="python plain">temperaturedata </code><code class="python keyword">=</code> <code class="python plain">secondline.split(</code><code class="python string">" "</code><code class="python plain">)[</code><code class="python value">9</code><code class="python plain">]</code>
							</div>

							<div class="line number12 index11 alt1">
								<code class="python comments">#取t=后面的数值，并转换为浮点型&lt;/code>
							</div>

							<div class="line number13 index12 alt2">
								<code class="python plain">temperature </code><code class="python keyword">=</code> <code class="python functions">float</code><code class="python plain">(temperaturedata[</code><code class="python value">2</code><code class="python plain">:])</code>
							</div>

							<div class="line number14 index13 alt1">
								<code class="python comments">#转换单位为摄氏度</code>
							</div>

							<div class="line number15 index14 alt2">
								<code class="python plain">temperature </code><code class="python keyword">=</code> <code class="python plain">temperature </code><code class="python keyword">/</code> <code class="python value">1000</code>
							</div>

							<div class="line number16 index15 alt1">
								<code class="python comments">#打印值&lt;/code>
							</div>

							<div class="line number17 index16 alt2">
								<code class="python functions">print</code> <code class="python plain">temperature</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	在命令行运行，即可得出结果数值:<br />
	python /home/pi/temperature.py
</p>

<p>
	<strong>五、上报到yeelink</strong><br />
	yeelink是国内比较知名的免费物联网数据平台，国外有COSM（https://cosm.com）。&lt;br />
	申请yeelink账号及添加设备和传感器，以及API的学习，本文跳过，请大家自行去学习一下。
</p>

<p>
	根据yeelink API的规则，我们需要提供一个文本文件，内容为一段JSON，如下：
</p>

<div>
	<div class="syntaxhighlighter  plain" id="highlighter_621909">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>

						<div class="line number3 index2 alt2">
							3
						</div>

						<div class="line number4 index3 alt1">
							4
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="plain plain">{</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="plain plain">&ldquo;timestamp&rdquo;:&rdquo;2012-03-15T16:13:14&Prime;,</code>
							</div>

							<div class="line number3 index2 alt2">
								<code class="plain plain">&ldquo;value&rdquo;:294.34</code>
							</div>

							<div class="line number4 index3 alt1">
								<code class="plain plain">}</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	若未指定timestamp, 服务器会自动加上当前时间，所以本文的操作不添加该字段
</p>

<p>
	1、修改python，将温度值用JSON格式保存到一个文本文件，全部如下：
</p>

<div>
	<div class="syntaxhighlighter  python" id="highlighter_567403">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>

						<div class="line number3 index2 alt2">
							3
						</div>

						<div class="line number4 index3 alt1">
							4
						</div>

						<div class="line number5 index4 alt2">
							5
						</div>

						<div class="line number6 index5 alt1">
							6
						</div>

						<div class="line number7 index6 alt2">
							7
						</div>

						<div class="line number8 index7 alt1">
							8
						</div>

						<div class="line number9 index8 alt2">
							9
						</div>

						<div class="line number10 index9 alt1">
							10
						</div>

						<div class="line number11 index10 alt2">
							11
						</div>

						<div class="line number12 index11 alt1">
							12
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="python comments">#/home/pi/temperature.py</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="python plain">tfile </code><code class="python keyword">=</code> <code class="python functions">open</code><code class="python plain">(</code><code class="python string">"/sys/bus/w1/devices/28-00000494cb79/w1_slave"</code><code class="python plain">)</code>
							</div>

							<div class="line number3 index2 alt2">
								<code class="python plain">text </code><code class="python keyword">=</code> <code class="python plain">tfile.read()</code>
							</div>

							<div class="line number4 index3 alt1">
								<code class="python plain">tfile.close()</code>
							</div>

							<div class="line number5 index4 alt2">
								<code class="python plain">secondline </code><code class="python keyword">=</code> <code class="python plain">text.split(</code><code class="python string">"\n"</code><code class="python plain">)[</code><code class="python value">1</code><code class="python plain">]</code>
							</div>

							<div class="line number6 index5 alt1">
								<code class="python plain">temperaturedata </code><code class="python keyword">=</code> <code class="python plain">secondline.split(</code><code class="python string">" "</code><code class="python plain">)[</code><code class="python value">9</code><code class="python plain">]</code>
							</div>

							<div class="line number7 index6 alt2">
								<code class="python plain">temperature </code><code class="python keyword">=</code> <code class="python functions">float</code><code class="python plain">(temperaturedata[</code><code class="python value">2</code><code class="python plain">:])</code>
							</div>

							<div class="line number8 index7 alt1">
								<code class="python plain">temperature </code><code class="python keyword">=</code> <code class="python plain">temperature </code><code class="python keyword">/</code> <code class="python value">1000</code>
							</div>

							<div class="line number9 index8 alt2">
								<code class="python plain">res </code><code class="python keyword">=</code> <code class="python string">&#39;{"value":%f}&#39;</code> <code class="python keyword">%</code><code class="python plain">temperature</code>
							</div>

							<div class="line number10 index9 alt1">
								<code class="python plain">output </code><code class="python keyword">=</code> <code class="python functions">open</code><code class="python plain">(</code><code class="python string">&#39;/home/pi/datafile.txt&#39;</code><code class="python plain">, </code><code class="python string">&#39;w&#39;</code><code class="python plain">)</code>
							</div>

							<div class="line number11 index10 alt2">
								<code class="python plain">output.write(res)</code>
							</div>

							<div class="line number12 index11 alt1">
								<code class="python plain">output.close</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	python将温度值写入：/home/pi/datafile.txt
</p>

<p>
	2、新增yeelink.sh脚本<br />
	文件位置：/home/pi/yeelink.sh<br />
	内容如下：
</p>

<div>
	<div class="syntaxhighlighter  bash" id="highlighter_750380">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="bash functions">sudo</code> <code class="bash plain">python </code><code class="bash plain">/home/pi/temperature</code><code class="bash plain">.py</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="bash plain">curl --request POST --data-binary @</code><code class="bash string">"/home/pi/datafile.txt"</code> <code class="bash plain">--header </code><code class="bash string">"U-ApiKey:XXXXXXXXXXXXXXXX"</code> <code class="bash plain">http:</code><code class="bash plain">//api</code><code class="bash plain">.yeelink.net</code><code class="bash plain">/v1</code><code class="bash plain">.0</code><code class="bash plain">/device/1969/sensor/2533/datapoints</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	将U-ApiKey:XXXXXXXXXXXXXXXX替换为自已账户的API Key。&lt;br />
	后面的URL也需要替换为自己申请的传感器URL。
</p>

<p>
	3、添加到计划任务
</p>

<div>
	<div class="syntaxhighlighter  bash" id="highlighter_664512">
		<table border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr>
					<td class="gutter">
						<div class="line number1 index0 alt2">
							1
						</div>

						<div class="line number2 index1 alt1">
							2
						</div>

						<div class="line number3 index2 alt2">
							3
						</div>

						<div class="line number4 index3 alt1">
							4
						</div>

						<div class="line number5 index4 alt2">
							5
						</div>

						<div class="line number6 index5 alt1">
							6
						</div>
					</td>
					<td class="code">
						<div class="container">
							<div class="line number1 index0 alt2">
								<code class="bash comments">#为脚本增加可执行权限</code>
							</div>

							<div class="line number2 index1 alt1">
								<code class="bash functions">sudo</code> <code class="bash functions">chmod</code> <code class="bash plain">+x yeelink.sh</code>
							</div>

							<div class="line number3 index2 alt2">
								<code class="bash comments">#将脚本加入cronjob（计划任务）</code>
							</div>

							<div class="line number4 index3 alt1">
								<code class="bash functions">sudo</code> <code class="bash functions">crontab</code> <code class="bash plain">-e</code>
							</div>

							<div class="line number5 index4 alt2">
								<code class="bash comments">#在cornjob文件中添加下面一行，并保存(表示10分钟执行一下脚本，时间可自行修改)</code>
							</div>

							<div class="line number6 index5 alt1">
								<code class="bash plain">*</code><code class="bash plain">/10</code> <code class="bash plain">* * * * </code><code class="bash plain">/home/pi/yeelink</code><code class="bash plain">.sh</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p>
	完了！我的温度传感器数据展示页面：http://www.yeelink.net/devices/1969
</p>

<p>
	参考文档：
</p>

<p>
	http://www.cl.cam.ac.uk/freshers/raspberrypi/tutorials/temperature/
</p>

<p>
	http://blog.turningdigital.com/2012/09/raspberry-pi-ds18b20-temperature-sensor-rrdtool/
</p>

<p>
	http://webshed.org/wiki/RaspberryPI_DS1820
</p>

<p>
	链接地址：&lt;a href="http://shumeipai.nxez.com/2013/10/03/raspberry-pi-temperature-sensor-monitors.html" rel="bookmark" title="树莓派+温度传感器实现室内温度监控&quot;><font color="#0066cc">http://shumeipai.nxez.com/2013/10/03/raspberry-pi-temperature-sensor-monitors.html</font></a>
</p>