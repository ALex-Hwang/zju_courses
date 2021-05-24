#include "fraction.h"

using namespace std;

int main() {
    fraction a, b;
    cout << "请输入两个分数：" << endl;
    cin >> a;
    cin >> b;
    cout << "您输入的分数分别为：" << endl;
    cout << a << endl;
    cout << b << endl;

    cout << "两数的加减乘除：" << endl;
    cout << a << " + " << b << " = " << (a+b).to_string() << endl;
    cout << a << " - " << b << " = " << (a-b).to_string() << endl;
    cout << a << " * " << b << " = " << (a*b).to_string() << endl;
    cout << a << " / " << b << " = " << (a/b).to_string() << endl;

    cout << "两数比大小：" << endl;
    if (a > b)
        cout << a << " > " << b << endl;
    if (a < b)
        cout << a << " < " << b << endl;
    if (a <= b)
        cout << a << " <= " << b << endl;
    if (a >= b)
        cout << a << " >= " << b << endl;
    if (a == b)
        cout << a << " == " << b << endl;
    if (a != b)
        cout << a << " != " << b << endl;

    cout << "输出分数的双精度浮点：" << endl;
    cout << a << " = " << a.to_double() << endl;
    cout << b << " = " << b.to_double() << endl;

    cout << "请输入一个有限小数，本程序将其转换为分数：" << endl;
    string temp;
    cin >> temp;
    a = to_fraction(temp);
    cout << "你输入的数为" << temp << " = " << a.to_string() << endl;
}
