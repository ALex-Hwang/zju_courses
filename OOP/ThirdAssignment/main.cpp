#include <iostream>
#include<map>
#include"Castle.h"


bool MONSTER = false;
bool PRINCESS = false;

map<string, string> mapping = {{"east", "west"}, {"west", "east"}, {"up", "down"}, {"down", "up"}}; // used to convert the direction

int main() {

    Castle *cas;
    cas = new Castle(); // create a castle
    cas->Run(); // run the game
    return 0;
}
