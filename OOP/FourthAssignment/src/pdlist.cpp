//
// Created by Alex_Hwang on 2020/4/25.
//

#include"diary.h"

bool isBetween(string date, string up, string low) {
    return (date.compare(up)<=0&&date.compare(low)>=0);
}
int main(int argc, char* argv[]) {
    vector<Diary> diaries;
    Diary diary;
    string temp;
    string date;

    fromFile(diaries, diary);

    int diarySize = diaries.size();
    if (argc == 3) {// gets three arguments
        string up, low;
        low = argv[1];
        up = argv[2];

        for (int i = 0; i < diarySize; i++) {
            if (isBetween(diaries[i].getDate(), up, low)) {
                cout << diaries[i].getDate() << endl;
                for (int j = 0; j < diaries[i].getSize(); j++) {
                    cout << diaries[i].getContent(j) << endl;
                }
                cout << "." << endl;
            }
        }
    } else { // if there are no parameters
        for (int i = 0; i < diarySize; i++) {
            cout << diaries[i].getDate() << endl;
            for (int j = 0; j < diaries[i].getSize(); j++) {
                cout << diaries[i].getContent(j) << endl;
            }
            cout << "." << endl;
        }

    }
    return 0;
}