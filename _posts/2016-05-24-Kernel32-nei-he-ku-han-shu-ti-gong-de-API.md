---
layout:     post
title:      "Kernel32--内核库函数提供的API"
date:       2016-05-24 04:26:46 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre>AddAtom 向本地原子表添加一个字符串
AllocConsole 为当前进程分配一个新控制台
AreFileApisANSI 确定一个WIN32文件函数集是否在使用ANSI或OEM字符集代码页
BackupRead 向一缓冲区读进与给定文件相关联的数据
BackupSeek 在访问数据流中向前搜索
BackupWrite 将数据传送到指定的文件或目录中
Beep 在扬声器上发出简单的声音
BeginUpdateResource 返回一个可被用来增加、删除或替换一个可执行文件资源的句柄
BuildCommDCB 用指定字符串的值来填充指定的设备控制块
BuildCommDCBAndTimeouts 将设备定义串转换成恰当的设备控制块代码
CallNamedPipe 连接一个消息类型管道，向管道中写入或从中读出，然后关闭该管道
ClearCommBreak 恢复给定通信设备的字符传输，并将传输设置成非中断状态
ClearCommError 获得有关通信错误的信息，并报告该设备的当前状态
CloseHandle 关闭一个打开的对象句柄
CloseProfileUserMapping 关闭所有与初始化文件映射有关的登记键的句柄
CommConfigDialog 显示有关通信设备的配置对话框，以允许进行配置
CompareFileTime 比较两个文件的时间
CompareStringW 比较同一地点两个字符串
ConnectNamedPipe 使管道服务进程等待客户进程与之已命名的管道实例相连接
ContinueDebugEvent 使调试程序继续先前报告的一个调试事件的线程
ConvertDefaultLocale 把缺省地点值转换成实际地点标识符
CopyFile 拷贝文件
CreateConsoleScreenBuffer 创建一个控制台屏幕缓冲区并返回其句柄
CreateDirectory 创建一个新目录
CreateDirectoryEX 创建一个含有指定模板属性的新目录
CreateEvent 创建一个事件对象
CreateFile 创建、打开或截断一个文件、管道、通信源、磁盘设备或控制台，并返回其句柄
CreateFileMapping 为指定文件创建一个映射对象，以便文件内容被共享
CreateIoComplationPort 使一个打开的实例和一个最新创建的或正存在的I/O完成端口相联系；或创建一个不和文件相联系的I/O完成端口
CreateMailslot 创建具有指定名字的邮件槽，并返回句柄
CreateMutex 创建一个互斥对象并返回句柄
CreateNamedPipe 创建一个有名管道的实例并返回句柄

CreatePipe 创建一个无名管道并返回指向该管道的读端和写端句柄
CreateProcess 创建新进程和它的主线程
CreateRemoteThread 创建运行在另一个进程地址空间上的线程
CreateSemaphore 创建一个信号对象并返回其句柄
CreateTapePartition 重新格式化磁带
CreateThread 创建一个线程以便在调用进程的地址空间内执行
DebugActiveProcess 使调试程序连接到活动进程上并调试该进程
DebugBreak 使断点异常发生在当前进程中，以便调用进程给调试程序发信号，迫使它接受某个动作
DefineDosDevice 定义、重新定义或删除DOS设备名
DeleteAtom 减少局部字符串原子引用的计数值
DeleteCriticalSection 删除由未被拥有的临界对象所使用的所有资源
DeleteFile 删除一个已有文件
DeviceIoControl 将一个控制码直接发送给指定的设备驱动程序，以执行指定的操作
DisableThreadLibraryCalls 禁止DLL_THREAD_ATTACH和DLL_THREAD_DETACH通知指定的DLL库

DisConnectNamedPipe 取消一个有名管道实例的服务器端与一客户进程的连接
DosDateTimeToFileTime 将MSDOS日期和时间值转换为一个64位文件时间
DuplicateHandle 复制一个对象句柄
EndUpdateResource 在可执行文件中终止一个资源的修改
EnterCriricalSection 等待指定临界区对象的使用权
EnumCalendarInfo EnumDateFormats 枚举指定地点有效的 长短日期格式
EnumResourceLanguages 查找模块中符合指定类型和名称的每个资源，并将资源的语言传递给一个自定义的回调函数
EnumResourceNames 查找模块中符合指定类型的资源，并将其名称传递给一个自定义的回调函数
EnumResourceTypes 查找模块中的资源，并将每个资源的类型传递给一个自定义的回调函数
EnumSystemCodePages 枚举系统已安装或支持的代码页
EnumSystemLocales 枚举系统已安装或支持的地点
EnumTimeFormats 枚举指定地点可用的时间格式
EraseTape 擦除磁带所有或部分内容
EscapeCommFunction 指示一个给定的通信设备执行一个扩展功能
ExitProcess 结束一个进程及其所有线程
ExitThread 结束一个线程
ExpandEnvironmentString 扩展环境变量字符串并以定义值替换它们
FatalAppExit 显示一个消息框，当此消息框关闭时终止此应用程序

FatalExit 将执行控制权交给调试程序
FileTimerToDosDateTime 将64位文件时间转换成MSDOS的日期和时间值
FileTimeToLocalFileTime 根据格林威治时间坐标将文件时间转换成一个局部文件时间
FileTimeToSystemTime 将64位文件时间转换成系统时间格式
FillConsoleOutputAttribute 为指定数目的字符单元设置文本和背景颜色属性
FillConsoleOutputCharacter 将一字符按指定次数多次写入屏幕缓冲区
FindAtom 在局部原子表中查找指定的字符串，并检取与该串相关的原子
FindClose 关闭指定的查找句柄
FindCloseChangeNotification 停止对通知句柄改变的监测
FindFirstChangeNotification 创建一个改变通知句柄，并设置初始化改变通知过滤条件
FindFirstFile 在目录中查找与其指定名称相匹配的一个文件
FindNextChangeNotification 请求操作系统在下次检测一个相应改变时发出一个改变通知句柄
FindNextFile 继续前一次FindFirstFile函数调用的文件查找
FindResource 在模块中查找给定类型和名称的资源位置
FindResourceEx 在模块中查找给定类型和名称的资源位置
FlushConsoleInputBuffer 刷新控制台输入缓冲区
FlushFileBuffers 清除用于指定文件的缓冲区，并将所有缓存的数据写入此文件中
FlushInstructionCache 为指定的进程刷新指令高速缓存器
FlushViewOfFile 将一个文件映射视图中的字节段写到盘上

FoldStringW 将一个通配字符的串映射为另一个字符串
FormatMessage 格式化一个消息串
FreeConsole 使调用进程从其控制台分离
FreeEnvironmentStrings 释放环境字符串块
FreeLibrary 把已装入的库模块的引用数减1
FreeLibraryAndExitThread 将已装入的DLL库调用数减1，并退出一个调用线程
FrreeTesource 释放由LoadResource函数装入的资源
GenerateConsoleCtrEvent 向和共享调用进程有关的控制台进程组发送一个特殊信号
GetACP 检取ANSI系统代码页的标识符
GetAtomName 检取与指定局部原子有关的字符串的一个拷贝
GetBinaryType 确定一个文件是否为可执行以及可执行文件的类型
GetCommandLine 返回当前进程的命令行
GetCommConfig 检取给定通信设备的当前配置
GetCommMask 检取给定通信设备的事件屏蔽值
GetCommModemStatus 检取调制解调器控制寄存器值
GetCommProperties 检取给定通信设备的通讯特性
GetCommState 用给定通信设备的当前控制设备填充一个DCB
GetCommTimeouts 检取给定通信设备上所有读、写操作的超时参数
GetCompressedFileSize 检取指定文件的压缩尺寸和磁盘的实际存贮空间，以便保存该文件

GetComputerName 检取当前计算机的名称
GetConsoleCP 检取与调用坚持有关的控制台所用输入代码页的等价内容，以便将键盘输入转换成相应的字符值
GetConsoleCursorInfo 检取指定控制台屏幕缓冲区中光标的大小和可见性
GetConsoleMode 报告控制台输入/输出缓冲区当前的输入/输出方式
GetConsoleOutputCP 检取与调用进程有关的控制台所用的输出代码页的等价内容，以便将输出函数所写入的内容转换成显示图象
GetConsoleScreenBuffreInfo 检取指定控制台屏幕缓冲区的信息
GetConsoleTitle 检取当前控制台窗口的标题栏的字符串
GetCPInfo 检取有关任意合法的已被安装或可用的代码页值
GetCurrencyFormat 把指定地点的数字串格式化为通用字符串
GetCurrentDirectory 检取当前进程的当前目录
GetCurrentProcess 检取当前进程的伪句柄
GerCurrentProcessId 检取调用进程的标识符
GetCurrentThread 检取当前进程的伪句柄
GetCurrentTreadId 检取当前调用进程的标识符
GetDateFormat 以指定地点格式把日期数值变为日期字符串
GetDefaultCommConfig 检取通信设备的缺省配置
GetDiskFreeSpace 检取通信设备的缺省配置

GetDriveType 确定磁盘驱动器是否是可移动的、固定的、CDROM、RAM磁盘或网络驱动器
GetEnvironmentStings 返回当前进程的环境块地址
GetEnvironmentVariable 从调用进程的环境块中检取指定变量的值
GetExitCodeProcess 检取指定进程的终止状态
GetExitCodeThread 检取指定进程的终止状态
GetFileAttribtes 检取指定文件的属性
GetFileInformationByHandle 检取指定文件的有关信息
GetFileSize 检取指定文件的大小
GetFileTime 检取指定文件被创建、最后一次被访问和最后一次被修改的日期和时间
GetFileType 返回指定文件的类型
GetFullPathName 检取指定文件的全路径和文件名
GetHandkeInformation 检取指定对象句柄某种属性的信息
GetLargestConsoleWindowSize 根据当前字体和显示器大小，返回最大可能的控制台窗口的大小
GetLastError 返回最近的错误代码
GetLocaleInfoW 通过查询记录来检取一事件发生地点的信息
GetLocalTime 检取当前局部时间和日期
GetLogicalDrives 返回表示当前可用磁盘驱动器的位屏蔽
GetLogicalDriveStrings 检取指定的系统的合法驱动器的字符串
GetMailslotInfo 检取给定邮件槽的信息
GetModuleFileName 检取包含指定模块的可执行文件的全路径和文件名
GetModuleHandle 返回指定模块的句柄

GetNamedPipeHandleState 检取指定有名管道的状态
GetNamedPipeInfo 检取给定有名管道的信息
GetNumberFormat 把一个数字串定制成指定地点的的数字串格式
GetNumberOfConsoleInputEvents检取控制台输入缓冲区中未读取的输入记录数
GetNumberOfConsoleMouseButtons检取当前控制台所用鼠标的按扭数
GetOEMCP 检取系统的OEM代码页标识符
GetOverlappedResult 返回在指定文件、有名管道或通信设备上的一次重叠操作的结果
GetPriorityClass 返回给定进程的优先级
GetPrivateProfileInt 检取初始化文件中与指定段某个关键字相关的整数
GetPrivateProfileSection 从给定的初始化文件中检取指定段的所有关键字和值
GetPrivateProfileSectionNames在一个初始化文件中检取所有段的名称，它是为兼容16位WINDOWS应用程序提供的
GetPrivateProfileString 从给定初始化文件的指定段中检取一字符串
GetPrivateProfileStruct 在给定的初始化文件的段中检取指定关键字数据
GetProcAddress 返回指定的输出动态链接库函数的地址
GetProcessAffinityMask 检取调用进程或系统用到的处理器数
GetProcessHeap 获取调用进程的堆句柄
GetProcessHeaps 获取调用进程所有有效堆的句柄

GetProcessShutdownParameters 检取当前调用进程的关机参数
GetProcessTimes 检取调用进程的计时信息
GetProcessVersion 获取指定进程期望运行WINDOWS版本的主、次版本号
GetProcessworkingsetSize 获取指定进程工作集的最小和最大值
GetProfileInt 从WIN.INI文件的指定段中检取指定键名的整数值
GetProfileSection 检取WIN.INI文件中指定段的所有关键字和值
GetProfileString 检取WIN.INI文件中与指定段内的指定关键字相关的字符串
GetQueuedCompletionStatus 从指定的I/O完成端口里出队一个I/O完成信息包若无完成信息包队列，则等待挂起的I/O操作完成直到能出队一个

完成信息包或限时已过才返回
GetShortPathName 检取文件的短路径名
GetStartupInfo 检取STARTUPINFO结构的内容，该结构在创建调用进程时指定
GetSteHandle 返回标准输入/输出或错误设备句柄
GetStringTypeA 返回指定字符串的字符类型信息
GetStringTypeEx 返回指定字符串的字符类型信息
GetStringTypeW 返回一个Unicode串的字符类型信息
GetSystemDefaultLangID 检取系统缺省语言标识符
GetSystemDefaultLCID 检取系统缺省地点标识符
GetSystemDirectory 检取WINDOWS系统目录SYSTEM所在路径
GetSystemInfo 返回当前系统的有关信息

GetSystenPowerStatus 返回系统电源状态以确定系统使用AC还是DC电源、电池是否正在充电以及有多少电池可用
GetSystemTime 检取当前系统的日期和时间
GetSystemTimeAdjustment 确定系统是否在每个时钟中断应用时间调整值调整一天时间
GetSystemTimeAsfileTime 检取当前系统的日期和时间
GetTapeParameters 检取描述磁带和磁带驱动器的信息
GetTapePosition 检取磁带的地址
GetTapeStatus 检取磁带设备是否准备好处理磁带命令
GetTempFileName 用指定的模式创建一个临时文件名
GetTempPath 检取为临时文件指定的目录路径
GetThreadContext 检取指定线程的描述表
GetThreadLocale 返回当前线程的当前位置
GetThreadPriority 返回给定线程的优先值

GetThreadSelectorEntry 检取指定选择符和线程的描述符表表项

 GetThreadTimes 检取当前线程的计时信息

GetTickCount 检取WINDOWS启动以来所经历的毫秒数
GetTimeFormat 把时间值格式化成指定地点的时间字符串
GetTimeZoneInfomation 检取当前的时间区参数
GetUserDefaultLangID 检取用户缺省语言标识符
GetUsetDefaultLCID 检取用户缺省地点标识符
GetVersion 返回WINDOWS的当前版本号

GetVersionEx 获取当前运行的操作系统版本的扩展信息
GetVolumeInfomation 返回有关指定的根目录文件系统的信息
GetWindowsDirectory 返回WINDOWS目录的路径
GlobalAddAtom 将一个字符串添加到全局原子表中，并返回标识此字符的值
GlobalAlloc 从堆中分配指定数目的字节
GlobalCompact 通过压缩产生全局自由内存
GlobalDeleteAtom 将全局字符串原子的引用数减一
GlobalFindAtom 在全局原子表中查找指定字符串，并检取与该字符串相关的全局原子
GlobalFix 在线形内存锁定一个全局内存对象
GlobalFlags 返回有关指定的全局内存对象信息
GlobalFree 释放指定的全局内存对象，并使其句柄无效
GlobalGetAtomName 检取与指定全局原子相关的字符串的一份拷贝
GlobalHandle 检取与指定的全局内存块指针相关的句柄
GlobalLock 加锁一个全局内存对象，并返回指向此对象内存块中第一字节的指针
GlobalMemoryStatus 检取当前可用内存信息
GlobalReAlloc 改变指定的全局内存对象的大小或属性
GlobalSize 检取指定的全局内存对象的大小
GlobalUnfix 在线形内存中解锁一个全局内存对象
GlobalUnlock 将一个以GMEM_MOVEABLE标志分配的内存对象的加锁计数值减1
GlobalUnWire 解锁一个全局内存对象
GlobalWire 加锁一个全局内存对象
HeapAlloc 从一堆中申请分配一个内存块
HeapCompact 通过压缩堆产生更大的可用内存块

HeapCreate 创建一个为调用进程私有的堆对象
HeapDestroy 撤消指定的堆对象
HeapFree 释放利用HeapAlloc或HeapReAlloc函数从堆中分配的内存块
HeapLock 获取临界对象区域或为指定的堆加锁
HeapReAlloc 重新分配堆中一个内存块
HeapSize 返回利用HeapAlloc或HeapReAlloc函数从堆中分配的内存快的大小
HeapUnlock 释放临界对象区域或一个已加锁的堆
HeapValidate 使指定的堆有效
HeapWalk 枚举在指定堆里的内存块数
hread 从指定文件中读数据
hwrite 向指定文件写数据<br></pre>