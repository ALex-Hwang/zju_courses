#include "student.h"
#include<iostream>
#include<vector>
#include<string>
#include<fstream>

using namespace std;

vector<Student> stu_vec; // the vector to store the students

void getMsg(); // get the input from the cmd
void getMsg_f(); // get the input from the file

int main() {
    cout << "Welcome to my CLI system. Enter 1 to read in the cmd, 2 to read the text and other to quit." << endl;
    int choose;

    cin >> choose;

    if (choose == 1) {
        getMsg();
    } else if (choose == 2){
        getMsg_f();
    } else {
        cout << "Bye!" << endl;
    }

    // print the result
    for (int i = 0; i < stu_vec.size(); ++i) {
        stu_vec[i].printSheet();
    }
}

// in command line
void getMsg() {
    Student *stu_ptr = NULL;
    string name;
    int score;

    for(;;) {
        cout << "Please input the name. Enter quit to quit." << endl;
        cin >> name;
        if (name == "quit")
            break;
        stu_ptr = new Student(name);

        cout << "Please enter the course and its score. Enter -1 -1 to quit!" << endl;
        cin >> name;
        cin >> score;
        while(name != "-1") {
            stu_ptr -> setCourse(name, score);
            cin >> name ;
            cin >> score;
        }
        stu_vec.push_back(*stu_ptr);

    }

}

// from the file
void getMsg_f() {
    ifstream f;

    f.open("./data.txt", ios::in);
    if (!f.is_open())
        cout << "The \'data.txt\' is damaged" << endl;
    else {
        Student *stu_ptr = NULL;
        string name;
        int score;

        for(;;) {
            f >> name;
            if (name == "quit")
                break;
            stu_ptr = new Student(name);

            f >> name;
            f >> score;
            while(name != "-1") {
                stu_ptr -> setCourse(name, score);
                f >> name ;
                f >> score;
            }
            stu_vec.push_back(*stu_ptr);
        }
        f.close();
    }
}
