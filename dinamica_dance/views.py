#! /usr/bin/env python
# -*- coding: utf-8 -*-


from application.models import Groups, BonusClasses
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'index.html'

    beginners_str_code = 'beginners'
    intermediate_str_code = 'inter'
    advanced_str_code = 'advanced'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        all_groups = list(Groups.objects.select_related('level').filter(is_opened=True))

        context['beginners'] = filter(lambda g: g.level.string_code == self.beginners_str_code, all_groups)
        context['inters'] = filter(lambda g: g.level.string_code == self.intermediate_str_code, all_groups)
        context['advanced'] = filter(lambda g: g.level.string_code == self.advanced_str_code, all_groups)

        return context