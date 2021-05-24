import numpy as np
from cv2 import VideoWriter, VideoWriter_fourcc
import cv2 as cv

# Standard imports
import cv2
import numpy as np 

# Read images
src = cv2.imread("../images/lena.png")
dst = cv2.imread("../images/zju_3.JPG")


src_mask = 255 * np.ones(src.shape, src.dtype)

# 这是 飞机 CENTER 所在的地方
center = (80,100)

# Clone seamlessly.
output = cv2.seamlessClone(src, dst, src_mask, center, cv2.NORMAL_CLONE)

cv.imshow('img', output)

