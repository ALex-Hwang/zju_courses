import cv2 as cv
from parameter import *

dir = '../images/'
# to load the pics
def importImage(frames, image, FPS=25, seconds=2):
    img = cv.imread(dir+image)
    img = cv.resize(img, (width, height), cv.INTER_LINEAR)
    for _ in range(FPS*seconds):
        frames.append(img)
    return img


def showImage(frames, image, FPS=25, seconds=2):
    for _ in range(FPS*seconds):
        frames.append(image)
        return image
