//
// Created by Alex_Hwang on 2020/3/19.
//
#include<string>
#include<vector>

using namespace std;

class Student{

private:
    string name;
    struct Course{ // course
        string name;
        int score;
    };

    vector<Course> courses;

public:
    Student(string name);

    int getSum(); // get the sum of all the courses

    double getAve(); // compute the average scores of every course

    Course getMax(); // find the highest course

    Course getMin(); // find the lowest course

    void setCourse(string name, int score); // set the course

    void printSheet(); // print the result
};