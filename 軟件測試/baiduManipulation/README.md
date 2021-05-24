# 作业2-3

---

## 程序介绍

> 说明：本程序仅在获取官网链接的时候使用了`selenium`，原因是百度搜索得到的链接需要使用js进行跳转。

### 程序结构

```
├── README.md
├── Urls.csv
├── main.py
├── requirements.txt
├── results
└── utils.py
```

其中，`Urls.cvs`用来存放百度搜索得到的官网的网址，`results`来存放搜索的结果。

### 环境依赖

本程序使用的`python`版本为`3.9.0`, 环境依赖如下：

```
appdirs==1.4.4
astroid==2.4.2
beautifulsoup4==4.9.3
bs4==0.0.1
certifi==2020.12.5
cffi==1.14.4
chardet==4.0.0
cryptography==3.3.1
cssselect==1.1.0
fake-useragent==0.1.11
idna==2.10
isort==5.7.0
lazy-object-proxy==1.4.3
lxml==4.6.2
mccabe==0.6.1
ndg-httpsclient==0.5.1
numpy==1.19.4
pandas==1.2.0
parse==1.18.0
pyasn1==0.4.8
pycparser==2.20
pyee==7.0.4
pylint==2.6.0
pyOpenSSL==20.0.1
pyppeteer==0.2.3
pyquery==1.4.3
python-dateutil==2.8.1
pytz==2020.5
requests==2.25.1
requests-html==0.10.0
selenium==3.141.0
six==1.15.0
soupsieve==2.1
toml==0.10.2
tqdm==4.55.1
urllib3==1.26.2
w3lib==1.22.0
websockets==8.1
wrapt==1.12.1
```

通过`requirements.txt`进行安装。

### 程序运行

```shell
python3 main.py
```

所有的运行结果都会保存在`results`中，没有出现的银行的原因在`main.py`中给出。