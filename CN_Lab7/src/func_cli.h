#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<errno.h>
#include<string.h>
#include<sys/types.h>
#include<netinet/in.h>
#include<sys/socket.h>
#include<sys/wait.h> 
#include <arpa/inet.h>
#include<pthread.h>
#define DEST_PORT 2081//目标地址端口号 
#define DEST_IP "127.0.0.1"/*目标地址IP，这里设为本机，不一定非得是127.0.0.1,只要127开头并且不是127.0.0.0和127.255.255.255即可*/ 
#define MAX_DATA 128//接收到的数据最大程度 

void getUserName(char* userName); // print the user name of the server
void printTime(char* Time); // print the time
