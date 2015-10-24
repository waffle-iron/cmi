# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.views
# descripción: Modelos básicos del núcleo del CMI
#  __author__: toledano
#       fecha: oct 24, 2015

from django.contrib.auth.models import Group, User

from rest_framework import viewsets

from .models import Pipol
from .serializers import GroupSerializer, PipolSerializer


class PipolViewSet(viewsets.ModelViewSet):
    """
    Punto de acceso API que permite ver y editar usuarios.
    """
    queryset = Pipol.objects.all().order_by('-date_joined')
    serializer_class = PipolSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    Punto de acceso API que permite ver y editar grupos.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
