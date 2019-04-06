---
layout:     post
title:      "Win8商店应用获取本机网络连接状态"
date:       2013-07-04 15:11:41 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="prettyprint lang-cs">private bool IsConnectedToInternet()
        {
            bool connected = false;
            ConnectionProfile cp = NetworkInformation.GetInternetConnectionProfile();
            if (cp != null)
            {
                NetworkConnectivityLevel cl = cp.GetNetworkConnectivityLevel();
                connected = cl == NetworkConnectivityLevel.InternetAccess;
            }
            return connected;
        }</pre>
<p>
	就是这样~
</p>