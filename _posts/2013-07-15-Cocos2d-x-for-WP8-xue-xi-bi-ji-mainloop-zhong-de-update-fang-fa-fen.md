---
layout:     post
title:      "[Cocos2d-x for WP8学习笔记] mainloop中的update方法分析"
date:       2013-07-15 13:48:39 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="brush:cpp;">
void CCScheduler::update(float dt)
{
&nbsp;&nbsp;&nbsp; m_bUpdateHashLocked = true;

&nbsp;// 预处理
&nbsp;&nbsp;&nbsp; if (m_fTimeScale != 1.0f)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; dt *= m_fTimeScale;
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 枚举所有的update定时器
&nbsp;&nbsp;&nbsp; tListEntry *pEntry, *pTmp;

&nbsp;&nbsp;&nbsp; CCScriptEngineProtocol* pEngine = CCScriptEngineManager::sharedManager()-&gt;getScriptEngine();

&nbsp;&nbsp;&nbsp; // 优先级小于0的定时器
&nbsp;&nbsp;&nbsp; DL_FOREACH_SAFE(m_pUpdatesNegList, pEntry, pTmp)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if ((! pEntry-&gt;paused) &amp;&amp; (! pEntry-&gt;markedForDeletion))
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (pEngine != NULL &amp;&amp; kScriptTypeJavascript == pEngine-&gt;getScriptType())
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pEngine-&gt;executeSchedule(0, dt, (CCNode *)pEntry-&gt;target);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pEntry-&gt;target-&gt;update(dt);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 优先级等于0的定时器
&nbsp;&nbsp;&nbsp; DL_FOREACH_SAFE(m_pUpdates0List, pEntry, pTmp)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if ((! pEntry-&gt;paused) &amp;&amp; (! pEntry-&gt;markedForDeletion))
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (pEngine != NULL &amp;&amp; kScriptTypeJavascript == pEngine-&gt;getScriptType())
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pEngine-&gt;executeSchedule(0, dt, (CCNode *)pEntry-&gt;target);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pEntry-&gt;target-&gt;update(dt);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 优先级大于0的定时器
&nbsp;&nbsp;&nbsp; DL_FOREACH_SAFE(m_pUpdatesPosList, pEntry, pTmp)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if ((! pEntry-&gt;paused) &amp;&amp; (! pEntry-&gt;markedForDeletion))
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (pEngine != NULL &amp;&amp; kScriptTypeJavascript == pEngine-&gt;getScriptType())
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pEngine-&gt;executeSchedule(0, dt, (CCNode *)pEntry-&gt;target);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pEntry-&gt;target-&gt;update(dt);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 枚举所有的普通定时器
&nbsp;&nbsp;&nbsp; for (tHashTimerEntry *elt = m_pHashForTimers; elt != NULL; )
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; m_pCurrentTarget = elt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; m_bCurrentTargetSalvaged = false;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (! m_pCurrentTarget-&gt;paused)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;//枚举此节点中的计时器
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // timers数组可能在循环中改变&nbsp; 需要格外小心
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for (elt-&gt;timerIndex = 0; elt-&gt;timerIndex &lt; elt-&gt;timers-&gt;num; ++(elt-&gt;timerIndex))
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; elt-&gt;currentTimer = (CCTimer*)(elt-&gt;timers-&gt;arr[elt->timerIndex]);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; elt-&gt;currentTimerSalvaged = false;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; elt-&gt;currentTimer-&gt;update(dt);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (elt-&gt;currentTimerSalvaged)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // The currentTimer told the remove itself. To prevent the timer from
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // accidentally deallocating itself before finishing its step, we retained
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // it. Now that step is done, it&#39;s safe to release it.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; elt-&gt;currentTimer-&gt;release();
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; elt-&gt;currentTimer = NULL;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // elt, at this moment, is still valid
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // so it is safe to ask this here (issue #490)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; elt = (tHashTimerEntry *)elt-&gt;hh.next;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // only delete currentTarget if no actions were scheduled during the cycle (issue #481)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (m_bCurrentTargetSalvaged &amp;&amp; m_pCurrentTarget-&gt;timers-&gt;num == 0)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; removeHashElement(m_pCurrentTarget);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 处理脚本引擎的相关事宜
&nbsp;&nbsp;&nbsp; if (m_pScriptHandlerEntries)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for (int i = m_pScriptHandlerEntries-&gt;count() - 1; i &gt;= 0; i--)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CCSchedulerScriptHandlerEntry* pEntry = static_cast&lt;CCSchedulerScriptHandlerEntry*&gt;(m_pScriptHandlerEntries-&gt;objectAtIndex(i));
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (pEntry-&gt;isMarkedForDeletion())
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; m_pScriptHandlerEntries-&gt;removeObjectAtIndex(i);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; else if (!pEntry-&gt;isPaused())
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pEntry-&gt;getTimer()-&gt;update(dt);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 清理所有的被标记了删除记号的update方法
&nbsp;&nbsp;&nbsp; // 优先级小于0的定时器
&nbsp;&nbsp;&nbsp; DL_FOREACH_SAFE(m_pUpdatesNegList, pEntry, pTmp)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (pEntry-&gt;markedForDeletion)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this-&gt;removeUpdateFromHash(pEntry);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 优先级等于0的定时器
&nbsp;&nbsp;&nbsp; DL_FOREACH_SAFE(m_pUpdates0List, pEntry, pTmp)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (pEntry-&gt;markedForDeletion)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this-&gt;removeUpdateFromHash(pEntry);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; // 优先级大于0的定时器
&nbsp;&nbsp;&nbsp; DL_FOREACH_SAFE(m_pUpdatesPosList, pEntry, pTmp)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (pEntry-&gt;markedForDeletion)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this-&gt;removeUpdateFromHash(pEntry);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; m_bUpdateHashLocked = false;

&nbsp;&nbsp;&nbsp; m_pCurrentTarget = NULL;
}</pre>

<p>
	&nbsp;
</p>