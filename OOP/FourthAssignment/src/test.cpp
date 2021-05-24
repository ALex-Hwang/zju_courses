#include"diary.h"

int main() {
    ifstream infile("dairy.txt");
    string temp;
    while (getline(infile, temp, '.'))
        cout << temp << endl;
}

