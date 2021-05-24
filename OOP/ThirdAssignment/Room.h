//
// Created by Alex_Hwang on 2020/4/3.
//

#ifndef ROOM_H
#define ROOM_H

#include<iostream>
#include<vector>
#include<string>
#include<map>

using namespace std;

extern map<string, string> mapping;

extern bool MONSTER;
extern bool PRINCESS;

class Room {
    int name;
    bool princess, monster;
    map<string, Room*> roomMap;

public:
    Room(int name): name(name) {
        setMonster(MONSTER);
        setPrincess(PRINCESS);
    };

    bool hasPrincess();
    bool hasMonster();
    bool hasExits(string dir);

    int Name();
    void setMonster(bool whether);
    void setPrincess(bool whether);
    void addRoom(Room* n, string &direction);
    Room* CreateRoom(int& name, string& direction);
    void printInfo();

    Room* getDirection(string d);
};

#endif
