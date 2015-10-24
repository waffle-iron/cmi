# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.models
# descripción: Modelos básicos del núcleo del CMI
#  __author__: toledano
#       fecha: oct 19, 2015

from .models import Pipol
from django.contrib.auth.models import Group
from rest_framework import serializers


class PipolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pipol
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
