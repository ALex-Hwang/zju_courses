#include<stdio.h>
#include<stdlib.h>

int main() {
    char test[50];
    sprintf(test, "shit\t");
    sprintf(test+5, "fuck you");
    printf("%s\n", test);
}
