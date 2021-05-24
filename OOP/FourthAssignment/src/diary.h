//
// Created by Alex_Hwang on 2020/4/24.
//

#ifndef FOURTHASSIGNMENT_DIARY_H
#define FOURTHASSIGNMENT_DIARY_H
#include<iostream>
#include<string>
#include<vector>
#include<fstream>
#include<map>

using namespace std;

class Diary {
public:
    void pdAdd();
    void reset();
    void setDate(string);
    void addOne(string);
    string getDate();
    string getContent(int);
    int getSize();

private:
    string date;
    vector<string> content;
};

void fromFile(vector<Diary>&, Diary&);
void toFile(vector<Diary>&);
#endif //FOURTHASSIGNMENT_DIARY_H
