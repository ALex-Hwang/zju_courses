from utils import adjust_gamma
from matplotlib import pyplot as plt
import cv2 as cv
import numpy as np

#img = cv.imread("../images/hw-highway.jpg")


# hough voting
def voting(img):
    H, W = img.shape
    r_max = np.ceil(np.sqrt(H**2+W**2)).astype(np.int)
    houghTable = np.zeros((r_max*2, 180), dtype=np.int)
    points = np.where(img==255)

    for y, x in zip(points[0], points[1]):
        for i in range(180):
            t = np.pi/180. * i
            r = int(x * np.cos(t) + y * np.sin(t))

            houghTable[r+r_max, i] += 1
    return  houghTable.astype(np.uint8)

# suppressing the voting table
def suppressing(houghTable):
    r_max, _ = houghTable.shape

    for y in range(r_max):
        for x in range(180):
            x1 = max(x-1, 0)
            x2 = min(x+1, 180)
            y1 = max(y-1, 0)
            y2 = min(y+1, r_max-1)

            if np.max(houghTable[y1:y2, x1:x2])!=houghTable[y, x]:
                houghTable[y, x] = 0
            else:
                pass

'''
# return the top 'number' points
def mostVotes(houghTable, number=10):
    x_index = np.argsort(houghTable.ravel())[::-1][:number]
    y_index = x_index.copy()
    x = x_index % 180
    y = y_index // 180
    out = np.zeros_like(houghTable, dtype=np.int)
    out[y][x] = 255
    return out

'''

# draw the lines
def drawLine(img, table):
    H, W, _ = img.shape
    size, _ = table.shape
    out = img.copy()


    ind_x = np.argsort(table.ravel())[::-1][:20]
    ind_y = ind_x.copy()
    thetas = ind_x % 180
    rs = ind_y // 180 - size / 2

    for r, theta in zip(rs, thetas):
        t = np.pi/180. * theta

        for x in range(W):
            if np.sin(t) != 0:
                y = - (np.cos(t) / np.sin(t)) * x + (r) / np.sin(t)
                y = int(y)
                if y >= H or y < 0:
                    continue
                out[y, x] = [0, 0, 255]

        for y in range(H):
            if np.cos(t) != 0:
                x = - (np.sin(t) / np.cos(t)) * y + (r) / np.cos(t)
                x = int(x)
                if x >= W or x < 0:
                    continue
                out[y, x] = [0, 0, 255]
    out = out.astype(np.uint8)
    return out


def Hough(edges, img):
    table = voting(edges)
    suppressing(table)
    out = drawLine(img, table)
    return out

def lineDetection(img, frames):
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    gray = cv.equalizeHist(gray)
    gray = adjust_gamma(gray, 1.3)
    
    gray = cv.GaussianBlur(gray, (5,5), 2)
    edges = cv.Canny(gray, 222, 250, apertureSize = 3)
    frames.append(edges)
    res = Hough(edges, img)
    return res
