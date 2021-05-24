#include"Vector.h"
#define TEST 10
int main() {
    // 测试Vector
    //新建Vector
    Vector<int> test;
    Vector<int> temp(TEST);
    // 测试数组越界
    // cout << test.at(2) << endl;
    // 向其中插入元素
    for (int i = 0; i <= TEST; i++) {
        test.push_back(i);
    }
    //打印元素
    for (int i = 0; i <= TEST; i++) {
        cout << test[i] << endl;
    }
    //查看inflate是否正确
    cout << "The capacity of test: " << test.capacity() << endl;
    //查看Vector(int)是否正常
    cout << "The capacity of temp: " << temp.capacity() << endl;
    //检测empty()
    if (!test.empty())
        cout << "Correct!" << endl;
    //检测clear()
    temp.clear();
    if (temp.empty())
        cout << "Correct!" << endl;
    //检测拷贝构造函数
    Vector<int> t = test;
    cout << "The size of t is:" << t.size() << endl;
    cout << "The capacity of t is:" << t.capacity() << endl;
    //检测动态成员的拷贝是否符合要求
    test[1] = 888;
    //输出test和t
    cout << "This is test:" << endl;
    for (int i = 0; i <= TEST; i++) {
        cout << test[i] << endl;
    }
    cout << "This is t:" << endl;
    for (int i = 0; i <= TEST; i++) {
        cout << t[i] << endl;
    }

}
