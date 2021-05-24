#ifndef FUNC_H
#define FUNC_H
#include<stdio.h>
#include<unistd.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<arpa/inet.h>
#include<string.h>
#include<strings.h>
#include<ctype.h>
#include<time.h>
#include<pwd.h>
#include<stdlib.h>
#include<pthread.h>

#define TIMELENGTH 40
#define CCT (8)
#define MAXCLIENT 128

struct client {
    struct sockaddr_in addr;
    int sockid;
    int connnect;
    char ip[128];
} clients[MAXCLIENT];

void getUser(int* len, char* res);
void getTime(int* len, char* res);
void printClients();
#endif
