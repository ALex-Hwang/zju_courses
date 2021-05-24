//
// Created by Alex_Hwang on 2020/4/3.
//

#include "Castle.h"
//#include"Room.h"
#include<string>
#include<iostream>

using namespace std;

// move to the destination
Room* Castle::Move(Room *des) {
    CurRoom = des;
    return des;
}

//check whether you bring the princess to the lobby
bool Castle::Check() {
    return ((CurRoom->Name() == 0) & (PRINCESS));
}

// run the game
void Castle::Run() {
    string temp, dir;
    for (;;) {
        if (Check()) {
            cout << "Congrats! You saved the princess!" << endl;
            break;
        }
        if (CurRoom->hasPrincess())
            PRINCESS = true;
        CurRoom->printInfo();
        cin  >> temp >> dir;
        if (!CurRoom->hasExits(dir)) { // if the direction does not exist
            Move(CurRoom->CreateRoom(++countRoom, dir));
        } else
            Move(CurRoom->getDirection(dir));
        if (CurRoom->hasMonster()) {
            cout << "Oops, you got killed by the monster!" << endl;
            break;
        }
    }
}

