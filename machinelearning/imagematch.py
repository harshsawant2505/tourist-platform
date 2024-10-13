import numpy as np
import cv2
from tensorflow.keras.applications import VGG16
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input
from scipy.spatial.distance import cosine
vgg_model = VGG16(weights='imagenet', include_top=False, pooling='avg')


def extract_vgg16_features(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    features = vgg_model.predict(img_array)
    return features.flatten()

def calculate_histogram(img_path):
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([img], [0, 1], None, [8, 8], [0, 180, 0, 256])
    cv2.normalize(hist, hist)
    return hist.flatten()


img_path1 = '/content/one.jpg'
img_path2 = '/content/one.jpg'

vgg_features1 = extract_vgg16_features(img_path1)
vgg_features2 = extract_vgg16_features(img_path2)
hist_features1 = calculate_histogram(img_path1)
hist_features2 = calculate_histogram(img_path2)
combined_features1 = np.concatenate((vgg_features1, hist_features1))
combined_features2 = np.concatenate((vgg_features2, hist_features2))
similarity = 1 - cosine(combined_features1, combined_features2)
print(f"Combined Features Cosine Similarity: {similarity}")
