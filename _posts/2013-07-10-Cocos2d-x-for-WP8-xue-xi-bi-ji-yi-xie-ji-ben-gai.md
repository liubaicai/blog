---
layout:     post
title:      "[Cocos2d-x for WP8学习笔记] 一些基本概念"
date:       2013-07-10 16:30:47 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<span style="display: none;">&nbsp;</span>
<p>
	<span style="font-family: arial,helvetica,sans-serif;"><span style="color: rgb(204, 51, 229);">流程控制</span>：场景是相对不变的游戏元素集合，游戏在场景间的切换就是流程控制。&lt;/span></p>
<p>
	<span style="font-family: arial,helvetica,sans-serif;"><span style="color: rgb(204, 51, 229);">场景、层和精灵&lt;/span>：它们是不同层次的游戏元素。通常，场景包含层，层包含精灵，场景与层是其他游戏元素的容器，而精灵是展示给玩家的图形。&lt;/span></p>
<p>
	<span style="font-family: arial,helvetica,sans-serif;"><span style="color: rgb(204, 51, 229);">节点和渲染树</span>：一切可以显示的游戏元素都是渲染树的节点。Cocos2d-x通过遍历渲染树绘制游戏画面。场景、层或精灵作为渲染树节点，我们并没有对它们的层次做硬性限制，例如开发者可以向精灵中添加层。&lt;/span></p>
<p>
	<span style="font-family: arial,helvetica,sans-serif;">&nbsp;<span style="color: rgb(204, 51, 229);">动作</span>：作用于游戏元素，规定了游戏元素运动的方式。帧动画是作用于精灵的一种特殊动作。&lt;/span></p>
<p>
	<span style="font-family: arial,helvetica,sans-serif;"><span style="color: rgb(204, 51, 229);">类似Objective-C的代码风格&lt;/span>：使用初始化方法或工厂方法创建对象，使用访问器方法模拟属性。Cocos2d-x提供了Objective-C风格的容器CCArray和CCDictionary。&lt;/span></p>
<p>
	<span style="font-family: arial,helvetica,sans-serif;"><span style="color: rgb(204, 51, 229);">内存管理</span>：类似Objective-C的引用计数内存管理机制，同时提供半自动的对象自动回收池，实现灵活的管理内存。&lt;/span></p>
<p>
	<span style="font-family: arial,helvetica,sans-serif;"><span style="color: rgb(204, 51, 229);">生命周期</span>：AppDelegate负责控制游戏的生命周期。&lt;/span></p>
<span style="display: none;">&nbsp;</span>