#include "protocol.h"
int char2int(char* store) {
    return store[0] + (store[1] << 8) + (store[2] << 16) + (store[3] << 24);
}

void int2char(char* res, int t) {
    res[0] = (t & 0xff) >> 0;
    res[1] = (t & 0xff00) >> 8;
    res[2] = (t & 0xff0000) >> 16;
    res[3] = (t & 0xff000000) >> 24;
}

void wrapper(char* res, int func, int len, int from, int to, char* data) {
    int2char(res, func);
    int2char(res+4, len);
    int2char(res+8, from);
    int2char(res+12, to);
    strcpy(res+16, data);
}

void unwrapper(char* res, int* func, int* len, int* from, int* to) {
    *func = char2int(res);
    *len = char2int(res+4);
    *from = char2int(res+8);
    *to = char2int(res+12);
}
