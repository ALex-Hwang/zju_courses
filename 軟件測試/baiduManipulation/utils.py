from selenium.webdriver import Chrome

# convert the baidu url to the real ones
def convertUrl(urls):
    res = []
    driver = Chrome()
    for url in urls:
        if url==None:
            res.append(None)
            continue
        driver.get(url)
        res.append(driver.current_url)
    return res