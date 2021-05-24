//
// Created by Alex_Hwang on 2020/3/19.
//

#include "student.h"
#include<string>
#include<iostream>

Student::Student(string name): name(name) {

}

void Student::setCourse(string name, int score) {
    // check the validation of the input
    while (score < 0 || score > 100) {
        cout << "Wrong Input! Please enter again!" << endl;
        cin >> name ;
        cin >> score;
    }
    Course temp;
    temp.name = name;
    temp.score = score;
    courses.push_back(temp);
}

int Student::getSum() {
    int result = 0;
    for (auto a: courses) {
        result += a.score;
    }
    return result;
}

double Student::getAve() {
    double result = 0;
    for (auto a: courses) {
        result += a.score;
    }
    result /= courses.size();
    return result;
}

void Student::printSheet() {
    cout << "Name: " << name << endl;

    cout << "Course:\t";
    for (int i = 0; i < courses.size(); ++i) {
        cout << courses[i].name << '\t';
    }
    cout << endl;

    cout << "Score:\t";
    for (int i = 0; i < courses.size(); ++i) {
        cout << courses[i].score << '\t';
    }
    cout << endl;

    cout << "Sum:\t" << getSum() << endl;
    cout << "Ave:\t" << getAve() << endl;
    cout << "Max:\t" << getMax().name << "\t" << getMax().score << endl;
    cout << "Min:\t" << getMin().name << "\t" << getMin().score << endl;
    cout << "--------------------------------" << endl;
}

Student::Course Student::getMax() {
    Course max_c = courses[0];
    // find the max
    for (int i = 0; i < courses.size(); ++i) {
        if (courses[i].score > max_c.score)
            max_c = courses[i];
    }
    return max_c;
}

Student::Course Student::getMin() {
    Course min_c = courses[0];
    // find the min
    for (int i = 0; i < courses.size(); ++i) {
        if (courses[i].score < min_c.score)
            min_c = courses[i];
    }
    return min_c;
}
