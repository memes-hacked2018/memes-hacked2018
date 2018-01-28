from django.utils.safestring import mark_safe
from django.template import Library

import json

def js(obj):
    return mark_safe(json.dumps(obj))