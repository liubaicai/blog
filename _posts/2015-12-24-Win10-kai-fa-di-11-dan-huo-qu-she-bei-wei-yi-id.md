---
layout:     post
title:      "Win10开发第(11)弹，获取设备唯一id"
date:       2015-12-24 07:06:40 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

文章介绍了在windows 10 UAP应用中，如何获取设备唯一id的方法

首先添加Windows Desktop Extensions for the UWP 扩展或者Mobile扩展都可以，然后：
<pre class="lang:c# decode:true">using System;
using Windows.Security.ExchangeActiveSyncProvisioning;
using Windows.System.Profile;

namespace Device
{
    public sealed class DeviceInfo
    {
        private static DeviceInfo _Instance;
        public static DeviceInfo Instance
        {
            get {
                if (_Instance == null)
                    _Instance = new DeviceInfo();
                return _Instance; }

        }

        public string Id { get; private set; }
        public string Model { get; private set; }
        public string Manufracturer { get; private set; }
        public string Name { get; private set; }
        public static string OSName { get; set; }

        private DeviceInfo()
        {
            Id = GetId();
            var deviceInformation = new EasClientDeviceInformation();
            Model = deviceInformation.SystemProductName;
            Manufracturer = deviceInformation.SystemManufacturer;
            Name = deviceInformation.FriendlyName;
            OSName = deviceInformation.OperatingSystem;
        }

        private static string GetId()
        {
            if (Windows.Foundation.Metadata.ApiInformation.IsTypePresent("Windows.System.Profile.HardwareIdentification"))
            {
                var token = HardwareIdentification.GetPackageSpecificToken(null);
                var hardwareId = token.Id;
                var dataReader = Windows.Storage.Streams.DataReader.FromBuffer(hardwareId);

                byte[] bytes = new byte[hardwareId.Length];
                dataReader.ReadBytes(bytes);

                return BitConverter.ToString(bytes).Replace("-", "");
            }

            throw new Exception("NO API FOR DEVICE ID PRESENT!");
        }
    }
}</pre>