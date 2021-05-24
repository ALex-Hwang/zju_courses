#include "func_ser.h"
#include "protocol.h"
void *run(void *arg);
int clientNum = 0;

int main(){
		//lfd：socket返回的文件描述符，用lfd监听并接受客户端连接
   		//cfd：客户端链接上来返回的cfd，用cfd和客户端通信
        int lfd;
        int* cfd;
		char client_ip[128];
        //serv_addr服务器地址
        //client_addr客户端地址
        struct sockaddr_in serv_addr,client_addr;
        socklen_t client_len;
        pthread_t tid;
        
        //socket创建服务器返回lfd文件描述符
        lfd = socket(AF_INET,SOCK_STREAM,0);
        bzero(&serv_addr,sizeof(serv_addr));
        //ipv4
        serv_addr.sin_family = AF_INET;
        //端口 本地字节序转网络字节序 host to net short 大小端存储问题
        serv_addr.sin_port = htons(2081);
        //ip host to net long
        serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
        //bind
        bind(lfd,(struct sockaddr*)&serv_addr,sizeof(serv_addr));
        //监听是否有客户连接
        listen(lfd,128);
        printf("wait for connect...\n");
        
        while(1){
            client_len = sizeof(client_addr);//客户端地址长度
            //连接成功返回cfd，用cfd和客户通信
            cfd = malloc(sizeof(int));
            *cfd = accept(lfd,(struct sockaddr*)&client_addr,&client_len);
            printf("client:%s\t%d\n",
	        inet_ntop(AF_INET,&client_addr.sin_addr.s_addr,client_ip,sizeof(client_ip)),
	        ntohs(client_addr.sin_port));
            if (clientNum > 128) {
                printf("Too many connected clients.\n");
            }
            struct client c;
            c.addr = client_addr;
            c.sockid = *((int*)cfd);
            strcpy(c.ip, client_ip);
            clients[clientNum++] = c;
	        //创建线程 回调 run方法  cfd做参数传入 
            pthread_create(&tid,NULL,run, (void*)cfd);
		}
		return 0;
} 
void *run(void *arg){
	int cfd = *((int*)arg);
    free(arg);
	pthread_detach(pthread_self());
	char buf[512];
    char send_buf[512];
    int mlen;
    while(1) {
	    mlen = read(cfd,buf,sizeof(buf));
        if (mlen <= 0) break;
        int func, len, from, to;
        unwrapper(buf, &func, &len, &from, &to);
        switch(func) {
            case 1: // for time
                memset(send_buf, 0, sizeof(send_buf));
                getTime(&len, send_buf); 
                wrapper(buf, 5, len, 0, cfd, send_buf);
                write(cfd, buf, sizeof(buf));
                break; 
            case 2: // for username
                memset(send_buf, 0, sizeof(send_buf));
                getUser(&len, send_buf);
                wrapper(buf, 6, len, 0, cfd, send_buf);
                write(cfd, buf, sizeof(buf));
                break;
            case 3:
                memset(send_buf, 0, sizeof(send_buf));
                for (int i = 0; i < clientNum; i++) {
                    //printf("%d\n", clients[i].sockid);
                    sprintf(send_buf+i*18, "%s\t%d\t%d\n",
            	    inet_ntop(AF_INET,&clients[i].addr.sin_addr.s_addr,clients[i].ip,sizeof(clients[i].ip)),
            	    ntohs(clients[i].addr.sin_port), clients[i].sockid);
                    }
                wrapper(buf, 7, sizeof(send_buf), 0, cfd, send_buf);
                write(cfd, buf, sizeof(buf));
                break;
            case 4:
                strcpy(send_buf, buf+HEADLENGTH);
                wrapper(buf, 8, sizeof(send_buf), 0, to, send_buf);
                write(to, buf, sizeof(buf));
                break;

            default:
                break;
        }
    }
    //write(cfd, buf, len);

	close(cfd);
    return NULL;
}


