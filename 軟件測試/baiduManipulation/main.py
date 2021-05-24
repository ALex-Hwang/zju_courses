import requests
from bs4 import BeautifulSoup
import re
from requests_html import HTMLSession
import pandas as pd
import numpy as np
import os
from utils import convertUrl

bankList = ['中国银行','中国建设银行', '中国农业银行', '交通银行', '中国工商银行', '招商银行', '中信银行', '中国光大银行', \
    '华夏银行', '浦发银行', '兴业银行', '民生银行', '平安银行', '广发银行', '恒丰银行', '渤海银行', '浙商银行']

bankUrls = ['boc', 'ccb', 'abchina', 'bankcomm', 'icbc', 'cmbchina', 'citicbank', 'cebbank', 'hxb', \
    'spdb', 'cib', 'cmbc', 'pingan', 'cgbchina', 'hfbank', 'cbhb', 'czbank']

name2url = {'中国银行': 'boc', '中国建设银行': 'ccb', '中国农业银行': 'abchina', '交通银行': 'bankcomm', \
    '中国工商银行': 'icbc', '招商银行': 'cmbchina', '中信银行': 'citicbank', '中国光大银行': 'cebbank', \
    '华夏银行': 'hxb', '浦发银行': 'spdb', '兴业银行': 'cib', '民生银行': 'cmbc', '平安银行': 'pingan', \
    '广发银行': 'cgbchina', '恒丰银行': 'hfbank', '渤海银行': 'cbhb', '浙商银行': 'czbank'}

keyWords = ['贸易金融', '供应链金融']

# help compute the name2url
def computeDict():
    for name, url in zip(bankList, bankUrls):
        name2url[name] = url
    print(name2url)

# to get the official site from the urls
def getOfficial(bankName, names, urls):
    for name, url in zip(names, urls):
        # exclude the exception
        if 'www.rhd361.com' in name:
            continue
        if name2url[bankName] in name or bankName in name:
            return url
    return None

# get the content(return a requests object)
def getContent(bankName, keyWord, divClass):
    url = table[keyWord][bankName]
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    content = requests.get(url, headers=headers)
    content.encoding = 'utf-8'

    if bankName == '渤海银行':
        content.encoding = 'GBK'

    Bs = BeautifulSoup(content.text, 'html.parser')
    res = Bs.find('div', class_=divClass)
    if res == None:
        res = Bs.find('div', id=divClass)
    with open('./results/'+bankName+keyWord+'.txt', 'w') as F:
        F.write(res.text)



# return the the name and its link related to the key
def baidu(key):
    url = "http://www.baidu.com/s?wd="+key+"&cl=3/"
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    # the results
    contents = soup.find_all('div', class_='result c-container new-pmd')
    names = []
    urls = []
    for content in contents:
        name, url = convert(content)
        if name == None:
            continue
        names.append(name)
        urls.append(url)

    return names, urls

# interpret the div to the name, url
def convert(div):
    nameDiv = div.find('div', class_='f13 c-gap-top-xsmall se_st_footer user-avatar')

    # slove the problems caused by tencent video
    if nameDiv==None:
        return None, None

    name = nameDiv.find('a', target='_blank').text
    a = div.find('a', target='_blank')
    return name, a.attrs['href']
    #return a.attrs['href']

def getUrlTable(urls):
    urls = np.array(urls).reshape(17, 2)
    table = pd.DataFrame(data=urls, index=bankList, columns=keyWords)
    return table

def getText(divClass, url):
    html = requests.get(url)
    html.encoding = 'utf-8'
    html = html.text
    Bs = BeautifulSoup(html, 'html.parser')
    return str(Bs.find('div', class_=divClass).text)



if __name__ == "__main__":

    # get all the official urls
    if os.path.exists('./Urls.csv'):
        table = pd.read_csv('./Urls.csv', index_col=0)
        #table.set_index(['Unnamed: 0'], inplace=True)
    else:
        URLs = []
        for bankName in bankList:
            for key in keyWords:
                names, urls = baidu(bankName+" "+key)
                res = getOfficial(bankName, names, urls)
                URLs.append(res)

        URLs = convertUrl(URLs)
        table = getUrlTable(URLs)
        table.to_csv('./Urls.csv', encoding='utf-8')

    #--------------------------------------------------#
    # 中国银行
    url = table['贸易金融']['中国银行']
    content = requests.get(url)
    content.encoding = 'utf-8'
    Bs = BeautifulSoup(content.text, 'html.parser')
    #test = content.html.find('a', containing='国内')
    # the base url

    test = Bs.find('p', id='hidden3')
    test = test.parent.parent
    urls = test.find_all('dd')

    titles = []
    contents = []

    # 贸易金融
    for u in urls:
        title = u.find('a').attrs['title']
        a = u.find('a').attrs['href']
        titles.append(title)
        contents.append(getText('sub_con', url+a))
    
    df = pd.DataFrame(data=contents, index=titles, columns=['介绍'])
    df.to_csv('./results/中国银行贸易金融.csv')

    # 供应链金融    
    
    content = requests.get(url)
    content.encoding = 'utf-8'
    Bs = BeautifulSoup(content.text, 'html.parser')
    #test = content.html.find('a', containing='国内')
    # the base url

    test = Bs.find('p', id='hidden5')
    test = test.parent.parent
    urls = test.find_all('dd')

    titles = []
    contents = []

    for u in urls:
        title = u.find('a').attrs['title']
        a = u.find('a').attrs['href']
        titles.append(title)
        contents.append(getText('sub_con', url+a))
    
    df = pd.DataFrame(data=contents, index=titles, columns=['介绍'])
    df.to_csv('./results/中国银行供应链金融.csv')
    #--------------------------------------------------#
    # 中国建设银行
    # 贸易金融
    getContent('中国建设银行', '贸易金融', 'mess_box')
    
    # 供应链金融
    url = table['供应链金融']['中国建设银行']
    content = requests.get(url)
    content.encoding = 'utf-8'
    Bs = BeautifulSoup(content.text, 'html.parser')
    with open('./results/中国建设银行供应链金融.txt', 'w') as File:
        File.write(Bs.text)
    
    #--------------------------------------------------#
    # 中国农业银行
    # 贸易金融
    getContent('中国农业银行', '贸易金融', 'cptj')
    
    # 供应链金融
    # 无该网页


    #--------------------------------------------------#
    # 交通银行
    # 贸易金融
    getContent('交通银行', '贸易金融', 'menu-box')

    # 供应链金融
    getContent('交通银行', '供应链金融', 'page-mian-block')

    #--------------------------------------------------#
    # 中国工商银行
    # 贸易金融
    getContent('中国工商银行', '贸易金融', 'FreePlaceHoldersControl1')

    # 供应链金融
    getContent('中国工商银行', '供应链金融', 'FreePlaceHoldersControl1')

    #--------------------------------------------------#
    # 招商银行
    # 贸易金融
    getContent('招商银行', '贸易金融', 'cor_divtop')

    # 供应链金融
    getContent('招商银行', '供应链金融', 'column_main')
    
    #--------------------------------------------------#
    # 中信银行
    # 贸易金融
    getContent('中信银行', '贸易金融', 'loan_child')

    # 供应链金融
    getContent('中信银行', '供应链金融', 'loan_child')
    
    #--------------------------------------------------#
    # 中国光大银行
    # 没有数据

    #--------------------------------------------------#
    # 华夏银行
    # 贸易金融
    getContent('华夏银行', '贸易金融', 'pro_contp')

    # 供应链金融
    getContent('华夏银行', '供应链金融', 'pro_contp')

    #--------------------------------------------------#
    # 浦发银行
    # this needs selenium
    # 贸易金融

    # 供应链金融

    #--------------------------------------------------#
    # 兴业银行
    # 贸易金融
    getContent('兴业银行', '贸易金融', 'pagewrap')

    # 供应链金融
    getContent('兴业银行', '供应链金融', 'middle')

    #--------------------------------------------------#
    # 民生银行
    # 贸易金融
    getContent('民生银行', '贸易金融', 'div_margin')

    # 供应链金融
    getContent('民生银行', '供应链金融', 'div_margin')

    #--------------------------------------------------#
    # 平安银行
    # 贸易金融
    getContent('平安银行', '贸易金融', 'span10')

    # 供应链金融
    getContent('平安银行', '供应链金融', 'span10')

    #--------------------------------------------------#
    # 广发银行
    # 贸易金融
    getContent('广发银行', '贸易金融', 'textContent')

    # 供应链金融
    # 百度搜索到的结果不存在

    #--------------------------------------------------#
    # 恒丰银行
    # 百度没有搜索到结果

    #--------------------------------------------------#
    # 渤海银行
    # 贸易金融
    # 编码问题
    getContent('渤海银行', '贸易金融', 'textarea')

    # 供应链金融
    # 需要用数字认证，无法访问

    #--------------------------------------------------#
    # 浙商银行
    # 贸易金融
    # 网站搜索结果不正确

    # 供应链金融
    getContent('浙商银行', '供应链金融', 'cdv_content')