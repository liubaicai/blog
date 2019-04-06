---
layout:     post
title:      "[Cocos2d-x for WP8学习笔记] CCNode"
date:       2013-07-12 16:36:05 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h3>
	常用属性
</h3>

<p>
	ContentSize:节点内容的大小
</p>

<p>
	AnchorPoint,Position:节点的位置
</p>

<p>
	Rotation:旋转角度
</p>

<p>
	Scale:缩放比例
</p>

<p>
	Visible:是否可见
</p>

<p>
	SkewX,SkewY:斜切角度
</p>

<p>
	Tag:节点标记
</p>

<p>
	UserData:自定义的其他任意数据
</p>

<p>
	Children:子节点数组
</p>

<p>
	Parent:父节点
</p>

<p>
	CameraRETURN:摄像机状态
</p>

<p>
	Grid:网格特效
</p>

<p>
	ShaderProgram:Shader程序
</p>

<p>
	ActionManager:动作管理器
</p>

<p>
	Scheduler:计时器管理器
</p>

<h3>
	常用方法
</h3>

<p>
	update:刷新事件，每帧绘制前被触发
</p>

<p>
	schedule:指定间隔执行的方法
</p>

<p>
	onEnter:即将呈现时调用
</p>

<p>
	onEnterTransitionDidFinish:场景载入后调用
</p>

<p>
	onExit:即将推出时调用
</p>

<p>
	onExitTransitionDidStart:场景结束后调用
</p>