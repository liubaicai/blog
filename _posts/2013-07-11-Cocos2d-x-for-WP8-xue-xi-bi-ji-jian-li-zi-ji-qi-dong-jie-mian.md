---
layout:     post
title:      "[Cocos2d-x for WP8学习笔记] 建立自己的启动界面"
date:       2013-07-11 16:31:51 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	首先新建一个MainScene的类，并模仿HelloWorld引入需要的头文件等，项目中加入两张图片，主界面和主界面按钮上的背景。
</p>

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2013/07/157-1.jpg"><img alt="157-1" class="alignnone size-medium wp-image-166" height="300" src="http://www.liubaicai.net/wp-content/uploads/2013/07/157-1-180x300.jpg" width="180" /></a>
</p>

<h3>
	CCDirector:导演类，控制游戏流程
</h3>

<p>
	将AppDelegate中创建的第一个场景改为刚创建的MainScene<br />
	CCScene *pScene = MainScene::scene();
</p>

<h3>
	CCScene:场景，层的容器&lt;br />
	CCLayer:层，各种内容的容器
</h3>

<p>
	在MainScene中实现一些必须的方法，如初始化等等
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
&nbsp;&nbsp;CCSprite* mainback = CCSprite::create("Background/main_back.jpg");
&nbsp;&nbsp;mainback-&gt;setPosition(ccp(size.width * 0.5, size.height * 0.5));
&nbsp;&nbsp;this-&gt;addChild(mainback);

&nbsp;&nbsp;CCSprite* btback1 = CCSprite::create("Background/main_button_back.png");
&nbsp;&nbsp;btback1-&gt;setPosition( ccp(size.width * 0.5, size.height * 0.5) );
&nbsp;&nbsp;CCLabelTTF* pLabelStart = CCLabelTTF::create("Start", "Consolas", 28);
&nbsp;&nbsp;pLabelStart-&gt;setPosition( ccp(75, 20) );
&nbsp;&nbsp;pLabelStart-&gt;setColor(ccc3(0, 0,0));
&nbsp;&nbsp;this-&gt;addChild(btback1,1);
&nbsp;&nbsp;btback1-&gt;addChild(pLabelStart, 5);

&nbsp;&nbsp;CCSprite* btback2 = CCSprite::create("Background/main_button_back.png");
&nbsp;&nbsp;btback2-&gt;setPosition( ccp(size.width * 0.5, size.height * 0.5-70) );
&nbsp;&nbsp;CCLabelTTF* pLabelExit = CCLabelTTF::create("Exit", "Consolas", 28);
&nbsp;&nbsp;pLabelExit-&gt;setPosition( ccp(75, 20) );
&nbsp;&nbsp;pLabelExit-&gt;setColor(ccc3(0, 0, 0));
&nbsp;&nbsp;btback2-&gt;addChild(pLabelExit, 6);
&nbsp;&nbsp;this-&gt;addChild(btback2,2);


&nbsp;&nbsp;setTouchEnabled(true);

&nbsp;&nbsp;bRet = true;
&nbsp;} while (0);

&nbsp;return bRet;
}</pre>

<p>
	在这段代码中，分别添加了一张背景，两张按钮背景，两段文字。
</p>

<h3>
	CCSprite：精灵，代表了游戏的最小可见单位。
</h3>

<p>
	上面添加的每张图片都是一个精灵。
</p>

<p>
	CCSprite和CCLayer都继承自CCNode，而addChild正是CCNode中的方法，因此可以向层或者精灵中中添加精灵。
</p>

<p>
	下面的代码在MainScene层响应触摸事件，获取坐标，并执行退出操作：
</p>

<pre class="brush:cpp;">
void MainScene::ccTouchesBegan(CCSet* touches, CCEvent *event)
{
&nbsp;if(touches-&gt;count()==1)
&nbsp;{
&nbsp;&nbsp;CCTouch* touch = dynamic_cast&lt;CCTouch*&gt;(touches-&gt;anyObject());
&nbsp;&nbsp;CCPoint position = touch-&gt;getLocationInView();
&nbsp;&nbsp;position=CCDirector::sharedDirector()-&gt;convertToGL(position);

&nbsp;&nbsp;CCLOG("X = %f Y = %f",position.x,position.y);

&nbsp;&nbsp;if(position.x&gt;166&amp;&amp;position.x&lt;313&amp;&amp;position.y&gt;306&amp;&amp;position.y&lt;353)
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;CCDirector::sharedDirector()-&gt;end();
&nbsp;&nbsp;}
&nbsp;}
}</pre>

<p>
	&nbsp;
</p>