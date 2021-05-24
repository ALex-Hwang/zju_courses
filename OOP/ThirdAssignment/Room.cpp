//
// Created by Alex_Hwang on 2020/4/3.
//

#include"Room.h"
#include<iostream>
#include<map>

using namespace std;

// get the name of a room
int Room::Name() {
    return name;
}

// set the monster, 1 in 5 chance of meeting one
void Room::setMonster(bool whether) {
    monster = (!whether) && ((rand()%5 == 4));
}

// set the princess, 1 in 5 chance of meeting her
void Room::setPrincess(bool whether) {
    princess = (!whether) && ((rand()%5 == 4));
    if (princess)
        cout << "You got the princess here! Go take her to the room 0!" << endl;
}

// update the exits
void Room::addRoom(Room* n, string &d){
    roomMap.insert(make_pair(d, n));
}

// return whether the room has a monster
bool Room::hasMonster() {
    return monster;
}

// return whether the room has a princess
bool Room::hasPrincess() {
    return princess;
}

// return whether the room has any exits
bool Room::hasExits(string dir) {
    return roomMap[dir];
}

// create a new room if there does not exist one
Room* Room::CreateRoom(int& n, string& dir) {
    Room* newRoom;
    newRoom = new Room(n);

    newRoom->addRoom(this, mapping[dir]);
    //addRoom(newRoom, direction);
    roomMap[dir] = newRoom;
    return newRoom;
}

// print the info of a room
void Room::printInfo() {
    if (name == 0)
        cout << "Welcome to the lobby. There are 3 exits: east, west and up. \nEnter your command: ";
    else {
        if (hasExits("down"))
            cout << "Welcome to the " << name << ". There are 3 exits: east, west and down. \nEnter your command: ";
        else
            cout << "Welcome to the " << name << ". There are 3 exits: east, west and up. \nEnter your command: ";
    }
}

// get the address of an exit
Room* Room::getDirection(string d) {
    return roomMap[d];
}
