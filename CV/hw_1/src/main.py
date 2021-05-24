import cv2 as cv
import numpy as np
from images import *
from parameter import *
from draw import *
from effects import *
from cv2 import VideoWriter, VideoWriter_fourcc

if __name__ == '__main__':
    # the video output
    fourcc = VideoWriter_fourcc(*'mp4v')
    out = VideoWriter('../videos/video.mp4', fourcc, float(FPS), (width, height))

    # the first scene
    img = noiseText(frames, 'hello world', FPS, 3)
    # the dim effect
    dim(frames, img, FPS, 2)
    # the first pic
    lightup(frames, importImage(frames, 'zju_1.jpeg', FPS, 2), FPS, 2)
    # dim with the second pic
    dim(frames, importImage(frames, 'zju_2.JPG', FPS, 2), FPS, 2)
    # lightup with the third pic
    lightup(frames, importImage(frames, 'zju_3.JPG', FPS, 2), FPS, 2)
    # dim with the fourth pic
    dim(frames, importImage(frames, 'zju_4.JPG', FPS, 2), FPS, 1)
    # the personal info
    person = importImage(frames, 'person.JPG', FPS, 2)
    name = drawText(frames, person.copy(), 'Name: Alex Hwang', (100, 150), 3, (255, 255, 0))
    drawText(frames, name, 'ID: 3180102081', (100, 250), 3, (255, 255, 0))

    # the lighten effect
    lighten(frames)

    # the cartoon
    background = background()
    temp = background.copy()
    face_1 = face_1(background)
    showImage(frames, face_1)
    drawText(frames, face_1.copy(), 'doing cv homework with c++...', fontSize=1)
    eyeMove(frames, background)

    drawText(frames, face_1.copy(), 'which is so slow', fontSize=1)
    drawText(frames, face_1.copy(), 'armed with python')

    face_2 = face_2(temp)
    handsmove(frames, face_2)

    # good bye
    noiseText(frames, 'GoodBye', FPS, 3)


    # the play of the video
    for img in frames:
        cv.imshow('my_work', img)
        img = img.astype(np.uint8)
        out.write(img)
        # press SPACE to pause
        if cv.waitKey(frameTime)&0xFF == ord(' '):
            if cv.waitKey(0)&0xFF == ord(' '):
                continue
    cv.destroyAllWindows()
