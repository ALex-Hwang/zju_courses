import numpy as np
import cv2 as cv
from utils import adjust_gamma
from matplotlib import pyplot as plt




def suppressing(table):
    H, W = table.shape

    for y in range(H):
        for x in range(W):
            x1 = max(x-40, 0)
            x2 = min(x+40, W-1)
            y1 = max(y-40, 0)
            y2 = min(y+40, H-1)

            if np.max(table[y1:y2, x1:x2])!=table[y, x]:
                table[y, x] = 0
            else:
                pass

def centers(img, edges, E, num, X, Y):
    H, W, _ = img.shape
    
    '''
    experimental
    you have to specify the r_min and r_max
    '''
    # voting for the circle center
    N = np.zeros(edges.shape, dtype=float)
    # for each pixel in the edges
    r_min = 1
    r_max = 100
    
    for y in range(H):
        for x in range(W):
            if edges[y, x]==0:
                continue
            if X[y, x] == 0:
                continue
            theta = np.arctan(float(Y[y, x]/X[y, x]))
            sin = np.sin(theta)
            cos = np.cos(theta)
            for r in range(r_min, r_max):
                a = int(r * sin)
                b = int(r * cos)
                if y+b >= H or x+a >= W or y+b < 0 or x+a < 0:
                    pass
                else:
                    N[y+b, x+a] += E[y, x]
                    #img[y+b, x+a] = (255, 0, 0)
                if y-b >= H or x-a >= W or y-b < 0 or x-a < 0:
                    pass
                else:
                    N[y-b, x-a] += E[y, x]
                    #img[y-b, x-a] = (255, 0, 0)
    
    res = [] 
    
    
    # get the candinates for the centers
    suppressing(N)
    candidates = np.argsort(N.ravel())[::-1][:num]
    for candidate in candidates:
        x = (candidate%W)
        y = (candidate//W)
        res.append((x,y))
    return res

def drawRadius(img, edges, x, y, E, thres, r_min=30):
    H, W, _ = img.shape

    r_max = int(np.sqrt(H**2+W**2))
    nums = np.zeros((r_max+1,1), dtype=float)

    step = 3
    for r in range(r_min, r_max, step):
        perimeter = int(np.pi*2*r)
        num = 0
        for i in range(step):
            for t in range(-180, 180):
                theta = np.pi/180. * t
                dy = int((r+i)*np.sin(t))
                dx = int((r+i)*np.cos(t))
                if x+dx >= W or x+dx < 0 or y+dy < 0 or y+dy >= H:
                    continue
                if edges[y+dy, x+dx] == 255:
                    num += 1/r
        nums[r] = num

    for r in range(r_min, r_max):
        if nums[r] >= thres:
            cv.circle(img, (x, y), r, (0, 255, 255), 2)
    return img



def circleDetection_coin(img, frames):
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    gray = cv.GaussianBlur(gray, (9, 9), 1.75)

    # gratitude
    Y = cv.Sobel(gray, cv.CV_16S, 1, 0)
    X = cv.Sobel(gray, cv.CV_16S, 0, 1)
    absX = cv.convertScaleAbs(X)
    absY = cv.convertScaleAbs(Y)
    E = np.sqrt(absX**2+absY**2)
    edges = cv.Canny(gray, 150, 200, apertureSize = 3)
    frames.append(edges)

    
    candidates = centers(img, edges, E, 12, X, Y)
    for candidate in candidates:
        img[candidate[1], candidate[0]] = (0, 255, 0)
        drawRadius(img, edges, candidate[0], candidate[1], E, 2.2)
    return img 




def circleDetection_seal(img, frames):
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    gray = cv.GaussianBlur(gray, (9, 9), 1.75)

    # gratitude
    Y = cv.Sobel(gray, cv.CV_16S, 1, 0)
    X = cv.Sobel(gray, cv.CV_16S, 0, 1)
    absX = cv.convertScaleAbs(X)
    absY = cv.convertScaleAbs(Y)
    E = np.sqrt(absX**2+absY**2)
    edges = cv.Canny(gray, 150, 200, apertureSize = 3)
    frames.append(edges)

    
    candidates = centers(img, edges, E, 2, X, Y)
    for candidate in candidates:
        img[candidate[1], candidate[0]] = (0, 255, 0)
        drawRadius(img, edges, candidate[0], candidate[1], E, 3, 50)
    return img 


