---
layout:     post
title:      "C#委托的介绍(delegate、Action、Func、predicate)"
date:       2016-06-17 03:14:56 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
       



  

 

 </p><div id="centercontent"><div id="post_detail"><div class="post"><div id="cnblogs_post_body"><!--StartFragment--><p>委托是一个类，它定义了方法的类型，使得可以将方法当作另一个方法的参数来进行传递。事件是一种特殊的委托。&lt;/p><p><strong>　　1.委托的声明&lt;/strong></p><p>　　(1). delegate</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; delegate我们常用到的一种声明&lt;/p><p>　　&nbsp;&nbsp;Delegate至少0个参数，至多32个参数，可以无返回值，也可以指定返回值类型。&lt;/p><p>　　&nbsp; 例：<span style="color: blue;">public</span> <span style="color: blue;">delegate</span> <span style="color: rgb(0, 0, 255);">int</span> MethodtDelegate(<span style="color: rgb(0, 0, 255);">int</span> x, <span style="color: rgb(0, 0, 255);">int</span> y);表示有两个参数，并返回int型。&lt;/p><p>　　(2). Action</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Action是无返回值的泛型委托。&lt;/p><p>　　 Action 表示无参，无返回值的委托</p><p>　　 Action&lt;int,string&gt; 表示有传入参数int,string无返回值的委托</p><p>&nbsp;　　Action&lt;int,string,bool&gt; 表示有传入参数int,string,bool无返回值的委托</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Action&lt;int,int,int,int&gt; 表示有传入4个int型参数，无返回值的委托</p><p>　　 Action至少0个参数，至多16个参数，无返回值。&lt;/p><p>　　 例：</p><div class="cnblogs_code"><pre>        <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">void</span> Test&lt;T&gt;(Action&lt;T&gt;<span style="color: rgb(0, 0, 0);"> action,T p)
        {
            action(p);
        }</span></pre></div><p>　&nbsp; &nbsp;(3). Func</p><p>　　 Func是有返回值的泛型委托</p><p>　　 Func&lt;int&gt; 表示无参，返回值为int的委托&lt;/p><p>　　 Func&lt;object,string,int&gt; 表示传入参数为object, string 返回值为int的委托&lt;/p><p>　　 Func&lt;object,string,int&gt; 表示传入参数为object, string 返回值为int的委托&lt;/p><p>　　 Func&lt;T1,T2,,T3,int&gt; 表示传入参数为T1,T2,,T3(泛型)返回值为int的委托&lt;/p><p>　　 Func至少0个参数，至多16个参数，根据返回值泛型返回。必须有返回值，不可void</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 例：　　　</p><div class="cnblogs_code"><pre>        <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">int</span> Test&lt;T1,T2&gt;(Func&lt;T1,T2,<span style="color: rgb(0, 0, 255);">int</span>&gt;<span style="color: rgb(0, 0, 0);">func,T1 a,T2 b)
        {
            </span><span style="color: rgb(0, 0, 255);">return</span><span style="color: rgb(0, 0, 0);"> func(a, b);
        }</span></pre></div><p>&nbsp;&nbsp; &nbsp;(4) .predicate</p><p>　　 predicate 是返回bool型的泛型委托</p><p>　　 predicate&lt;int&gt; 表示传入参数为int 返回bool的委托&lt;/p><p>　　 Predicate有且只有一个参数，返回值固定为bool</p><p>　　 例：<span style="color: blue;">public</span> <span style="color: blue;">delegate</span> <span style="color: blue;">bool</span> Predicate&lt;T&gt; (T obj)</p><p>　　</p><p>　<strong>　2.委托的使用&lt;/strong></p><p><strong>　　</strong>(1).Delegate的使用　　</p><div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div><pre>        <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">delegate</span> <span style="color: rgb(0, 0, 255);">int</span> MethodDelegate(<span style="color: rgb(0, 0, 255);">int</span> x, <span style="color: rgb(0, 0, 255);">int</span><span style="color: rgb(0, 0, 0);"> y);
        </span><span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">static</span><span style="color: rgb(0, 0, 0);"> MethodDelegate method;
        </span><span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">void</span> Main(<span style="color: rgb(0, 0, 255);">string</span><span style="color: rgb(0, 0, 0);">[] args)
        {
            method </span>= <span style="color: rgb(0, 0, 255);">new</span><span style="color: rgb(0, 0, 0);"> MethodDelegate(Add);
            Console.WriteLine(method(</span><span style="color: rgb(128, 0, 128);">10</span>,<span style="color: rgb(128, 0, 128);">20</span><span style="color: rgb(0, 0, 0);">));
            Console.ReadKey();
        }

        </span><span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">int</span> Add(<span style="color: rgb(0, 0, 255);">int</span> x, <span style="color: rgb(0, 0, 255);">int</span><span style="color: rgb(0, 0, 0);"> y)
        {
            </span><span style="color: rgb(0, 0, 255);">return</span> x +<span style="color: rgb(0, 0, 0);"> y;
        }</span></pre><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div></div><p>　　(2).Action的使用　　　</p><div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div><pre> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">void</span> Main(<span style="color: rgb(0, 0, 255);">string</span><span style="color: rgb(0, 0, 0);">[] args)
        {
            Test</span>&lt;<span style="color: rgb(0, 0, 255);">string</span>&gt;(Action,<span style="color: rgb(128, 0, 0);">"</span><span style="color: rgb(128, 0, 0);">Hello World!</span><span style="color: rgb(128, 0, 0);">"</span><span style="color: rgb(0, 0, 0);">);
            Test</span>&lt;<span style="color: rgb(0, 0, 255);">int</span>&gt;(Action, <span style="color: rgb(128, 0, 128);">1000</span><span style="color: rgb(0, 0, 0);">);
            Test</span>&lt;<span style="color: rgb(0, 0, 255);">string</span>&gt;(p =&gt; { Console.WriteLine(<span style="color: rgb(128, 0, 0);">"</span><span style="color: rgb(128, 0, 0);">{0}</span><span style="color: rgb(128, 0, 0);">"</span>, p); }, <span style="color: rgb(128, 0, 0);">"</span><span style="color: rgb(128, 0, 0);">Hello World</span><span style="color: rgb(128, 0, 0);">"</span>);<span style="color: rgb(0, 128, 0);">//</span><span style="color: rgb(0, 128, 0);">使用Lambda表达式定义委托&lt;/span>
<span style="color: rgb(0, 0, 0);">            Console.ReadKey();
        }
        </span><span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">void</span> Test&lt;T&gt;(Action&lt;T&gt;<span style="color: rgb(0, 0, 0);"> action, T p)
        {
            action(p);
        }
        </span><span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">void</span> Action(<span style="color: rgb(0, 0, 255);">string</span><span style="color: rgb(0, 0, 0);"> s)
        {
            Console.WriteLine(s);
        }
        </span><span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">void</span> Action(<span style="color: rgb(0, 0, 255);">int</span><span style="color: rgb(0, 0, 0);"> s)
        {
            Console.WriteLine(s);
        }</span></pre><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div></div><p>　　可以使用 Action&lt;T1, T2, T3, T4&gt; 委托以参数形式传递方法，而不用显式声明自定义的委托。 封装的方法必须与此委托定义的方法签名相对应。 也就是说，封装的方法必须具有四个均通过值传递给它的参数，并且不能返回值。 （在 C# 中，该方法必须返回 void）通常，这种方法用于执行某个操作。&lt;/p><p>　　(3).Func的使用&lt;/p><div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div><pre>        <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">void</span> Main(<span style="color: rgb(0, 0, 255);">string</span><span style="color: rgb(0, 0, 0);">[] args)
        {
            Console.WriteLine(Test</span>&lt;<span style="color: rgb(0, 0, 255);">int</span>,<span style="color: rgb(0, 0, 255);">int</span>&gt;(Fun,<span style="color: rgb(128, 0, 128);">100</span>,<span style="color: rgb(128, 0, 128);">200</span><span style="color: rgb(0, 0, 0);">));
            Console.ReadKey();
        }
        </span><span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">int</span> Test&lt;T1, T2&gt;(Func&lt;T1, T2, <span style="color: rgb(0, 0, 255);">int</span>&gt;<span style="color: rgb(0, 0, 0);"> func, T1 a, T2 b)
        {
            </span><span style="color: rgb(0, 0, 255);">return</span><span style="color: rgb(0, 0, 0);"> func(a, b);
        }
        </span><span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">int</span> Fun(<span style="color: rgb(0, 0, 255);">int</span> a, <span style="color: rgb(0, 0, 255);">int</span><span style="color: rgb(0, 0, 0);"> b)
        {
            </span><span style="color: rgb(0, 0, 255);">return</span> a +<span style="color: rgb(0, 0, 0);"> b;
        }</span></pre><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div></div><p>　　(4).&nbsp;predicate的使用&lt;/p><p>　　泛型委托：表示定义一组条件并确定指定对象是否符合这些条件的方法。此委托由 Array 和 List 类的几种方法使用，用于在集合中搜索元素。&lt;/p><div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div><pre>        <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">void</span> Main(<span style="color: rgb(0, 0, 255);">string</span><span style="color: rgb(0, 0, 0);">[] args)
        {
            Point[] points </span>= { <span style="color: rgb(0, 0, 255);">new</span> Point(<span style="color: rgb(128, 0, 128);">100</span>, <span style="color: rgb(128, 0, 128);">200</span><span style="color: rgb(0, 0, 0);">), 
            </span><span style="color: rgb(0, 0, 255);">new</span> Point(<span style="color: rgb(128, 0, 128);">150</span>, <span style="color: rgb(128, 0, 128);">250</span>), <span style="color: rgb(0, 0, 255);">new</span> Point(<span style="color: rgb(128, 0, 128);">250</span>, <span style="color: rgb(128, 0, 128);">375</span><span style="color: rgb(0, 0, 0);">), 
            </span><span style="color: rgb(0, 0, 255);">new</span> Point(<span style="color: rgb(128, 0, 128);">275</span>, <span style="color: rgb(128, 0, 128);">395</span>), <span style="color: rgb(0, 0, 255);">new</span> Point(<span style="color: rgb(128, 0, 128);">295</span>, <span style="color: rgb(128, 0, 128);">450</span><span style="color: rgb(0, 0, 0);">) };
            Point first </span>=<span style="color: rgb(0, 0, 0);"> Array.Find(points, ProductGT10);
            Console.WriteLine(</span><span style="color: rgb(128, 0, 0);">"</span><span style="color: rgb(128, 0, 0);">Found: X = {0}, Y = {1}</span><span style="color: rgb(128, 0, 0);">"</span><span style="color: rgb(0, 0, 0);">, first.X, first.Y);
            Console.ReadKey();
        }
        </span><span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">static</span> <span style="color: rgb(0, 0, 255);">bool</span><span style="color: rgb(0, 0, 0);"> ProductGT10(Point p)
        {
            </span><span style="color: rgb(0, 0, 255);">if</span> (p.X * p.Y &gt; <span style="color: rgb(128, 0, 128);">100000</span><span style="color: rgb(0, 0, 0);">)
            {
                </span><span style="color: rgb(0, 0, 255);">return</span> <span style="color: rgb(0, 0, 255);">true</span><span style="color: rgb(0, 0, 0);">;
            }
            </span><span style="color: rgb(0, 0, 255);">else</span><span style="color: rgb(0, 0, 0);">
            {
                </span><span style="color: rgb(0, 0, 255);">return</span> <span style="color: rgb(0, 0, 255);">false</span><span style="color: rgb(0, 0, 0);">;
            }
        }</span></pre><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div></div><p>　　使用带有 Array.Find 方法的 Predicate 委托搜索 Point 结构的数组。如果 X 和 Y 字段的乘积大于 100,000，此委托表示的方法 ProductGT10 将返回 true。Find 方法为数组的每个元素调用此委托，在符合测试条件的第一个点处停止。&lt;/p><p>　　<strong>3.委托的清空&lt;/strong></p><p>　　(1).在类中申明清空委托方法，依次循环去除委托引用。&lt;/p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 方法如下：&lt;/p><div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div><pre>  　　　 <span style="color: rgb(0, 0, 255);">public</span><span style="color: rgb(0, 0, 0);"> MethodDelegate OnDelegate;                
        </span><span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">void</span><span style="color: rgb(0, 0, 0);"> ClearDelegate()        
        {             
            </span><span style="color: rgb(0, 0, 255);">while</span> (<span style="color: rgb(0, 0, 255);">this</span>.OnDelegate != <span style="color: rgb(0, 0, 255);">null</span><span style="color: rgb(0, 0, 0);">) 
            {                 
                </span><span style="color: rgb(0, 0, 255);">this</span>.OnDelegate -= <span style="color: rgb(0, 0, 255);">this</span><span style="color: rgb(0, 0, 0);">.OnDelegate;  
            }        
        } </span></pre><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div></div><p>　　(2).如果在类中没有申明清空委托的方法，我们可以利用GetInvocationList查询出委托引用，然后进行去除。　　</p><p>　　方法如下：&lt;/p><div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div><pre>        <span style="color: rgb(0, 0, 255);">public</span><span style="color: rgb(0, 0, 0);"> MethodDelegate OnDelegate; </span><br><span style="color: rgb(0, 0, 255);">　　　　 static</span> <span style="color: rgb(0, 0, 255);">void</span> Main(<span style="color: rgb(0, 0, 255);">string</span><span style="color: rgb(0, 0, 0);">[] args)
        {
            Program test </span>= <span style="color: rgb(0, 0, 255);">new</span><span style="color: rgb(0, 0, 0);"> Program();

            </span><span style="color: rgb(0, 0, 255);">if</span> (test.OnDelegate != <span style="color: rgb(0, 0, 255);">null</span><span style="color: rgb(0, 0, 0);">) 
            { 
                System.Delegate[] dels </span>=<span style="color: rgb(0, 0, 0);"> test.OnDelegate.GetInvocationList(); 
                </span><span style="color: rgb(0, 0, 255);">for</span> (<span style="color: rgb(0, 0, 255);">int</span> i = <span style="color: rgb(128, 0, 128);">0</span>; i &lt; dels.Length; i++<span style="color: rgb(0, 0, 0);">) 
                {
                    test.OnDelegate </span>-= dels[i] <span style="color: rgb(0, 0, 255);">as</span><span style="color: rgb(0, 0, 0);"> MethodDelegate;
                }
            }
        }</span></pre><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a title="复制代码"></a></span></div></div><p><strong>　　4.委托的特点&lt;/strong></p><p>　　委托类似于 C++ 函数指针，但它们是类型安全的。&lt;br>　　委托允许将方法作为参数进行传递。&lt;br>　　委托可用于定义回调方法。&lt;br>　　委托可以链接在一起；例如，可以对一个事件调用多个方法。&lt;br>　　方法不必与委托签名完全匹配。&lt;/p><p>　　5.<strong>总结：&lt;/strong></p><p><strong>　 &nbsp; </strong>Delegate至少0个参数，至多32个参数，可以无返回值，也可以指定返回值类型&lt;/p><p>　　Func可以接受0个至16个传入参数，必须具有返回值&lt;/p><p>　　Action可以接受0个至16个传入参数，无返回值&lt;/p><p>　　Predicate只能接受一个传入参数，返回值为bool类&lt;/p><!--EndFragment--></div></div></div></div>