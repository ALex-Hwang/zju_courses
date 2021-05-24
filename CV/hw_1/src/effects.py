import cv2 as cv
import numpy as np
from parameter import *

# dim the picture to all black
def dim(frames, img, FPS=25, seconds=2):
    temp = img
    #step = int(255/(FPS*seconds))
    for _ in range(FPS*seconds):
        temp = temp / 2
        frames.append(temp)

def lightup(frames, img, FPS=25, seconds=2):
    temp = img
    for _ in range(FPS*seconds):
        temp = temp + 5
        frames.append(temp)

# vertical slide
# bugs here: the appened ones should be a copy of the original img BUT WHICH IS TOO SLOW
def vertical(frames, old_img, new_img, FPS=25, seconds=2):
    for i in range(7):
        for j in range(width):
            for s in range(100):
                old_img[i*100+s][j] = (0, 255, 255)
            temp = old_img
            frames.append(temp)

def lighten(frames, FPS=25, seconds=2):
    img = np.zeros((height, width), dtype=np.uint8)
    for _ in range(FPS*seconds):
        frames.append(img.copy())
        img += 5

'''
if __name__ == '__main__':
    img = np.zeros((height, width, 3), dtype=np.uint8) 
    #vertical(frames, img, img)
    dim(frames, img)
    for i in frames:
        cv.imshow('img', i)
        cv.waitKey(40)
    cv.destroyAllWindows()
'''
