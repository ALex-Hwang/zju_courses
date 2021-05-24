import cv2 as cv
import numpy as np

NUM = 44
PATH = "../../database/myDB/raw/"
PATH_TXT = "../../database/myDB/txt/"


xy = []
def getXY(event, x, y, flags, param):
    if event == cv.EVENT_LBUTTONDOWN:
        xy.append(str(x))
        xy.append(str(y))


if __name__ == "__main__":
    for i in range(1, NUM+1):
        xy.clear()
        img = cv.imread(PATH+str(i)+".jpg")
        cv.namedWindow("image")
        cv.setMouseCallback("image", getXY)
        cv.imshow("image", img)
        cv.waitKey(0)
        cv.destroyAllWindows()
        f = open(PATH_TXT+str(i)+".txt", "w")
        f.write(" ".join(xy))
        f.close()


