import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt

# drat the points accoding to the R
def drawPoints(img, points):
    color = (255, 0, 0)
    H, W = img.shape[:2]
    for x in range(H):
        for y in range(W):
            if points[x, y] > 0:
                cv.circle(img, (y, x), 1, color, 2)

# scale the image to 0-1
def scale01(img):
    return (img - np.min(img))/(np.max(img) - np.min(img))

# used to suppress the points which are not the local maximum
def suppressing(R, thres):
    H, W = R.shape
    points = np.zeros_like(R, dtype=np.uint8)
    for y in range(H):
        for x in range(W):
            x1 = max(x-2, 0)
            x2 = min(x+2, W-1)
            y1 = max(y-2, 0)
            y2 = min(y+2, H-1)

            if np.max(points[y1:y2, x1:x2]) == points[y, x] and R[y, x] > thres:
                points[y, x] = 255
    return points

# the function of harris corner detector
def harris(img):
    img = img.astype(np.float32)
    Ix = cv.Sobel(img, cv.CV_16S, 1, 0)
    Iy = cv.Sobel(img, cv.CV_16S, 0, 1)

    # compute the gradient
    Ix2 = Ix * Ix
    Iy2 = Iy * Iy
    Ixy = Ix * Iy

    # a Gaussian filter of 3*3 kernel size
    ksize = (3, 3)
    Sx2 = cv.GaussianBlur(Ix2, ksize, 2)
    Sy2 = cv.GaussianBlur(Iy2, ksize, 2)
    Sxy = cv.GaussianBlur(Ixy, ksize, 2)

    # set the k which is 0.04-0.06
    k = 0.04
    # max lambda
    MaxLambda = np.zeros_like(img, dtype=np.float32)
    # min lambda
    MinLambda = np.zeros_like(img, dtype=np.float32)
    
    # compute the R pixel by pixel
    R = np.zeros_like(img, dtype=np.float32)
    for x in range(img.shape[0]):
        for y in range(img.shape[1]):
            H = np.array([[Sx2[x, y], Sxy[x, y]], [Sxy[x, y], Sy2[x, y]]])
            R[x, y] = np.linalg.det(H) - k*H.trace()**2
            eValue, _ = np.linalg.eig(H)
            MaxLambda[x][y] = max(eValue[0], eValue[1])
            MinLambda[x][y] = min(eValue[0], eValue[1])
    
    # normalize the R
    R = (R/np.linalg.norm(R)) * 255
    R_max = np.max(R)
    # set the threshold
    thres = 0.085 * R_max
    points = suppressing(R, thres)


    MaxLambda = (MaxLambda/np.linalg.norm(MaxLambda)) * 255
    MinLambda = (MinLambda/np.linalg.norm(MinLambda)) * 255
    # return the result
    return points, R, MaxLambda, MinLambda


# testing area
if __name__ == "__main__":
    img = cv.imread("../images/test.png", 0)
    img = np.array(img, dtype=np.float32) / 255
    img, edges, points, R = harris(img)
    fig, axes = plt.subplots(2,3,figsize=(10,8))
    plt.axis('off')
    axes[0, 0].imshow(img, cmap="gray")
    axes[0, 0].set_title('Source image')
    axes[0, 1].imshow(points, cmap="gray")
    axes[0, 1].set_title('points')
    axes[0, 2].imshow(edges, cmap="gray")
    axes[0, 2].set_title('edges')
    axes[1, 0].imshow(suppressing(points), cmap="gray")
    axes[1, 0].set_title('suppressed points')
    
    plt.show()
