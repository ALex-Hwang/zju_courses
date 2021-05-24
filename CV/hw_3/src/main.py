from harris import harris, scale01, drawPoints
import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

PATH = '../results/'
count = 0
cap = cv.VideoCapture(0)
while cap.isOpened():
    _, img = cap.read()
    cv.imshow('img', img)
    if cv.waitKey(40)&0xFF == ord(' '):
        gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
        gray = np.array(gray, dtype=np.float32)
        points, R, MaxL, MinL = harris(gray)
        gray = gray.astype(np.uint8)
        drawPoints(img, points)
        cv.imshow('max', MaxL)
        cv.imwrite(PATH+str(count)+'_max.png', MaxL)
        if cv.waitKey(0)&0xFF == ord('q'):
            break
        cv.imshow('min', MinL)
        cv.imwrite(PATH+str(count)+'_min.png', MinL)
        if cv.waitKey(0)&0xFF == ord('q'):
            break
        cv.imshow('img', img)
        cv.imwrite(PATH+str(count)+'_img.png', img)
        if cv.waitKey(0)&0xFF == ord('q'):
            break
        cv.imshow('R', R)
        cv.imwrite(PATH+str(count)+'_R.png', R)
        if cv.waitKey(0)&0xFF == ord('q'):
            break
        count+=1

cap.release()
cv.destroyAllWindows()




'''
cv.imshow('img', R) 
cv.waitKey(0)
cv.destroyAllWindows()

'''

drawPoints(img, points)
plt.imshow(img, cmap='gray')
plt.show()

