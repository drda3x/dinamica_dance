#! /usr/bin/env python
# -*- coding: utf-8 -*-


from application.models import Groups as GroupsOrigin


class Groups(GroupsOrigin):
    months = [
        ('январь', 'января'),
        ('февраль', 'февраля'),
        ('март', 'марта'),
        ('апрель', 'апреля'),
        ('май', 'мая'),
        ('июнь', 'июня'),
        ('июль', 'июля'),
        ('август', 'августа'),
        ('сентябрь', 'сентября'),
        ('октябрь', 'октября'),
        ('ноябрь', 'ноября'),
        ('декабрь', 'декабря')
    ]

    @property
    def string_date(self):
        return "%d %d %d" % (
            self.start_date.day,
            self.months[self.start_date.month - 1][1],
            self.start_date.year
        )

    @property
    def end_time_repr(self):
        return str(self.end_time or '')[0:-3]

    class Meta:
        proxy = True
