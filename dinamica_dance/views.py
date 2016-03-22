#! /usr/bin/env python
# -*- coding: utf-8 -*-

import smtplib
from email.mime.multipart import MIMEMultipart
from email.header import Header
from email.mime.text import MIMEText
from datetime import datetime
from application.models import Groups, BonusClasses
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseServerError
from django.utils.timezone import get_default_timezone

class EmailNotifier(object):
    encoding = 'windows-1251'
    mail_from = 'report@dinamica.dance'
    mail_to = 'kudryavtsev-m@mail.ru'
    password = 'thisishustle'

    e_mail_types = [
        u'заказ звонка',
        u'запись на мастер-класс',
        u'заявка на запись в группу'
    ]

    def send_mail(self, **kwargs):
        try:
            text = self.get_test(**kwargs)

            if not text:
                raise ValueError('Wrong email type')

            msg = MIMEMultipart()
            msg['From'] = Header(self.mail_from, self.encoding)
            msg['To'] = Header(self.mail_to, self.encoding)
            msg['Subject'] = Header(kwargs['user_type'], self.encoding)

            msg_text = MIMEText(text.encode('cp1251'), 'plain', self.encoding)
            msg_text.set_charset(self.encoding)

            msg.attach(msg_text)

            s = smtplib.SMTP_SSL('smtp.yandex.ru', 465)
            s.login(self.mail_from, self.password)
            s.sendmail(self.mail_from, self.mail_to, msg.as_string())
            s.quit()

            return True

        except Exception:
            from traceback import format_exc; print format_exc()
            return False

    def get_test(self, **kwargs):
        if kwargs['user_type'].lower() == self.e_mail_types[0]:
            return u"""
            Добрый день!
            Поступила заявка на обратный звонок.

            ФИО: %s
            Телефон: %s

            С уважением,
            dinamica.dance
            """ % (kwargs['name'], kwargs['tel'])

        elif kwargs['user_type'].lower() == self.e_mail_types[1]:
            return u"""
            Добрый день!
            Поступила заявка на запись на мастер-класс %s.

            ФИО: %s
            Телефон: %s
            e-mail: %s

            С уважением,
            dinamica.dance
            """ % (kwargs['class_date'], kwargs['name'], kwargs['tel'], kwargs['email'])

        elif kwargs['user_type'].lower() == self.e_mail_types[2]:
            return u"""
            Добрый день!
            Поступила заявка на запись в группу.

            ФИО: %s
            Телефон: %s
            Группа: %s %s %s %s

            С уважением,
            dinamica.dance
            """ % (kwargs['name'], kwargs['phone'], kwargs['group_name'], kwargs['station'], kwargs['days'], kwargs['time'])

        else:
            return None


class IndexView(TemplateView):
    template_name = 'index.html'
    http_method_names = ('get', 'post')

    beginners_str_code = 'beginners'
    intermediate_str_code = 'inter'
    advanced_str_code = 'advanced'

    email = EmailNotifier()

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

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        def get_group_repr(group):
            return dict(
                id=group.id,
                name=group.name, # '%s-%s' % (group.dance.name.upper(), group.level.name.upper()),
                time='%s-%s' % (str(group.time)[0:5], str(group.end_time)[0:5]),
                days=map(lambda i, d: dict(marked=i in group.days_nums, repr=d), xrange(0, 7), ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']),
                metro=group.dance_hall.station.upper(),
                address=group.dance_hall.address
            )

        now = datetime.now(tz=get_default_timezone())
        all_groups = list(Groups.objects.select_related('level').filter(is_opened=True))

        try:
            bonus_class = BonusClasses.objects.select_related().filter(date__gt=now.date()).earliest('date')
        except BonusClasses.DoesNotExist:
            bonus_class = BonusClasses.objects.select_related().filter(date__lte=now.date()).latest('date')

        context['beginners'] = map(get_group_repr, filter(lambda g: g.level is not None and g.level.string_code == self.beginners_str_code, all_groups))
        context['inters'] = map(get_group_repr, filter(lambda g: g.level is not None and g.level.string_code == self.intermediate_str_code, all_groups))
        context['advanced'] = map(get_group_repr, filter(lambda g: g.level is not None and g.level.string_code == self.advanced_str_code, all_groups))
        context['other'] = map(get_group_repr, filter(lambda g: g.level is None or g.level.string_code not in [self.beginners_str_code, self.intermediate_str_code, self.advanced_str_code], all_groups))
        context['all_groups'] = context['beginners'] + context['inters'] + context['advanced'] + context['other']
        context['bonus_class'] = dict(
            date=bonus_class.date.strftime('%d.%m.%Y'),
            day=bonus_class.date.day,
            month=self.months[bonus_class.date.month - 1][0],
            month_2=self.months[bonus_class.date.month - 1][1],
            begin_time=bonus_class.time.strftime('%H:%M') if bonus_class.time else u'',
            end_time=bonus_class.end_time.strftime('%H:%M') if bonus_class.end_time else u'',
            hall_address=bonus_class.hall.address,
            metro_station=bonus_class.hall.station,
            time_from_metro=bonus_class.hall.time_to_come
        )

        return context

    def post(self, request):
        kw = {key: val for key, val in request.POST.iteritems()}
        if self.email.send_mail(**kw):
            return HttpResponse(200)

        else:
            return HttpResponseServerError()
