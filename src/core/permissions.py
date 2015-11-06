# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.models
# descripción: Modelos básicos del núcleo del CMI
#  __author__: toledano
#       fecha: oct 19, 2015


from rest_framework import permissions


class IsPipolOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, account):
        if request.user:
            return account == request.user
        return False