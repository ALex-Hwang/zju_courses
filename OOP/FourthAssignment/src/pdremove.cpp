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
    // look for the diary you want to delete
    date = argv[1];
    int diarySize = diaries.size();
    int index = 0;
    for (; index < diarySize; index++) {
        if (date == diaries[index].getDate())
            break;
    }
    if (index == diarySize) { // do not find it
        cerr << "There is no diary with the date" << date << "." << endl;
    } else { // if we do find it
        for (int i = index; i < diarySize; i++) {
            diaries[index] = diaries[index+1];
        }
        diaries.pop_back();
    }

    // now we write it back to the file
    toFile(diaries);
    return 0;
}

