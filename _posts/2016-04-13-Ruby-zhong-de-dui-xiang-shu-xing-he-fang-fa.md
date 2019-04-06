---
layout:     post
title:      "Ruby中的对象，属性和方法"
date:       2016-04-13 10:47:21 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

在Ruby中，除去内部类的对象以外，通常对象的构造都是动态确定的。某对象的性质由其内部定义的方法所决定。
看下面的例子，我们使用new方法构造一个新的对象，
<pre class="lang:ruby decode:true">class Person
def initialize(name, gender, age)
 @name = name
 @gender = gender
@age = age
end
end
 people = Person.new(‘Tom’, ‘male’, 15)</pre>
我们可以使用Person.new方法来创建一个Person类的实例对象。以@打头的变量是实例变量，他们从属于某一实例对象，Ruby中实例变量的命名规则是变量名以@开始，您只能在方法内部使用它。
initialize方法使对象变为“就绪”状态，initialize方法是一个特殊的方法，这个方法在构造实例对象时会被自动调用。
对实例进行初始化操作时，需要重定义initialize方法。类方法new的默认的行为就是对新生成的实例执行initialize方法，传给new方法的参数会被原封不动地传给initialize方法。另外，若带块调用时，该块会被传给initialize方法。因此，不必对new方法进行重定义。
在Ruby中，只有方法可以操作实例变量，因此可以说Ruby中的封装是强制性的。在对象外部不可以直接访问，只能通过接口方法访问。
<pre class="lang:ruby decode:true">class Person
  def name
   @name
  end

  def gender
   @gender
  end

  def age
   @age
  end
end

people = Person.new(‘Tom’, ‘male’, 15)
puts people.name
puts people.gender
puts people.age
</pre>
输出结果为：
Tom
male
15

在Ruby中，一个对象的内部属性都是私有的。 上面的代码中，我们定义了方法name，gender，age三个方法用来访问Person类实例对象的实例变量。注意name，gender，age访问只能读取相应实例变量，而不能改变它们的值。

我们也可以用成员变量只读控制符attr_reader来达到同样的效果。
class Person
attr_reader :name, :gender, :age
end

类似地，我们可以定义方法去改变成员变量的值。
<pre class="lang:ruby decode:true">class Person
  def name=(name)
   @name=name
  end

  def gender=(gender)
   @gender=gender
  end

  def age=(age)
   @age=age
  end
end
people = Person.new(‘Tom’, ‘male’, 15)
people.name = “Henry”
people.gender = “male”
people.age  = 25</pre>
也可以用成员变量写控制符attr_writer来达到同样的效果。
<pre class="lang:ruby decode:true">class Person
  attr_writer :name, :gender, :age
end</pre>
我们也可以使用attr_accessor来说明成员变量既可以读，也可以写。
<pre class="lang:ruby decode:true">class Person
  attr_accessor :name, :gender, :age
end</pre>
也可以使用attr控制符来控制变量是否可读写。attr 只能带一个符号参数， 第二个参数是一个 bool 参数，用于指示是否为符号参数产生写方法。它的默认值是 false，只产生读方法，不产生写方法。
<pre class="lang:ruby decode:true">class Person
  attr :name, true  #读写
  attr :gender, true #读写
  attr :age, true  #读写
  attr :id, false      #只读
end</pre>
注意attr_reader，attr_writer，attr_accessor和attr不是语言的关键字，而是Module模块的方法。
<pre class="lang:ruby decode:true">class Test
  attr_accessor :value
end
puts Test.instance_methods – Test.superclass.public_methods</pre>
&nbsp;

执行结果为：
value
value=

上面代码中，我们使用Test.instance_methods得到Test类所有的实例方法，使用Test.superclass.public_methods得到Test父类所有的实例方法，然后相减就得到Test类不包含父类的所有的实例方法。
由于instance_methods方法返回值为一个Array，所以我们作差值运算。

也可以重定义方法，重定义一个方法时，新的定义会覆盖原有的定义。

下面的例子重定义类中的方法meth1，
<pre class="lang:ruby decode:true">class Test
  def meth1
   puts “This is meth1″
  end
end

a = Test.new
a.meth1

class Test
  def meth1
   puts “This is new meth1″
  end
end

a. meth1</pre>
执行结果为：
This is meth1
This is new meth1

重定义同一个类时，意味着对原有定义进行补充，不会覆盖原来的定义。而重定义方法时，则会覆盖原有定义。

我们可以使用self标识本身，self和Java中的this有些类似，代表当前对象。
<pre class="lang:ruby decode:true">class Person
def initialize(name, gender, age)
 @name = name
 @gender = gender
@age = age
end

def (other)
 self.age other.age
end
end</pre>
方法通常意思为比较，返回值为-1，0或1分别表示小于，等于和大于。