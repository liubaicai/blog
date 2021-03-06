---
layout:     post
title:      "WP8新HD1080P分辨率(1920*1080)的适配"
date:       2013-11-01 07:12:46 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	<a class="xref" href="http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj206974(v=vs.105).aspx" jquery172033909067278619303="48" style="line-height: 1.6em;" target="_blank">Multi-resolution apps for Windows Phone 8</a><span style="line-height: 1.6em;"> (MSDN) covers the topic of determining the resolution at runtime and ensuring that application&#39;s UI scales correctly on all Windows Phone 8 devices. This page provides more details related to optimising applications for 1080p in particular, such as, how to detect whether your app is running in a 1080p device, how to utilize higher resolution assets for 1080p screens, and possible memory consequences when dealing with more content and in higher resolution.</span>
</p>

<p>
	<font style="margin: 0px; padding: 0px; border: 0px; font-family: Tahoma, Geneva, sans-serif; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">下面的代码块提供了一个更新版本的&nbsp;</font></font><samp class="ph codeph" style="margin: 0px; padding: 0px; border: 0px; font-family: 'Courier New', Courier, monospace; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">ResolutionHelper.cs 的&lt;/font></font></samp><a class="xref" href="http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj206974(v=vs.105).aspx" style="margin: 0px; padding: 0px; border: 0px; font-family: Tahoma, Geneva, sans-serif; line-height: 18px; vertical-align: baseline; color: rgb(57, 87, 150); text-decoration: none; cursor: pointer;" target="_blank"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">多分辨率</font></font></a><font style="margin: 0px; padding: 0px; border: 0px; font-family: Tahoma, Geneva, sans-serif; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">支持1080p&nbsp;</font><a class="xref" href="http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj206974(v=vs.105).aspx" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline; color: rgb(57, 87, 150); text-decoration: none; cursor: pointer;" target="_blank"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">的Windows Phone 8的应用程序&lt;/font></a><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">。&lt;/font></font>
</p>

<pre class="brush:csharp;">
public enum Resolutions { WVGA, WXGA, HD720p, HD1080p };

public static class ResolutionHelper
{
    static private Size _size; 

    private static bool IsWvga
    {
        get
        {
            return App.Current.Host.Content.ScaleFactor == 100;
        }
    }

    private static bool IsWxga
    {
        get
        {
            return App.Current.Host.Content.ScaleFactor == 160;
        }
    }

    private static bool Is720p
    {
        get
        {
            return (App.Current.Host.Content.ScaleFactor == 150 &amp;&amp; !Is1080p);
        }
    }

    private static bool Is1080p
    {
        get
        {
            if(_size.Width == 0)
            {
                try
                {
                    _size = (Size)DeviceExtendedProperties.GetValue("PhysicalScreenResolution");
                }
                catch (Exception)
                {
                    _size.Width = 0;
                }
            }
            return _size.Width == 1080;
        }
    }

    public static Resolutions CurrentResolution
    {
        get
        {
            if (IsWvga) return Resolutions.WVGA;
            else if (IsWxga) return Resolutions.WXGA;
            else if (Is720p) return Resolutions.HD720p;
            else if (Is1080p) return Resolutions.HD1080p;
            else throw new InvalidOperationException("Unknown resolution");
        }
    }
}</pre>

<p>
	<font style="margin: 0px; padding: 0px; border: 0px; font-family: Tahoma, Geneva, sans-serif; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">需要注意的是无法使用&amp;nbsp;</font></font><samp class="ph codeph" style="margin: 0px; padding: 0px; border: 0px; font-family: 'Courier New', Courier, monospace; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">App.Current.Host.Content.ScaleFactor</font></font></samp><font style="margin: 0px; padding: 0px; border: 0px; font-family: Tahoma, Geneva, sans-serif; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">&nbsp;或&amp;nbsp;</font></font><samp class="ph codeph" style="margin: 0px; padding: 0px; border: 0px; font-family: 'Courier New', Courier, monospace; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">Application.Current.Host.Content.ActualHeight</font></font></samp><span style="color: rgb(85, 85, 85); font-family: Tahoma, Geneva, sans-serif; font-size: 13px; line-height: 18px;">区分720p和1080p，&lt;/span><font style="margin: 0px; padding: 0px; border: 0px; font-family: Tahoma, Geneva, sans-serif; line-height: 18px; vertical-align: baseline; color: rgb(85, 85, 85);"><font style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">&nbsp;因为它们是相同的值，分别为150和853。&lt;/font></font>
</p>

<h2 class="title sectiontitle" id="toc_Highresolutiongraphics">
	High resolution graphics
</h2>

<p class="p">
	To make an application look as good as possible across the range of devices with several different resolutions, it is suggested to simply use assets designed for 1080p resolution and let the Windows Phone OS properly downscale them as needed. Such assets include application graphics, splash screen, lockscreen, and live tiles.
</p>

<p class="p">
	The operating system automatically downscales the app&rsquo;s 1080p assets when running the app on a 720p device, and retains the high DPI when running the app on a 1080p device. It is highly encouraged to keep your application as a single XAP file that supports all screen sizes and resolutions. That XAP file only needs to provide the high resolution assets; they will be scaled down by the OS as needed.
</p>

<p class="p">
	However, if the package is designed to support both 16:9 and 15:9 aspect ratio devices, to handle <a class="xref" href="http://developer.nokia.com/Resources/Library/Lumia/#!optimising-for-nokia-phablets/aspect-ratio-considerations.html" jquery172033909067278619303="50">aspect ratio considerations</a> you may have to provide two variants of the high resolution graphics and decide at run time which one to use:
</p>

<pre class="brush:csharp;">
public class MultiResImageChooserUri
{
    public Uri BestResolutionImage
    {
        get
        {
            switch (ResolutionHelper.CurrentResolution)
            {
                case Resolutions.HD1080p:
                case Resolutions.HD720p:
                    //return 16:9 aspect ratio asset, high res
                    return new Uri("Assets/MyImage.screen-1080p.jpg", UriKind.Relative);
                case Resolutions.WXGA:
                case Resolutions.WVGA:
                    // return 15:9 aspect ratio asset, high res
                    return new Uri("Assets/MyImage.screen-wxga.jpg", UriKind.Relative);
                default:
                    throw new InvalidOperationException("Unknown resolution type");
            }
        }
    }
}</pre>

<p>
	Some thought should be given to loading assets from the remote servers, and aim at providing the best practical resolution while keeping the data transfer costs and and loading time as low as possible. In Music Explorer example application this is achieved by loading the image best suited for device&#39;s resolution, determined by the <samp class="ph codeph">ResolutionHelper</samp> (shown in the section <em class="ph i">Resolution detection code update</em> above). The 320x320 images are used only in 1080p devices, while the 200x200 images were seen to be sharp and crisp enough for devices with smaller resolution.
</p>

<pre class="brush:csharp;">
public class ArtistModel : INotifyPropertyChanged
{
    ...

    /// &lt;summary&gt;
    /// Artist&#39;s ThumbUri property.
    /// This property is used in the UI to display the image in Uri using a Binding.
    /// &lt;/summary&gt;
    public Uri ThumbUri
    {
        get
        {
            if (_thumb320Uri != null &amp;&amp; ResolutionHelper.CurrentResolution == Resolutions.HD1080p)
            {
                return _thumb320Uri;
            }
            else if (_thumb200Uri != null)
            {
                return _thumb200Uri;
            }
            else if (_thumb100Uri != null)
            {
                return _thumb100Uri;
        }
            else
            {
                return new Uri("/Assets/thumb_100_placeholder.png",
                               UriKind.Relative);
            }
        }
    }
    ...
}</pre>

<p>
	Application&#39;s memory consumption can be optimised when loading large images:&nbsp;
</p>

<pre class="brush:csharp;">
...
var bmp = new BitmapImage();
 
// no matter the actual size, this bitmap is decoded to 480 pixels width
// (aspect ratio preserved) and only takes up the memory needed for this size
bmp.DecodePixelWidth = 480; 

bmp.UriSource = new Uri(@"Assets\Demo.png", UriKind.Relative);
ImageControl.Source = bmp;
...</pre>

<div class="preWrapper" id="preWrapper_3">
	<div class="copyCode noPrint">
		<a href="http://developer.nokia.com/Resources/Library/Lumia/#" id="copyCode_3">Copy code</a>
	</div>
</div>

<p class="p">
	For more information on multi-resolution support, see ​&lt;a class="xref" href="http://channel9.msdn.com/Events/Build/2012/2-021#time=08m20s" jquery172033909067278619303="51" target="_blank">​Windows Phone 8: XAML Application Development (video, from 08:20 onwards)</a>.
</p>

<p class="p">
	Note that for XNA and DirectX apps, bitmaps are scaled by the hardware; developers cannot provide higher-resolution assets for 1080p devices in Windows Phone 8.
</p>

<div class="section" id="idf7e13773-ec63-412b-bb4f-1d6e5f333b66__section-3">
	<h2 class="title sectiontitle" id="toc_Splashscreenguidance">
		Splash screen guidance
	</h2>

	<p class="p">
		To have a full screen splash screen displayed on 720p/1080p device, a 720x1280 pixel splash screen image <samp class="ph codeph">SplashScreenImage.Screen-720p.jpg</samp> should be provided by the solution. The image will go full screen also in 1080p devices due to up-scaling. In order to have a pixel perfect splash screen for 1080p devices and avoid up-scaling, a full 1080x1920 pixel splash screen image can be provided in the 720p splash screen file. It will automatically be scaled down on 720p devices, while being displayed in native resolution on 1080p devices.
	</p>

	<p class="p">
		Note that although the ​current guidance from Microsoft regarding splash screens may encourage the use of a single splash screen file named <samp class="ph codeph">SplashScreenImage.jpg</samp> containing a 768&times;1280 pixel image, an image of that size does not scale correctly on 1080p devices, it leaves an empty area at the top of the screen.
	</p>

	<p class="p">
		&nbsp;
	</p>
</div>

<div class="section" id="idf7e13773-ec63-412b-bb4f-1d6e5f333b66__section-4">
	<h2 class="title sectiontitle" id="toc_Lensetile">
		Lense tile
	</h2>

	<p class="p">
		1080p devices use HD720p lense tile variant, see <a class="xref" href="http://msdn.microsoft.com/library/windowsphone/design/jj662922(v=vs.105).aspx#BKMK_Providingiconsforthelenspicker" jquery172033909067278619303="52" target="_blank">​Lens design guidelines for Windows Phone</a>. but a higher resolution image (i.e., 1.5x the recommended size for 720p) can be provided in the <samp class="ph codeph">Lens.Screen-720p.png</samp> file for a more crisp look on 1080p devices.
	</p>

	<p class="p">
		&nbsp;
	</p>
</div>

<div class="section" id="idf7e13773-ec63-412b-bb4f-1d6e5f333b66__section-5">
	<h2 class="title sectiontitle" id="toc_Tiles">
		Tiles
	</h2>

	<p class="p">
		Tiles in 1080p are smaller in size due to the adoption of 3 column layout. Tiles are scaled down automatically by the platform, so there is no need for a developer to provide additional 1080p tiles. For more detailed information, please see section <a class="xref" href="http://developer.nokia.com/Resources/Library/Lumia/#!optimising-for-nokia-phablets/design-considerations.html;#id1855e8a6-f0b3-480a-abe8-389ade608edf__section-1" jquery172033909067278619303="53">Live tiles</a> in chapter Design considerations.
	</p>

	<p class="p">
		&nbsp;
	</p>
</div>

<div class="section" id="idf7e13773-ec63-412b-bb4f-1d6e5f333b66__section-6">
	<h2 class="title sectiontitle" id="toc_Scalingfactorconsiderations">
		Scaling factor considerations
	</h2>

	<p class="p">
		<strong class="ph b">Controls</strong>
	</p>

	<p class="p">
		On a 768p (WXGA) device, a control with the logical size of 100px is scaled up by a factor of 1.6, resulting in a control with 160px physical size once rendered on the screen.
	</p>

	<p class="p">
		On a 1080p device the reported scale factor is 1.5, but the real scaling is done with a factor of 2.25 (2 x 1.5), so a 100px control will end up having a physical size of 225px.
	</p>

	<p class="p">
		This means that in order to have a control of the same physical size on both 768p and 1080p devices, its logical size will have to be scaled down with a factor of 1.6/2.25 = 0.7111 on 1080p devices. This is visualised using Music Explorer as an example. The tile controls share the same physical value between the devices with different resolutions, the margins of the control explaining the small difference in size of the actual photo of the artist.&nbsp;
	</p>
</div>

<div class="section" id="idf7e13773-ec63-412b-bb4f-1d6e5f333b66__section-7">
	<h2 class="title sectiontitle" id="toc_Highdefinitionvideodeliveryto1080pdevices">
		High-definition video delivery to 1080p devices
	</h2>

	<p class="p">
		Windows Phone will continue to display a video stream at the highest resolution allowed by the display, the same as it does today. To help developers decide on the best stream to render, they should use the <samp class="ph codeph">PhysicalScreenResolution</samp> property. If the developer wishes to use the physical dimensions of the screen to select a stream, the screen size calculations shown in <em class="ph i">What is a big screen?</em> section can be used to make that determination.
	</p>

	<p class="p">
		Microsoft&#39;s Smooth Streaming technology &ndash; which allows for video streaming at a variable bitrate, balancing device&#39;s capabilities (device resolution, hardware codecs) with network conditions and power usage &ndash; is highly recommended. At the time of writing, the <a class="xref" href="https://playerframework.codeplex.com/" jquery172033909067278619303="55" target="_blank">PlayerFramework</a> component does not support 1080p devices, but its implementation can be easily updated by adding 1080p resolution detection in <samp class="ph codeph">Phone.SL.Adaptive/ResolutionHelper.cs </samp>which then enables setting the correct <samp class="ph codeph">MaxPixels</samp> value in <samp class="ph codeph">Phone.SL.Adaptive/AdaptiveStreamingManager.cs</samp>. Progressive download is also supported with up to 1080p resolution at 30fps (max).
	</p>

	<p class="p">
		For details about hardware supported video and audio codecs, see ​&lt;a class="xref" href="http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff462087(v=vs.105).aspx" jquery172033909067278619303="56" target="_blank">​Supported media codecs for Windows Phone</a>.
	</p>

	<p class="p">
		&nbsp;
	</p>
</div>

<div class="section" id="idf7e13773-ec63-412b-bb4f-1d6e5f333b66__section-8">
	<h2 class="title sectiontitle" id="toc_Memoryconsiderations">
		Memory considerations
	</h2>

	<p class="p">
		With larger screen and better resolutions, the graphics of the application are likely to use more memory than in devices of lesser resolution and display size. Applications can request more memory with <samp class="ph codeph">ID_FUNCCAP_EXTEND_MEM</samp> entry in the app manifest file, as instructed in <a class="xref" href="http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj681682(v=vs.105).aspx" jquery172033909067278619303="57" target="_blank">​App memory limits for Windows Phone 8</a>.
	</p>

	<p class="p">
		Using <samp class="ph codeph">ID_FUNCCAP_EXTEND_MEM</samp> flag grants a higher memory allocation instead of the default lower level. It enforces the maximum memory limit by phone type: 180 MB on lower-memory phones; 380 MB on phones with over 1 GB memory; and 570 MB on devices with 2 GB memory.
	</p>

	<p class="p">
		This should be noted especially when writing applications using <a class="xref" href="http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff941104(v=vs.105).aspx" jquery172033909067278619303="58" target="_blank">​Panorama control</a> with its long horizontal canvas and up to five <a class="xref" href="http://msdn.microsoft.com/en-us/library/windowsphone/develop/microsoft.phone.controls.panoramaitem(v=vs.105).aspx" jquery172033909067278619303="59" target="_blank">​PanoramaItems</a>, which can get graphically very complex. The navigation transitions of the <a class="xref" href="http://phone.codeplex.com/" jquery172033909067278619303="60" target="_blank">Windows Phone Toolkit</a> are known to be particularly memory hungry : a memory consumption peak is often reached when navigating from/to the page containing the panorama.
	</p>

	<p class="p">
		原文：http://developer.nokia.com/Resources/Library/Lumia/#!optimising-for-nokia-phablets/resolution-specific-considerations.html
	</p>
</div>