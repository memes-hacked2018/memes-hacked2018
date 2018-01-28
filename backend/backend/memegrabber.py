from imgurpython import ImgurClient
from PIL import Image
import requests
from io import BytesIO
from numpy import array

client_id = "96fbe8f3e6c8e9f"
client_secret = "9610a5de8341e22a6f4f8e3d08fad2ea5571bb30"

client = ImgurClient(client_id, client_secret)

lastImage = ""

tagMap = [
    "y_u_no",
    "ugandan_knuckles",
    "none_of_my_business",
    "grumpy_cat",
    "good_guy_greg",
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
    "mocking_spongebob"
]

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
        imgArr.append(img)
        typeArr.append(tagIndex)

imgArr = array(imgArr)
typeArr = array(typeArr)
