#include"diary.h"

int main(int argc, char *argv[]) {
    vector<Diary> diaries;
    Diary diary;
    string date;
    string temp;
    fromFile(diaries, diary);


    vector<string>::size_type index= 0;
    vector<string>::size_type diarySize = diaries.size();

    // then get the content from the terminal
    date = argv[1];
    diary.setDate(date);
    diary.reset();
    getline(cin, temp);
    while (temp != ".") {
        diary.addOne(temp);
        getline(cin, temp);
    }

    // we need to check if there exist diaries with identical date
    for (; index < diarySize; index++)
        if (date == diaries[index].getDate()) break;

    if (index == diarySize) { // if no identical
        diaries.push_back(diary);
    } else {
        diaries[index] = diary;
    }
    // store the data
    toFile(diaries);
    return 0;
}
