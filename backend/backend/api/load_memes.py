from models import Meme, Tag

import os

import django

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

    django.setup()

def add_meme(url):
    print("Fml")