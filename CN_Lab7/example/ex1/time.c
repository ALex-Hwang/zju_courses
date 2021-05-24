#include<time.h>
#include<stdio.h>
#include<pwd.h>
#include<unistd.h>

int main() {
    time_t timep;
    struct tm *p;
    time(&timep);
    p = gmtime(&timep);
    printf("%d\n", p->tm_sec);
    
    struct passwd *pwd = getpwuid(getuid());
    printf("login account: %s\n", pwd->pw_name);
    return 0;
}
