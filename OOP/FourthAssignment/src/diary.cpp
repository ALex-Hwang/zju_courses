//
// Created by Alex_Hwang on 2020/4/24.
//

#include "diary.h"

void Diary::pdAdd() {
    string temp;
    getline(cin, temp);
    while (temp != ".") {
        content.push_back(temp);
        getline(cin, temp);
    }
}

void Diary::reset() {
    content.clear();
}

void Diary::addOne(string line) {
    content.push_back(line);
}

void Diary::setDate(string Date) {
    date = Date;
}

string Diary::getDate() {
    return date;
}

string Diary::getContent(int i) {
    return content[i];
}

int Diary::getSize() {
    return content.size();
}

void fromFile(vector<Diary> &diaries, Diary &diary) {
    string temp;
    string date;
    int count = 1;
    ifstream infile("diary.txt", ios::in);// you need to change the directory if it does not work
    // read in the diaries already in the file
    while(!infile.eof()) {
        if (count) {
            getline(infile, date);
            diary.setDate(date);
            diary.reset();
            count = 0;
        } else {
            getline(infile, temp);
            if (temp == ".") {
                diaries.push_back(diary);
                count = 1;
            } else {
                diary.addOne(temp);
            }
        }
    }
    infile.close();

}

void toFile(vector<Diary> &diaries) {
    int diarySize = diaries.size();
    ofstream outfile("diary.txt", ios::out);// also change here
    for (int i = 0; i < diarySize; i++) {
        outfile << diaries[i].getDate() << endl;
        cout << diaries[i].getDate() << endl;
        for (int j = 0; j < diaries[i].getSize(); j++) {
            outfile << diaries[i].getContent(j) << endl;
            cout << diaries[i].getContent(j) << endl;
        }
        outfile << "." << endl;
    }
    outfile.close();
}
