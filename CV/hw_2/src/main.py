from lineDetection import lineDetection
from circleDetection import circleDetection_coin, circleDetection_seal
import numpy as np
import cv2 as cv

frames = []
img1 = cv.imread('../images/hw-highway.jpg')
img1 = lineDetection(img1, frames)
frames.append(img1)

img2 = cv.imread('../images/hw-seal.jpg')
img2 = circleDetection_seal(img2, frames)
frames.append(img2)

img3 = cv.imread('../images/hw-coin.JPG')
img3 = circleDetection_coin(img3, frames)
frames.append(img3)

for frame in frames:
    cv.imshow('img', frame)
    cv.waitKey(1000)

cv.imwrite('../result/processedHighway.jpg', img1)
cv.imwrite('../result/processedSeal.jpg', img2)
cv.imwrite('../result/processedCoin.jpg', img3)
cv.destroyAllWindows()
