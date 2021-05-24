//
// Created by Alex_Hwang on 2020/3/6.
//

#include"student.h"
#include<iostream>

using namespace std;

Student::Student(string name, int *scores) {
    this -> name =  name;
    for (int i = 0; i < COURSE_NUM; ++i) {
        this -> scores[i] = scores[i];
    }
};

string Student::getname() {
    return this -> name;
};

int Student::getscore(int i) {
    if (i >= COURSE_NUM || i < 0) {
        cout << "Invalid access to scores!" << endl;
        return -1;
    }
    return this -> scores[i];
};

double Student::getave() {
    double sum = 0;
    for (int i = 0; i < COURSE_NUM;  ++i) {
        sum += this -> scores[i];
    }
    return sum/COURSE_NUM;
};




