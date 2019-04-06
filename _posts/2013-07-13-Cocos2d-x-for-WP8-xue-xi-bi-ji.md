---
layout:     post
title:      "[Cocos2d-x for WP8学习笔记]CCMenu,CCLayerColor,CCLayerGradient"
date:       2013-07-13 12:53:00 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	Cocos2d-x内置了三种特殊的CCLayer
</p>

<h3>
	CCLayerColor
</h3>

<p>
	一个色块
</p>

<h3>
	CCLayerGradient
</h3>

<p>
	一个渐变色块
</p>

<h3>
	CCMenu
</h3>

<p>
	游戏菜单
</p>

<p>
	将之前建立的启动界面做下修改，在init中添加菜单:
</p>

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2013/07/186-1.jpg"><img alt="186-1" class="alignnone size-medium wp-image-188" height="196" src="http://www.liubaicai.net/wp-content/uploads/2013/07/186-1-300x196.jpg" width="300" /></a>
</p>

<pre class="brush:cpp;">
bool MainScene::init()
{
&nbsp;bool bRet = false;
&nbsp;do 
&nbsp;{
&nbsp;&nbsp;if ( !CCLayer::init() )
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;break;
&nbsp;&nbsp;}

&nbsp;&nbsp;CCSize size = CCDirector::sharedDirector()-&gt;getWinSize();
&nbsp;&nbsp;
&nbsp;&nbsp;CCSprite* back = CCSprite::create("Background/main_back.jpg");
&nbsp;&nbsp;back-&gt;setPosition(ccp(size.width * 0.5, size.height * 0.5));
&nbsp;&nbsp;this-&gt;addChild(back);

&nbsp;&nbsp;CCMenuItem* start=CCMenuItemFont::create("Start",this,menu_selector(MainScene::startGame));
&nbsp;&nbsp;CC_BREAK_IF(!start);
&nbsp;&nbsp;start-&gt;setPosition(ccp((size.width)/2, (size.height)/2));
&nbsp;&nbsp;
&nbsp;&nbsp;CCMenuItem* exit=CCMenuItemFont::create("Exit",this,menu_selector(MainScene::exitGame));
&nbsp;&nbsp;CC_BREAK_IF(!exit);
&nbsp;&nbsp;exit-&gt;setPosition(ccp((size.width)/2, (size.height)/2-70));

&nbsp;&nbsp;CCMenu* menu = CCMenu::create(start,exit,NULL);
&nbsp;&nbsp;CC_BREAK_IF(!menu);
&nbsp;&nbsp;menu-&gt;setPosition(CCPointZero);
&nbsp;&nbsp;this-&gt;addChild(menu);

&nbsp;&nbsp;bRet = true;
&nbsp;} while (0);

&nbsp;return bRet;
}</pre>

<p>
	添加响应事件:
</p>

<pre class="brush:cpp;">
void MainScene::startGame(CCObject* send)
{
&nbsp;CCDirector::sharedDirector()-&gt;replaceScene(GameScene::scene());
}
void MainScene::exitGame(CCObject* send)
{
&nbsp;CCDirector::sharedDirector()-&gt;end();//这里会报异常，不知道为啥
}</pre>

<p>
	在游戏主界面GameScene中利用CCLayerColor初始化界面
</p>

<pre class="brush:cpp;">
CCScene* GameScene::scene()
{
&nbsp;CCScene * scene = NULL;
&nbsp;do 
&nbsp;{
&nbsp;&nbsp;scene = CCScene::create();
&nbsp;&nbsp;CC_BREAK_IF(! scene);

&nbsp;&nbsp;CCLayerColor *layer = CCLayerColor::create(ccc4(255, 0, 255, 244));
&nbsp;&nbsp;CC_BREAK_IF(! layer);

&nbsp;&nbsp;scene-&gt;addChild(layer);
&nbsp;} while (0);

&nbsp;return scene;
}</pre>