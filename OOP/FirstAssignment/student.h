#include<string>

using namespace std;

const int COURSE_NUM = 3;

class Student {
private:
	string name;
	int scores[COURSE_NUM];

public:
	Student(string name, int *scores);
	
	string getname();//get name
	int getscore(int i);//get the i th score
	double getave();//calculate the average score
};
