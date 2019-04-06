---
layout:     post
title:      "MVVM里Command绑定中获取事件参数EventArgs"
date:       2014-09-03 10:50:37 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">通过扩展interactivity的InvokeCommandAction来实现事件参数传递。&lt;/span>
</p>

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">先来看普通的InvokeCommandAction方式</span>
</p>

<pre class="brush:xml;">
&lt;Window x:Class="EventArgsInViewModel.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
		xmlns:i="http://schemas.microsoft.com/expression/2010/interactivity"
		xmlns:loc="clr-namespace:EventArgsInViewModel"
        Title="MainWindow" Height="350" Width="525"&gt;
	&lt;Window.DataContext&gt;
		&lt;loc:MainWindowViewModel /&gt;
	&lt;/Window.DataContext&gt;
    &lt;Grid&gt;
		&lt;Button Content="Button" Height="38" HorizontalAlignment="Left" Margin="50,52,0,0" Name="button1" VerticalAlignment="Top" Width="138"&gt;
			&lt;i:Interaction.Triggers&gt;
				&lt;i:EventTrigger EventName="Click"&gt;
					&lt;i:InvokeCommandAction 
						Command="{Binding ClickCommand}" CommandParameter="{Binding ElementName=button1}" /&gt;
				&lt;/i:EventTrigger&gt;
			&lt;/i:Interaction.Triggers&gt;
		&lt;/Button&gt;
	&lt;/Grid&gt;
&lt;/Window&gt;
</pre>

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">现在为了扩展CommandParameter，定义ExCommandParameter类&lt;/span>
</p>

<pre class="brush:csharp;">
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;

namespace EventArgsInViewModel {
	/// &lt;summary&gt;
	/// 扩展CommandParameter，使CommandParameter可以带事件参数
	/// &lt;/summary&gt;
	public class ExCommandParameter {
		/// &lt;summary&gt;
		/// 事件触发源
		/// &lt;/summary&gt;
		public DependencyObject Sender { get; set; }
		/// &lt;summary&gt;
		/// 事件参数
		/// &lt;/summary&gt;
		public EventArgs EventArgs { get; set; }
		/// &lt;summary&gt;
		/// 额外参数
		/// &lt;/summary&gt;
		public object Parameter { get; set; }
	}
}
</pre>

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">然后定义ExInvokeCommandAction类，用于扩展InvokeCommandAction</span>
</p>

<pre class="brush:csharp;">
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Interactivity;
using System.Windows.Input;
using System.Reflection;

namespace EventArgsInViewModel {
	/// &lt;summary&gt;
	/// 扩展的InvokeCommandAction
	/// &lt;/summary&gt;
	public class ExInvokeCommandAction : TriggerAction&lt;DependencyObject&gt; {

		private string commandName;
		public static readonly DependencyProperty CommandProperty = DependencyProperty.Register("Command", typeof(ICommand), typeof(ExInvokeCommandAction), null);
		public static readonly DependencyProperty CommandParameterProperty = DependencyProperty.Register("CommandParameter", typeof(object), typeof(ExInvokeCommandAction), null);
		/// &lt;summary&gt;
		/// 获得或设置此操作应调用的命令的名称。
		/// &lt;/summary&gt;
		/// &lt;value&gt;此操作应调用的命令的名称。&amp;lt;/value&gt;
		/// &lt;remarks&gt;如果设置了此属性和 Command 属性，则此属性将被后者所取代。&amp;lt;/remarks&gt;
		public string CommandName {
			get {
				base.ReadPreamble();
				return this.commandName;
			}
			set {
				if (this.CommandName != value) {
					base.WritePreamble();
					this.commandName = value;
					base.WritePostscript();
				}
			}
		}
		/// &lt;summary&gt;
		/// 获取或设置此操作应调用的命令。这是依赖属性。
		/// &lt;/summary&gt;
		/// &lt;value&gt;要执行的命令。&amp;lt;/value&gt;
		/// &lt;remarks&gt;如果设置了此属性和 CommandName 属性，则此属性将优先于后者。&amp;lt;/remarks&gt;
		public ICommand Command {
			get {
				return (ICommand)base.GetValue(ExInvokeCommandAction.CommandProperty);
			}
			set {
				base.SetValue(ExInvokeCommandAction.CommandProperty, value);
			}
		}
		/// &lt;summary&gt;
		/// 获得或设置命令参数。这是依赖属性。
		/// &lt;/summary&gt;
		/// &lt;value&gt;命令参数。&amp;lt;/value&gt;
		/// &lt;remarks&gt;这是传递给 ICommand.CanExecute 和 ICommand.Execute 的值。&amp;lt;/remarks&gt;
		public object CommandParameter {
			get {
				return base.GetValue(ExInvokeCommandAction.CommandParameterProperty);
			}
			set {
				base.SetValue(ExInvokeCommandAction.CommandParameterProperty, value);
			}
		}
		/// &lt;summary&gt;
		/// 调用操作。
		/// &lt;/summary&gt;
		/// &lt;param name="parameter"&gt;操作的参数。如果操作不需要参数，则可以将参数设置为空引用。&amp;lt;/param&gt;
		protected override void Invoke(object parameter) {
			if (base.AssociatedObject != null) {
				ICommand command = this.ResolveCommand();

				/*
				 * ★★★★★★★★★★★★★★★★★★★★★★★★
				 * 注意这里添加了事件触发源和事件参数
				 * ★★★★★★★★★★★★★★★★★★★★★★★★
				 */
				ExCommandParameter exParameter = new ExCommandParameter {
					Sender=base.AssociatedObject,
					Parameter = GetValue(CommandParameterProperty),
					EventArgs=parameter as EventArgs

				};
				
				if (command != null &amp;&amp; command.CanExecute(exParameter)) {
					/*
					 * ★★★★★★★★★★★★★★★★★★★★★★★★
					 * 注意将扩展的参数传递到Execute方法中
					 * ★★★★★★★★★★★★★★★★★★★★★★★★
					 */
					command.Execute(exParameter);
				}
			}
		}
		private ICommand ResolveCommand() {
			ICommand result = null;
			if (this.Command != null) {
				result = this.Command;
			} else {
				if (base.AssociatedObject != null) {
					Type type = base.AssociatedObject.GetType();
					PropertyInfo[] properties = type.GetProperties(BindingFlags.Instance | BindingFlags.Public);
					PropertyInfo[] array = properties;
					for (int i = 0; i &lt; array.Length; i++) {
						PropertyInfo propertyInfo = array[i];
						if (typeof(ICommand).IsAssignableFrom(propertyInfo.PropertyType) &amp;&amp; string.Equals(propertyInfo.Name, this.CommandName, StringComparison.Ordinal)) {
							result = (ICommand)propertyInfo.GetValue(base.AssociatedObject, null);
						}
					}
				}
			}
			return result;
		}

	}
}
</pre>

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">好了，我们把xaml改一下，现在改用我们自己创建的ExInvokeCommandAction</span>
</p>

<pre class="brush:csharp;">
&lt;Window x:Class="EventArgsInViewModel.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
		xmlns:i="http://schemas.microsoft.com/expression/2010/interactivity"
		xmlns:loc="clr-namespace:EventArgsInViewModel"
        Title="MainWindow" Height="350" Width="525"&gt;
	&lt;Window.DataContext&gt;
		&lt;loc:MainWindowViewModel /&gt;
	&lt;/Window.DataContext&gt;
    &lt;Grid&gt;
		&lt;Button Content="Button" Height="38" HorizontalAlignment="Left" Margin="50,52,0,0" Name="button1" VerticalAlignment="Top" Width="138"&gt;
			&lt;i:Interaction.Triggers&gt;
				&lt;i:EventTrigger EventName="Click"&gt;
					&lt;!--★★★扩展的InvokeCommandAction★★★--&gt;
					&lt;loc:ExInvokeCommandAction 
						Command="{Binding ClickCommand}" CommandParameter="{Binding ElementName=button1}" /&gt;
				&lt;/i:EventTrigger&gt;
			&lt;/i:Interaction.Triggers&gt;
		&lt;/Button&gt;
	&lt;/Grid&gt;
&lt;/Window&gt;
</pre>

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">ViewModel代码</span>
</p>

<pre class="brush:csharp;">
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using System.Windows;

namespace EventArgsInViewModel {
	public class MainWindowViewModel {
		public ICommand ClickCommand {
			get {
				return new DelegateCommand&lt;ExCommandParameter&gt;((p) =&gt; {
					RoutedEventArgs args = p.EventArgs as RoutedEventArgs;
					MessageBox.Show(args.ToString());
				},
				(p) =&gt; {
					return true;
				}
				);
			}
		}
	}
}
</pre>

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">现在点击一下按钮，显示了对应的消息框，OK，参数也能得到。&lt;/span>
</p>

<p>
	<span style="font-family: Arial; font-size: 14px; line-height: 26px;">转自@林老师的专栏&lt;/span><a href="http://blog.csdn.net/qing2005" style="color: rgb(255, 255, 255); text-decoration: none;">林老师的专栏&lt;/a><a href="http://blog.csdn.net/qing2005" style="color: rgb(255, 255, 255); text-decoration: none;">林老师的专栏&lt;/a>
</p>