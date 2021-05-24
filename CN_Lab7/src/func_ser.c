#include"func_ser.h"


void getUser(int* len, char* res) { // return the login user's name
    struct passwd *pwd = getpwuid(getuid());
    strcpy(res, pwd->pw_name);
    *len = sizeof(pwd->pw_name);
    return;
}

void getTime(int* len, char* res) {
    *len = TIMELENGTH;
    time_t timep;
    struct tm *p;
    time(&timep);
    p = gmtime(&timep);
    sprintf(res, "%d-", p->tm_year+1900);
    sprintf(res+5, "%d-", p->tm_mon+1);
    sprintf(res+8, "%02d ", p->tm_mday);
    sprintf(res+11, "%02d:", (p->tm_hour+CCT)%24);
    sprintf(res+14, "%02d:", p->tm_min);
    sprintf(res+17, "%02d", p->tm_sec);
}

void printClients(int clientNum) {
    for (int i = 0; i < clientNum; i++) {
        //printf("%d\n", clients[i].sockid);
        printf("client:%s\t%d\t%d\n",
	    inet_ntop(AF_INET,&clients[i].addr.sin_addr.s_addr,clients[i].ip,sizeof(clients[i].ip)),
	    ntohs(clients[i].addr.sin_port), clients[i].sockid);
    }
}
