//
// Created by Alex_Hwang on 2020/5/7.
//

#include "fraction.h"
#include<cmath>
int gcd(int x, int y) {  // 最大公因数
    int z = y;
    while(x%y!=0)
    {
        z = x%y;
        x = y;
        y = z;
    }
    return z;
}

istream & operator>>(istream& in, fraction& obj) {
    string temp;
    in >> temp;
    string::size_type position = temp.find('/');
    while (position == temp.npos) {
        cout << "Wrong input!" << endl;
        in >> temp;
        position = temp.find('/');
    }
    obj.set(stoi(temp.substr(0, position)), stoi(temp.substr(position + 1, temp.size())));
    return in;
}

ostream & operator<<(ostream& out, fraction& obj) {
    if (obj.numerator == 0) {
        cout << "0" << flush;
    } else {
        cout << obj.numerator << "/" << obj.denominator << flush;
    }
    return out;
}
bool fraction::operator==(const fraction &x) {
    return x.numerator * denominator == x.denominator * numerator;
}

bool fraction::operator!=(const fraction &x) {
    return !(this->operator==(x));
}

bool fraction::operator>(const fraction &x) {
    bool pos1, pos2;
    pos1 = (denominator * numerator) > 0;
    pos2 = (x.denominator * x.numerator) > 0;
    if ((pos1) && (!pos2))
        return true;
    else if ((!pos1) && (pos2))
        return false;
    else if ((!pos1) && (!pos2))
        return (abs(numerator * x.denominator) < abs(denominator * x.numerator));
    else
        return (numerator * x.denominator) > (denominator * x.numerator);
}

bool fraction::operator<=(const fraction &x) {
    return (!this->operator>(x));
}

bool fraction::operator>=(const fraction &x) {
    if (this -> operator==(x))
        return true;
    else
        return this -> operator>(x);
}
bool fraction::operator<(const fraction &x) {
    if (this -> operator==(x))
        return false;
    else
        return this -> operator<=(x);
}

fraction fraction::operator+(const fraction& x) {
    int cd = gcd(denominator, x.denominator);
    int newDeno = denominator * x.denominator / cd;
    int newNume = numerator * x.denominator / cd + x.numerator * denominator / cd;
    fraction res = fraction(newNume, newDeno);
    return res;
}

fraction fraction::operator-(const fraction &x) {
    fraction temp = x;
    temp.setNeg();
    return fraction::operator+(temp);
}

fraction fraction::operator*(const fraction &x) {
    int newDeno = denominator * x.denominator;
    int newNume = numerator * x.numerator;
    return fraction(newNume, newDeno);
}

fraction fraction::operator/(const fraction &x) {
    int newDeno = denominator * x.numerator;
    int newNume = numerator * x.denominator;
    return fraction(newNume, newDeno);
}


double fraction::to_double() {
    return double(numerator) / double(denominator);
}

string fraction::to_string() {
    return std::to_string(numerator) + '/' + std::to_string(denominator);
}


void fraction::print() {
    if (numerator == 0) {
        cout << "0" << endl;
    } else {
        cout << numerator << "/" << denominator << endl;
    }
}

void fraction::fin(std::istream& iss) {
    string temp;
    iss >> temp;
    string::size_type position = temp.find('/');
    while (position == temp.npos) {
        cout << "Wrong input!" << endl;
        iss >> temp;
        position = temp.find('/');
    }
    numerator = stoi(temp.substr(0, position));
    denominator = stoi(temp.substr(position + 1, temp.size()));
}

void fraction::set(int nume, int deno) {
    if (deno == 0)
        cerr << "The denominator cannot be zero." << endl;
    else {
        int cd = gcd(nume, deno);
        numerator = nume / cd;
        denominator = deno / cd;
        if (denominator < 0) {
            denominator = -denominator;
            numerator = -numerator;
        }
    }
}

fraction to_fraction(string &s) {
    int length = s.size();

    int pos = s.find('.');
    while (pos == s.npos) {
        cout << "Wrong Input!" << endl;
        cin >> s;
        pos = s.find('.');
    }
    string num = s.substr(0, pos) + s.substr(pos + 1, length);
    int newDeno = pow(10, length - pos - 1);
    int newNume = std::stoi(num);
    return fraction(newNume, newDeno);
}
