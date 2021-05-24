#include<stdio.h>
#include<unistd.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<arpa/inet.h>
#include<string.h>
#include<strings.h>
#include<ctype.h>
#include<stdlib.h>
#include<pthread.h>
void *run(void *arg);


int main(){
		//lfd：socket返回的文件描述符，用lfd监听并接受客户端连接
   		//cfd：客户端链接上来返回的cfd，用cfd和客户端通信
        int lfd,cfd;
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
        serv_addr.sin_port = htons(9999);
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
           cfd = accept(lfd,(struct sockaddr*)&client_addr,&client_len);
           printf("client:%s\t%d\n",
		   inet_ntop(AF_INET,&client_addr.sin_addr.s_addr,client_ip,sizeof(client_ip)),
		   ntohs(client_addr.sin_port));
		   //创建线程 回调 run方法  cfd做参数传入 
           pthread_create(&tid,NULL,run,(void *)cfd);
           
		}
		return 0;
} 
void *run(void *arg){
	int cfd = (int ) arg;
	pthread_detach(pthread_self());
	char buf[1024];//缓冲区
	int len,i;
	while(1){
		len = read(cfd,buf,sizeof(buf));
		printf("receive: %s\n",buf);
		if(len<=0)break;
	}
	close(cfd);
}


