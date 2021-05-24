//
// Created by Alex_Hwang on 2020/4/25.
//

#include"diary.h"

int main(int argc, char* argv[]) {
    vector<Diary> diaries;
    Diary diary;
    string temp;
    string date;

    fromFile(diaries, diary);

    date = argv[1];
    int diarySize = diaries.size();
    int index = 0;
    for (; index < diarySize; index++) {
        if (date == diaries[index].getDate())
            break;
    }

    if (index == diarySize) {
        cout << "There does not exist a diary with the date " << date << "." << endl;
    } else {
        cout << diaries[index].getDate() << endl;
        for (int i = 0; i < diaries[index].getSize(); i++) {
            cout << diaries[index].getContent(i) << endl;
        }
        cout << "." << endl;
        return 0;
    }

}