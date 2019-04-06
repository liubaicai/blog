---
layout:     post
title:      "Win(Phone)10开发第(9)弹，IoT开发中的常用术语"
date:       2015-12-03 14:57:27 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<strong>AllJoyn</strong>
AllJoyn 是一种开源通信框架，允许应用和设备在无需考虑连接细节和操作系统平台的情况下进行通信。

<strong>高级配置和电源接口 (ACPI)</strong>
ACPI（高级配置和电源接口）是由 Hewlett-Packard、Intel、Microsoft、Phoenix 和 Toshiba 联合开发的开放行业规范。ACPI 所建立的行业标准接口支持操作系统定向配置、电源管理以及移动、桌面和服务器平台的热管理。

<strong>基本输入/输出系统 (BIOS)</strong>
基本软件例程集，用于在启动时测试硬件、启动操作系统并支持在硬件设备之间传输数据。

<strong>通用输入/输出 (GPIO)</strong>
GPIO 是集成电路上的通用引脚，用户可在运行时控制其行为（包括它是输入引脚还是输出引脚）。可以在应用中使用 Windows.Devices.Gpio 命名空间，以便在开发板上操作 GPIO 引脚。

<strong>有外设&lt;/strong>
Windows IoT 核心版可处于有外设模式下，也可处于无外设模式下。这两种模式之间的区别在于是否存在任何形式的 UI。默认情况下，Windows 10 IoT 核心版处于有外设模式下，并显示计算机名称和 IP 地址等系统信息。

<strong>无外设&lt;/strong>
在无外设模式下，不存在可用的 UI 堆栈并且应用不可交互。可以将无外设模式应用看作服务。

<strong>内部集成电路 (I2C)</strong>
内部集成电路控制的简单的双向两线式串行数据 (SDA) 和串行时钟 (SCL) 总线。可以在应用中使用 Windows.Devices.I2c 命名空间，以便通过 I2C 与设备进行通信。

<strong>发光二极管 (LED)</strong>
LED 是双引线半导体光源。它是 PN 结二极管，可在激活时发光。

<strong>Microsoft Windows 内核模式驱动程序框架 (KMDF)</strong>
Microsoft 开发框架，允许驱动程序开发人员在内核模式下公开驱动程序功能，从而使驱动程序可以访问系统内存和硬件。

<strong>串行外设接口总线 (SPI)</strong>
SPI 总线是用于近距离通信的同步串行通信接口规范，主要用于嵌入系统。可以在应用中使用 Windows.Devices.Spi 命名空间，以便通过 SPI 与设备进行通信。

<strong>通用异步收发器 (UART)</strong>
UART 是计算机硬件的一部分，用于接收字节数据，然后以串行方式传输各个位。

<strong>通用 Windows 平台 (UWP)</strong>
通用 Windows 平台提供跨设备且有保证的核心 API 层。你可以创建可安装在各种设备上的单个应用包。

<strong>虚拟机 (VM)</strong>
充当编译器二进制代码与实际执行程序指令的微处理器之间的接口的软件。在 Windows 中，可以使用 Hyper-V 管理器来管理虚拟机。

<strong>Windows 设备控制台 (Devcon.exe)</strong>
DevCon (Devcon.exe)（即设备控制台）是一个命令行工具，用于显示有关运行 Windows 的计算机上设备的详细信息。可以使用 DevCon 启用、禁用、安装、配置以及删除设备。此工具主要用于手动安装和删除驱动程序。