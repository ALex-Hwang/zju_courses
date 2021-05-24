#include<stdio.h>
#include<string.h>
#define HEADLENGTH 16
int char2int(char* store); // convert char to int
void int2char(char* res, int t); // convert int to char
void wrapper(char* res, int func, int len, int from, int to, char* data); // wrap the message
void unwrapper(char* res, int* func, int* len, int* from, int* to); // unwrap the message
