import cv2 as cv
import numpy as np

NUM = 43
PATH_TXT = "../../database/myDB/txt/"
PATH_IMG = "../../database/myDB/raw/"
OUTPUT_PATH = "../../database/myDB/processed/"

def readCoordinate(i):
    with open(PATH_TXT+str(i)+".txt") as f:
        s = f.read()
    s = s.split()
    return [int(x) for x in s]

if __name__ == "__main__":
    for i in range(1, NUM+1):
        if i == 35:
            continue
        coordinates = readCoordinate(i)
        img = cv.imread(PATH_IMG+str(i)+".jpg")
        x1, y1, x2, y2 = coordinates[0], coordinates[1], coordinates[2], coordinates[3]
        D = int(x2 - x1)
        img = img[y1-int(1.2*D):y1+int(1.8*D), x1-D:x1+2*D]
        img = cv.resize(img, (800, 800))
        cv.imshow("img", img)
        cv.imwrite(OUTPUT_PATH+str(i)+".jpg", img)
        cv.waitKey(0)
    cv.destroyAllWindows()



