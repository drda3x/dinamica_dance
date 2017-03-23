from django import template
register = template.Library()

@register.filter
def in_list(val, *args):
    return val in args
