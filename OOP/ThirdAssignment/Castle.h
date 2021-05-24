//
// Created by Alex_Hwang on 2020/4/3.
//

#ifndef CASTLE_H
#define CASTLE_H
#include"Room.h"
#include<string>
#include<vector>
#include<iostream>

using namespace std;

extern bool PRINCESS;

class Castle {
private:
    Room *CurRoom; // the location of the current room
    int countRoom; // how many room the castle has
public:
    Castle() {
        CurRoom = new Room(0);
        CurRoom->setPrincess(PRINCESS);
        countRoom = 0;
    };

    void Run();
    Room* Move(Room* des);
    bool Check();

};


#endif //CASTLE_H
