--version 0.2:
1. 重载了>>和<<。
2. 将编码改回utf-8，否则在Linux/mac的命令行上仍乱码。

--version 0.1：
1. main.cpp本身就是一个测试程序了，包含了fraction类的大部分的方法。
2. 有关要求中的insertor那一条，个人的理解是从指定的输入流中获取fraction。
3. 直接cmake编译的话会产生乱码问题，这里放入了使用g++直接编译的可运行程序。
4. 几个程序使用了GB2312进行编码，若出现乱码请换字库。
