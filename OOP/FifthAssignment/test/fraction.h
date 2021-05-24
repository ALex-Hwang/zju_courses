//
// Created by Alex_Hwang on 2020/5/7.
//
#include<iostream>
#include<string>
#include<algorithm>

using namespace std;
#ifndef FIFTHASSIGNMENT_FRACTION_H
#define FIFTHASSIGNMENT_FRACTION_H

int gcd(int, int);

class fraction {
    friend istream& operator>>(istream& in, fraction&);
    friend ostream& operator<<(ostream& out, fraction&);
private:
    int denominator;  // 分母
    int numerator;  // 分子

public:
    fraction() = default; // 默认构造函数
    fraction(int nume, int deno){ // 接收双int的构造函数
        if (deno == 0)
            cerr << "The denominator cannot be zero." << endl;
        else {
            int cd = gcd(nume, deno);
            numerator = nume / cd;
            denominator = deno / cd;
            if (denominator < 0) { // 去掉分母上的括号
                denominator = -denominator;
                numerator = -numerator;
            }
        }
    };
    fraction(const fraction& x) { // 拷贝构造函数
        denominator = x.denominator;
        numerator = x.numerator;
    }

    void setNeg() { // 将分数取反
        denominator = -denominator;
    }

    // 重载运算符
    bool operator==(const fraction& x);
    bool operator!=(const fraction& x);
    bool operator>(const fraction& x);
    bool operator<=(const fraction& x);
    bool operator<(const fraction& x);
    bool operator>=(const fraction& x);
    fraction operator+(const fraction& x);
    fraction operator-(const fraction& x);
    fraction operator*(const fraction& x);
    fraction operator/(const fraction& x);

    double to_double(); // 转换为双精度浮点
    string to_string(); // 转换为string
    void print(); // 打印分数
    void fin(std::istream&); // 从指定流中提取分数
    void set(int, int); // 设定分子和分母


};

fraction to_fraction(string&);
#endif //FIFTHASSIGNMENT_FRACTION_H
