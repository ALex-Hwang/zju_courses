#include<iostream>
#include<fstream>

using namespace std;

int main() {
	ifstream f;
	f.open("./data.txt", ios::in);
	string a, b;
	f >> a >> b;
	cout << a << b <<endl;
}
