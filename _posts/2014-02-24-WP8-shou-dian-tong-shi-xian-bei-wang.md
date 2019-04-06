---
layout:     post
title:      "WP8手电筒实现の备忘"
date:       2014-02-24 09:20:04 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="brush:csharp;">
                if (!isLight)
                    return;
                if (Flag)
                {
                    //闪光灯已开启 则释放资源(关闭闪光灯)
                    if (avDevice != null)
                    {
                        avDevice.Dispose();
                        Flag = false;
                    }
                }
                else
                {
                    var sensorLocation = CameraSensorLocation.Back;
                    avDevice = await AudioVideoCaptureDevice.OpenAsync(sensorLocation, AudioVideoCaptureDevice.GetAvailableCaptureResolutions(sensorLocation).First());
                    //打开闪关灯
                    var supportedCameraModes = AudioVideoCaptureDevice
                     .GetSupportedPropertyValues(sensorLocation, KnownCameraAudioVideoProperties.VideoTorchMode);
                    if (supportedCameraModes.ToList().Contains((UInt32)VideoTorchMode.On))
                    {
                        avDevice.SetProperty(KnownCameraAudioVideoProperties.VideoTorchMode, VideoTorchMode.On);
                        Flag = true;
                    }
                }</pre>

<p>
	&nbsp;
</p>