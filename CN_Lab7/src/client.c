#include "func_cli.h"
#include "protocol.h"
void *receive();
 
int menu() {
    int select;
    do {
        for (int i = 0; i < 25; i++) printf("+");
        printf("\n");
        printf("1. connect to a server\n");
        printf("2. close the connection\n");
        printf("3. print the server time\n");
        printf("4. print the server username\n");
        printf("5. print all the clients connected\n");
        printf("6. send the message\n");
        printf("7. eixt the program\n");
        for (int i = 0; i < 25; i++) printf("+");
        printf("\n");
        scanf(" %d", &select);
    } while (select < 1 || select > 7);
    return select;
}

int main(){
    pthread_t tid;
    int isconnected = 0;
	int sockfd;
	struct sockaddr_in dest_addr;
	//char buf[MAX_DATA];

    char send_data[MAX_DATA];
    char send_buf[512];
    char get_data[512];
    int mlen; // length of the message received
    int iscreated = 1;
    
    while (1) { 
        int choice = menu();
        switch(choice) {
            case 1:
                if (isconnected) {
                    printf("You are already in connection, please close the connection before you connect to another server.\n");
                    break;
                }
                int port;
                char Addr[16];
                printf("Enter the ip address of the server:\n");
                scanf("%s", Addr);
                printf("Enter the port of the server:\n");
                scanf(" %d", &port);

            	sockfd=socket(AF_INET,SOCK_STREAM,0);
            	
            	dest_addr.sin_family=AF_INET;
             	dest_addr.sin_port=htons(port);
            	dest_addr.sin_addr.s_addr=inet_addr(Addr);
            	bzero(&(dest_addr.sin_zero),8);
            	connect(sockfd,(struct sockaddr*)&dest_addr,sizeof(struct sockaddr));
                printf("Connect success!\n");
                isconnected = 1;
                if (iscreated) {
                    pthread_create(&tid, NULL, receive, (void *)sockfd);
                    iscreated = 0;
                }
                break;
            case 2:
                //check if connected
                if (isconnected) {
                    printf("Connection released.\n");
                    close(sockfd);
                    isconnected = 0;
                } else {
                    printf("Plz connect first\n");
                }
                break;
            case 3:
                if (!isconnected) {
                    printf("Plz connect first!\n");
                    break;
                }
                memset(send_data, 0, sizeof(send_data));
                memset(get_data, 0, sizeof(get_data));
                wrapper(send_buf, 1, 0, sockfd, 0, send_data);
                write(sockfd, send_buf, sizeof(send_buf));
                /*
                while (1) {
                    mlen = read(sockfd, get_data, sizeof(get_data));
                    printTime(get_data+HEADLENGTH);
                    if (mlen > 0) break;
                }
                */
                break;
            case 4:
                if (!isconnected) {
                    printf("Plz connect first!\n");
                        break;
                }
                memset(send_data, 0, sizeof(send_data));
                memset(get_data, 0, sizeof(get_data));
                wrapper(send_buf, 2, 0, sockfd, 0, send_data);
                write(sockfd, send_buf, sizeof(send_buf));
                /* 
                while (1) {
                    mlen = read(sockfd, get_data, sizeof(get_data));
                    getUserName(get_data+HEADLENGTH);
                    if (mlen > 0) break;
                }
                */
                break;

            case 5:
                if (!isconnected) {
                    printf("Plz connect first!\n");
                    break;
                }
                memset(send_data, 0, sizeof(send_data));
                memset(get_data, 0, sizeof(get_data));
                wrapper(send_buf, 3, 0, sockfd, 0, send_data);
                write(sockfd, send_buf, sizeof(send_buf));
                break; 
            case 6:
                if (!isconnected) {
                    printf("Plz connect first!\n");
                    break;
                }
                memset(send_data, 0, sizeof(send_data));
                memset(get_data, 0, sizeof(get_data));
                printf("Specify the sockid of the client you want to send message to:\n");
                int w;
                scanf(" %d", &w);
                char d[128];
                printf("Enter what you want to send:\n");
                scanf("%s", d);

                wrapper(send_buf, 4, sizeof(d), sockfd, w, d);
                write(sockfd, send_buf, sizeof(send_buf));
                break; 
            case 7:
                exit(0);
                break;
            default:
                break;
        }
    }
    //wrapper(send_buf, 1, 3, 4, 5, "test");
	//write(sockfd,send_buf, sizeof(send_buf));
	return 0;
} 

void *receive(void* arg) {
    int cfd = (int)arg;
    int func, len, from, to;

    char get_data[512];
	pthread_detach(pthread_self());
    int mlen;
    while (1) {
        memset(get_data, 0, sizeof(get_data));
        mlen = read(cfd, get_data, sizeof(get_data));
        if (mlen > 0) {
            unwrapper(get_data, &func, &len, &from, &to);
            //printTime(get_data+HEADLENGTH);
            //printf("%d\n", func);
            
            switch(func) {
                case 5:
                    //printf("this is right\n");
                    printTime(get_data+HEADLENGTH);
                    break;
                case 6:
                    getUserName(get_data+HEADLENGTH);
                    break;
                case 7:
                    printf("client ip\tport\tsockid\n");
                    printf("%s\n", get_data+HEADLENGTH);
                    break;
                case 8:
                    printf("message from the client with sockid %d: %s\n", to, get_data+HEADLENGTH);
                    break;
                default:
                    break;
            }
            
        }
    }
    return NULL;
}
