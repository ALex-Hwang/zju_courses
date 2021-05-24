from parameter import *
import numpy as np
import cv2 as cv

font = cv.FONT_HERSHEY_SIMPLEX
w_center = width/2
h_center = height/2

# render the color of the background
def color(r, g, b):
    res = []
    for _ in range(width):
        for _ in range(height):
            res.append(b)
            res.append(g)
            res.append(r)
    res = np.array(res).reshape(height, width, -1)
    res = res.astype(np.uint8)
    return res

def noiseText(frames, text, FPS=25, seconds=2):
    for _ in range(FPS*seconds):
        img = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)
        cv.putText(img, text, (int(w_center-150), int(h_center-20)), font, 2, (255, 255, 255), 5)
        frames.append(img)
    return img

def marvel(frames, text, FPS=25, seconds=2):
    return None

# everything but the face
def background():
    img = color(0x7D, 0x7B, 0x7D)

    # the table
    cv.rectangle(img, (0, 720), (800, 690), (44, 49, 66), cv.FILLED)
    cv.line(img, (0, 690), (800, 690), (0, 0, 0), 5)
    cv.line(img, (800, 690), (800, 720), (0, 0, 0), 5)
    cv.line(img, (800, 690), (700, 720), (0, 0, 0), 5)

    # the clock
    cv.circle(img, (350, 150), 80, (0, 0, 0), 5)
    cv.line(img, (350, 150), (350, 90), (0, 0, 0), 4)
    cv.line(img, (350, 150), (390, 150), (0, 0, 0), 4)

    # the head
    cv.circle(img, (700, 360), 140, (0, 0, 0), 5)
    cv.line(img, (700, 500), (700, 690), (0, 0, 0), 5)

    # the keyboard
    cv.rectangle(img, (400, 670), (650, 700), (0, 0, 0), cv.FILLED)
    cv.line(img, (525, 685), (500, 720), (0, 0, 0), 5)

    # the monitor
    cv.fillConvexPoly(img, np.array([[100, 700], [300, 700], [290, 670], [110, 670]], dtype=np.int32), 5)
    cv.fillConvexPoly(img, np.array([[125, 670], [150, 450], [300, 450], [275, 670]], dtype=np.int32), 5)
    cv.fillConvexPoly(img, np.array([[90, 600], [70, 350], [450, 350], [470, 600]], dtype=np.int32), 5)

    # the wall
    cv.line(img, (250, 0), (250, 350), (0, 0, 0), 6)

    return img

# the first face
# the moving range is below 10
def face_1(img, eyebrow=325):
    # the eyes
    cv.circle(img, (625, 340), 30, (0, 0, 0), 4)
    cv.circle(img, (715, 340), 30, (0, 0, 0), 4)
    cv.line(img, (600, eyebrow), (650, eyebrow), (0, 0, 0), 4)
    cv.line(img, (690, eyebrow), (740, eyebrow), (0, 0, 0), 4)
    cv.circle(img, (620, 340), 3, (0, 0, 0), 4)
    cv.circle(img, (710, 340), 3, (0, 0, 0), 4)
    # the mouth
    cv.line(img, (645, 420), (675, 420), (0, 0, 0), 4)
    # the hands
    cv.line(img, (700, 580), (550, 680), (0, 0, 0), 5)
    cv.line(img, (700, 580), (450, 680), (0, 0, 0), 5)
    return img 

# the second face
def face_2(img):
    # the eyes 
    cv.ellipse(img, (625, 340), (30, 30), 0, 20, 200, (0, 0, 0), 4)
    cv.ellipse(img, (715, 340), (30, 30), 0, -20, 160, (0, 0, 0), 4)
    cv.line(img, (688, 352), (740, 330), (0, 0, 0), 4)
    cv.line(img, (650, 352), (598, 330), (0, 0, 0), 4)
    return img


# show the hands' mpvement
def handsmove(frames, img):
    # the hands
    for _ in range(5):
        temp = img.copy()
        cv.line(temp, (700, 580), (550, 680), (0, 0, 0), 5)
        cv.line(temp, (700, 580), (450, 680), (0, 0, 0), 5)
        for _ in range(6):
            frames.append(temp)

        temp  = img.copy()
        cv.line(temp, (700, 580), (470, 650), (0, 0, 0), 5)
        cv.line(temp, (700, 580), (550, 680), (0, 0, 0), 5)
        for _ in range(6):
            frames.append(temp)

        temp  = img.copy()
        cv.line(temp, (700, 580), (450, 680), (0, 0, 0), 5)
        cv.line(temp, (700, 580), (570, 650), (0, 0, 0), 5)
        for _ in range(6):
            frames.append(temp)

        temp  = img.copy()
        cv.line(temp, (700, 580), (470, 650), (0, 0, 0), 5)
        cv.line(temp, (700, 580), (550, 680), (0, 0, 0), 5)
        for _ in range(6):
            frames.append(temp)

# still got bugs
def drawText(frames, img, text, pos=(470, 140), fontSize=2, color=(0, 0, 0)):
    for t in range(len(text)+1):
        cv.putText(img, text[:t], pos, font, fontSize, color)
        temp = img.copy()
        #cv.imshow('img', img)
        #cv.waitKey(400)
        for _ in range(5):
            frames.append(temp)
    return img
    
def eyeMove(frames, img):
    for i in range(10):
        face_1(img, 325+i)
        temp = img.copy()
        for _ in range(5):
            frames.append(temp)
# the test    
'''
if __name__ == '__main__':
    tests = []
    img = face_2(background())
    handsmove(tests, img)
    for i in tests:
        cv.imshow('img', i)
        cv.waitKey(40)
    cv.destroyAllWindows()
'''


