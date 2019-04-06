---
layout:     post
title:      "[Cocos2d-x for WP8学习笔记] HelloWorld结构分析"
date:       2013-07-09 14:56:23 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

先来看一下目录结构：

<img src="http://www.liubaicai.net/wp-content/uploads/2013/07/3.jpg" alt="" width="278" height="272" />

&nbsp;

<span style="color: #60d978;">Assets</span>：游戏资源文件，图片音频等，Resource文件夹也有类似功能

<span style="color: #60d978;">include</span>：用于放置游戏头文件

<span style="color: #60d978;">Shaders</span>：渲染器着色器文件（大雾）

<span style="color: #60d978;">cocos2dorig.</span>cpp/.h：Direct3D游戏默认入口，默认文件名和项目名相同，在Cocos2dx中，经由这里转而启动AppDelegate
<pre class="brush:cpp;first-line:1;pad-line-numbers:true;highlight:null;collapse:false;">//WP8Direct3D游戏默认启动入口
IFrameworkView^ Direct3DApplicationSource::CreateView()
{
	return ref new PhoneDirect3DAppDemo();
}
[Platform::MTAThread]
int main(Platform::Array&lt;Platform::String^&gt;^)
{
	auto direct3DApplicationSource = ref new Direct3DApplicationSource();
	CoreApplication::Run(direct3DApplicationSource);
	return 0;
}

//Cocos2dx启动入口
IFrameworkView^ Direct3DApplicationSource::CreateView()
{
    return ref new cocos2dorig();
}
ref class CCApplicationFrameworkViewSource sealed : Windows::ApplicationModel::Core::IFrameworkViewSource 
{
public:
	virtual Windows::ApplicationModel::Core::IFrameworkView^ CreateView()
    {
        return cocos2d::getSharedCCApplicationFrameworkView();
    }
};
[Platform::MTAThread]
int main(Platform::Array&lt;Platform::String^&gt;^)
{
    //auto direct3DApplicationSource = ref new Direct3DApplicationSource();
    //CoreApplication::Run(direct3DApplicationSource);
	AppDelegate App;
	auto frameworkViewSource = ref new CCApplicationFrameworkViewSource();
	Windows::ApplicationModel::Core::CoreApplication::Run(frameworkViewSource);
    return 0;
}
</pre>
<h3><span style="color: #e53333;">AppDelegate.cpp/.h:</span></h3>
游戏通用入口文件，控制着游戏的生命周期
<span style="color: #ee33ee;">bool AppDelegate::applicationDidFinishLaunching()</span>
游戏启动后调用这个方法
<pre class="brush:cpp;first-line:1;pad-line-numbers:true;highlight:null;collapse:false;">bool AppDelegate::applicationDidFinishLaunching()
{
	// 初始化游戏引擎控制器
	CCDirector *pDirector = CCDirector::sharedDirector();
	pDirector-&gt;setOpenGLView(CCEGLView::sharedOpenGLView());

	// 开发阶段可以打开FPS显示以观察流畅度
	//pDirector-&gt;setDisplayFPS(false);

	// 设置横竖屏显示
	pDirector-&gt;setDeviceOrientation(CCDeviceOrientationPortrait);

	// 设置每秒刷新率即FPS，默认每秒60次
	//pDirector-&gt;setAnimationInterval(1.0 / 60);

	// 创建场景
	CCScene *pScene = HelloWorld::scene();

	// 运行场景
	pDirector-&gt;runWithScene(pScene);

	return true;
}</pre>
<span style="color: #ee33ee;">void AppDelegate::applicationDidEnterBackground()</span>
游戏转入后台时进行的操作，一般来说，要将游戏暂停
<span style="color: #ee33ee;">void AppDelegate::applicationWillEnterForeground()</span>
游戏回到前台时对应的操作
<h3> <span style="color: #e53333;">HelloWorldScene.cpp/.h</span></h3>
HelloWorld游戏的场景，在AppDelegate::applicationDidFinishLaunching()中创建并运行。

<span style="color: #ee33ee;">CCScene* HelloWorld::scene()</span>

<span style="color: #ee33ee;"><span style="color: #000000;">场景创建</span></span>
<pre class="brush:cpp;first-line:1;pad-line-numbers:true;highlight:null;collapse:false;">CCScene* HelloWorld::scene()
{
	CCScene * scene = NULL;
	do 
	{		
		// 创建一个空场景
		scene = CCScene::create();
		CC_BREAK_IF(! scene);

		// 创建一个HelloWorld层
		HelloWorld *layer = HelloWorld::create();
		CC_BREAK_IF(! layer);

		// 将HelloWorld层添加到场景中
		scene-&gt;addChild(layer);
	} while (0);

	return scene;
}</pre>
<span style="color: #ee33ee;">bool HelloWorld::init()</span>

<span style="color: #000000;">初始化HelloWorld类&lt;/span>

&nbsp;
<pre class="brush:cpp;first-line:1;pad-line-numbers:true;highlight:null;collapse:false;">bool HelloWorld::init()
{
	bool bRet = false;

	do 
	{
		//调用父类方法进行初始化
		if ( !CCLayer::init() )
		{
			break;
		}

		//创建文字标签添加到层中
        CCSize size = CCDirector::sharedDirector()-&gt;getWinSize();
		CCLabelTTF* pLabel = CCLabelTTF::create("Hello World", "Times New Roman", 24);
		pLabel-&gt;setPosition( ccp(size.width * 0.5, size.height * 0.5) );
		pLabel-&gt;setColor(ccc3(160, 80, 5));
		this-&gt;addChild(pLabel, 1);

		//创建显示HelloWorld的精灵并添加到层中
		CCSprite *b = CCSprite::create("HelloWorld.png");
		b-&gt;setPosition(ccp(0, 0));
		b-&gt;setPosition(ccp(size.width * 0.5, size.height * 0.5));
		this-&gt;addChild(b);

		//设置程序可以响应触摸
		setTouchEnabled(true);

		bRet = true;
	} while (0);

	return bRet;
}</pre>
&nbsp;