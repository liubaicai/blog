---
layout:     post
title:      "使用C#读写ini配置文件"
date:       2013-07-04 14:58:06 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

INI就是扩展名为”INI”的文件,其实他本身是个文本文件,可以用记事本打工,主要存放的是用户所做的选择或系统的各种参数.<br />
INI文件其实并不是普通的文本文件.它有自己的结构.由若干段落(SECTION)组成,在每个带括号的标题下面,是若干个以单个单词开头的关键字(KEYWORD)和一个等号,等号右边就是关键字的值(VALUE).例如:<br />
[Section1]<br />
KeyWord1 = Value1<br />
KeyWord2 = Value2<br />
…&lt;br />
[Section2]<br />
KeyWord3 = Value3<br />
KeyWord4 = Value4
<p>
	C#命名空间中没有直接读写INI的类,当然如果你把INT当成文本文件用System.IO类来读写算我没说.<br />
我现在介绍的是系统处理INI的方法.<br />
虽然C#中没有,但是在”kernel32.dll”这个文件中有Win32的API函数–WritePrivateProfileString()和GetPrivateProfileString()<br />
C#声明INI文件的写操作函数WritePrivateProfileString():
</p>
<p>
	<span style="color:#FF0000;">[DllImport( "kernel32"&nbsp; )]</span><br />
<span style="color:#FF0000;">private static extern long&nbsp; WritePrivateProfileString ( string section ,string key , string&nbsp; val</span><br />
<span style="color:#FF0000;">, string filePath )&nbsp; ;</span> 
</p>
<p>
	参数说明：section：INI文件中的段落；key：INI文件中的关键字；val：INI文件中关键字的数值；filePath：INI文件的完整的路径和名称。&lt;br />
C＃申明INI文件的读操作函数GetPrivateProfileString():
</p>
<p>
	<span style="color:#FF0000;">[DllImport("kernel32")]</span><br />
<span style="color:#FF0000;">private static extern int GetPrivateProfileString&nbsp; ( string section ,</span><br />
<span style="color:#FF0000;">string key ,&nbsp; string def , StringBuilder retVal ,</span><br />
<span style="color:#FF0000;">int&nbsp; size , string filePath ) ;</span> 
</p>
<p>
	参数说明：section：INI文件中的段落名称；key：INI文件中的关键字；def：无法读取时候时候的缺省数值；retVal：读取数值；size：数值的大小；filePath：INI文件的完整路径和名称。
</p>
<p>
	下面是一个读写INI文件的类:
</p>
<pre class="prettyprint lang-cs">public class INIClass
    {
        public string inipath;
        [DllImport("kernel32")]
        private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);
        [DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key, string def, StringBuilder retVal, int size, string filePath);
        /// &lt;summary&gt;
        /// 构造方法
        /// &lt;/summary&gt;
        /// &lt;param name="INIPath"&gt;文件路径&lt;/param&gt;
        public INIClass(string INIPath)
        {
            inipath = INIPath;
        }
        /// &lt;summary&gt;
        /// 写入INI文件
        /// &lt;/summary&gt;
        /// &lt;param name="Section"&gt;项目名称(如 [TypeName] )&lt;/param&gt;
        /// &lt;param name="Key"&gt;键&amp;lt;/param&gt;
        /// &lt;param name="Value"&gt;值&amp;lt;/param&gt;
        public void IniWriteValue(string Section, string Key, string Value)
        {
            WritePrivateProfileString(Section, Key, Value, this.inipath);
        }
        /// &lt;summary&gt;
        /// 读出INI文件
        /// &lt;/summary&gt;
        /// &lt;param name="Section"&gt;项目名称(如 [TypeName] )&lt;/param&gt;
        /// &lt;param name="Key"&gt;键&amp;lt;/param&gt;
        public string IniReadValue(string Section, string Key)
        {
            StringBuilder temp = new StringBuilder(500);
            int i = GetPrivateProfileString(Section, Key, "", temp, 500, this.inipath);
            return temp.ToString();
        }
        /// &lt;summary&gt;
        /// 验证文件是否存在
        /// &lt;/summary&gt;
        /// &lt;returns&gt;布尔值&amp;lt;/returns&gt;
        public bool ExistINIFile()
        {
            return File.Exists(inipath);
        }
    }
</pre>
<p>
	&nbsp;
</p>