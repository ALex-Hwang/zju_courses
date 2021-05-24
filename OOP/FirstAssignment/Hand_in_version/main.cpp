#include"student.h"
#include<iostream>

using namespace std;

const int STU_NUM = 10;//the number of students

Student *students[STU_NUM];

void print_row(const string s, int *data);//print row(integer)
void print_row(const string s, double *data);//print row(double)

int main() {
    string name;
    int scores[COURSE_NUM];// to store the scores
    int maxs[COURSE_NUM] = {0}, mins[COURSE_NUM];
    double sum[COURSE_NUM] = {0};

    //initialize the arrays
    memset(scores, 0, COURSE_NUM* sizeof(int));
    memset(maxs, 0, COURSE_NUM* sizeof(int));
    memset(mins, 6, COURSE_NUM* sizeof(int));//for every score, it is smaller than 6
    memset(sum, 0, COURSE_NUM* sizeof(double));

    //get the input
    for (int i = 0; i < STU_NUM; ++i) {
        cin >> name;
        for (int j = 0; j < COURSE_NUM; ++j) {
            cin >> scores[j];
            if (scores[j] > 5) {
                cerr << "Score should be in the range of 0-5!" << endl;
                i--;
                continue;
            }
            sum[j] += scores[j];
            mins[j] = min(mins[j], scores[j]);
            maxs[j] = max(maxs[j], scores[j]);
        }
        students[i] = new Student(name, scores);
    }

    //output
    cout << "no\tname\tscore1\tscore2\tscore3\taverage" << endl;
    for (int i = 0; i < STU_NUM; ++i) {
        cout << i+1 <<'\t';
        cout << students[i] -> getname() << '\t';
        for(int j = 0; j < COURSE_NUM; ++j) {
            cout << students[i] -> getscore(j) << '\t';
        }
        cout << students[i] -> getave() << endl;
    }

    for (int i = 0; i < COURSE_NUM; ++i) //convert sum[] to average[]
        sum[i] /= STU_NUM;

    //print the results
    print_row("average", sum);
    print_row("min", mins);
    print_row("max", maxs);
}

void print_row(const string s, int *data) {// print a integer
    cout <<'\t' << s << '\t';
    for (int i = 0; i < COURSE_NUM; ++i) {
        cout << data[i] << '\t';
    }
    cout << endl;
}


void print_row(const string s, double *data) {// print a double
    cout <<'\t' << s << '\t';
    for (int i = 0; i < COURSE_NUM; ++i) {
        cout << data[i] << '\t';
    }
    cout << endl;
}

