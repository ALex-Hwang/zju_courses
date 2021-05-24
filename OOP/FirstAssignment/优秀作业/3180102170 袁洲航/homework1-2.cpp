#include <iostream>
#include <string>
#include <iomanip>
#include <fstream>
using namespace std;

//a class that defines a structure student
class Student {
public:
    string name;
    int score1;
    int score2;
    int score3;
};

int main()
{
    Student s[10];          //define 10 "Student" objects
    int i = 0;
    //open a file "record.txt"
    ifstream students_record("record.txt");
    if (!students_record.is_open()) {
        cout << "failed to open the file" << endl;
    }
    else {

        //get original data from standard input
        for (; i < 10; i++) {
            students_record >> s[i].name >> s[i].score1 >> s[i].score2 >> s[i].score3;
        }

        //output the first line to the standard output
        //each row occupies 8 standard widths
        cout << setw(8) << setiosflags(ios::left) << "no" << setw(8) << "name" << setw(8) << "score1" << setw(8) << "score2" << setw(8) << "score3" << setw(7) << "average" << endl;

        //define 3 array to store the average/max/min score of each course
        double ave[4] = { 0 };
        int min[4] = { 5, 5, 5, 5 };
        int max[4] = { 0 };
        i = 0;
        for (; i < 10; i++) {
            //get the average score of each student;the average/max/min score of each course
            double average = (s[i].score1 + s[i].score2 + s[i].score3) / 3.0;
            ave[1] += s[i].score1;
            ave[2] += s[i].score2;
            ave[3] += s[i].score3;
            if (s[i].score1 < min[1]) min[1] = s[i].score1;
            if (s[i].score2 < min[2]) min[2] = s[i].score2;
            if (s[i].score3 < min[3]) min[3] = s[i].score3;
            if (s[i].score1 > max[1]) max[1] = s[i].score1;
            if (s[i].score2 > max[2]) max[2] = s[i].score2;
            if (s[i].score3 > max[3]) max[3] = s[i].score3;
            //output the students records to the standard output
            cout << setw(8) << setiosflags(ios::left) << i + 1 << setw(8) << s[i].name << setw(8) << s[i].score1 << setw(8) << s[i].score2 << setw(8) << s[i].score3 << setw(7) << average << endl;
        }

        ave[1] /= 10;
        ave[2] /= 10;
        ave[3] /= 10;
        //output the average score of each course to the standard output
        cout << "        " << setw(8) << setiosflags(ios::left) << "average" << setw(8) << ave[1] << setw(8) << ave[2] << setw(8) << ave[3] << endl;
        //output the lowest score of each course to the standard output
        cout << "        " << setw(8) << setiosflags(ios::left) << "min" << setw(8) << min[1] << setw(8) << min[2] << setw(8) << min[3] << endl;
        //output the highest score of each course to the standard output
        cout << "        " << setw(8) << setiosflags(ios::left) << "max" << setw(8) << max[1] << setw(8) << max[2] << setw(8) << max[3] << endl;

    }
    system("pause");
    return 0;
}

