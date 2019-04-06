---
layout:     post
title:      "百度天气API分享(备忘)"
date:       2014-09-18 03:59:17 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

百度地图提供了大量基于位置的API服务，多数是免费使用的(可能有访问次数限制)
其中有天气API
文档:
http://developer.baidu.com/map/wiki/index.php?title=car/api/weather
返回json:
<pre class="brush:js">{
 "error": 0,
 "status": "success",
 "date": "2014-09-18",
 "results": [
 {
 "currentCity": "北京市&quot;,
 "pm25": "163",
 "index": [
 {
 "title": "穿衣",
 "zs": "较舒适&quot;,
 "tipt": "穿衣指数",
 "des": "建议着薄外套或牛仔衫裤等服装。年老体弱者宜着夹克衫、薄毛衣等。昼夜温差较大，注意适当增减衣服。&quot;
 },
 {
 "title": "洗车",
 "zs": "较适宜",
 "tipt": "洗车指数",
 "des": "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。&quot;
 },
 {
 "title": "旅游",
 "zs": "适宜",
 "tipt": "旅游指数",
 "des": "天气较好，温度适宜，是个好天气哦。这样的天气适宜旅游，您可以尽情地享受大自然的风光。&quot;
 },
 {
 "title": "感冒",
 "zs": "少发",
 "tipt": "感冒指数",
 "des": "各项气象条件适宜，无明显降温过程，发生感冒机率较低。&quot;
 },
 {
 "title": "运动",
 "zs": "较适宜",
 "tipt": "运动指数",
 "des": "天气较好，但考虑气温较低，推荐您进行室内运动，若户外适当增减衣物并注意防晒。&quot;
 },
 {
 "title": "紫外线强度&quot;,
 "zs": "强&quot;,
 "tipt": "紫外线强度指数&quot;,
 "des": "紫外线辐射强，建议涂擦SPF20左右、PA++的防晒护肤品。避免在10点至14点暴露于日光下。&quot;
 }
 ],
 "weather_data": [
 {
 "date": "周四 09月18日 (实时：23℃)",
 "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/qing.png",
 "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/duoyun.png",
 "weather": "晴转多云",
 "wind": "微风",
 "temperature": "26 ~ 14℃&quot;
 },
 {
 "date": "周五",
 "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/yin.png",
 "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/zhenyu.png",
 "weather": "阴转阵雨",
 "wind": "微风",
 "temperature": "23 ~ 15℃&quot;
 },
 {
 "date": "周六",
 "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/qing.png",
 "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/qing.png",
 "weather": "晴&quot;,
 "wind": "微风",
 "temperature": "27 ~ 16℃&quot;
 },
 {
 "date": "周日",
 "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/qing.png",
 "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/qing.png",
 "weather": "晴&quot;,
 "wind": "微风",
 "temperature": "27 ~ 15℃&quot;
 }
 ]
 }
 ]
 }</pre>