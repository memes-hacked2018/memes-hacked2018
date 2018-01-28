from imgurpython import ImgurClient
from PIL import Image
import requests
from io import BytesIO
from numpy import array
import numpy as np


tagMap = [
    "y_u_no",
    "ugandan_knuckles",
    "none_of_my_business",
    "grumpy_cat",
    "scumbag_steve",
        "philosoraptor",
        "spooderman",
        "Joseph_Ducreux",
        "insanity_wolf",
        "success_kid",
        "awkward_penguin",
        "datboi",
        "high_guy",
       "clarinet_boy",
        "sad_frog",
        "harold",
        "conspiracy_keanu",
        "slowpoke",
        "advice_dog",
        "roll_safe",
        "lazy_college_senior",
        "spongegar",
        "unhelpful_teacher",
        "mocking_spongebob"]
    
def memeFinder():

    client_id = "96fbe8f3e6c8e9f"
    client_secret = "9610a5de8341e22a6f4f8e3d08fad2ea5571bb30"

    client = ImgurClient(client_id, client_secret)

    lastImage = ""

   

    imgArr = []
    typeArr = []
    
    for tagIndex in range(len(tagMap)):
        tagName = tagMap[tagIndex]
        tag = client.gallery_tag(tagName)
        for item in tag.items:
            try:
                for image in item.images:
                    lastImage = image["link"]
            except:
                lastImage = item.link

            if "mp4" in lastImage:
                continue

            print(lastImage)
            response = requests.get(lastImage)
            img = Image.open(BytesIO(response.content))
            img = img.resize((32,32))
            img = img.getdata()

            if (len(array(img).shape) < 2):
                continue
            if (array(img).shape[1] == 4):
                img = array(img)[:,:3]
            
            img = np.reshape(img, (32,32,3))
            img = np.transpose(img, (2, 0, 1))

            imgArr.append(img)
            
            typeArr.append(tagIndex)

    imgArr = array(imgArr)
    typeArr = array(typeArr)
   # arr = np.zeros(len(imgArr), len(typeArr), 3)
    
    newTypeArr = array([np.zeros(len(tagMap)) for i in range(len(typeArr))])
    
    for i in range(len(newTypeArr)):
        newTypeArr[i][typeArr[i]] = 1
    x = len(imgArr) 
    y = len(typeArr)
    print(len(imgArr), len(imgArr[0]))
    # imageBatch = np.zeros((x,y,z))
    # for i in range(x):
    #     for j in range(y):
    #         print(i)
    #         imageBatch[x][y] = imgArr[x][y]

    return (array(imgArr).reshape(-1, 3, 32, 32), array(newTypeArr).reshape(-1, len(tagMap)))