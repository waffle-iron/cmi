# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.selializers
# descripción: Modelos básicos del núcleo del CMI
#  __author__: toledano
#       fecha: oct 19, 2015

from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import Pipol


class PipolSerial(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Pipol
        fields = ('id', 'email', 'username', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'rfc',
                  'entidad', 'sitio', 'puesto', 'orden',
                  'password', 'confirm_password')
        read_only_fields = ('created_at', 'updated_at', )

        def create(self, validated_data):
            return Pipol.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.username = validated_data.get(
                'username', instance.username)
            instance.email = validated_data.get('email', instance.email)

            instance.save()

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                instance.set_password(password)
                instance.save()

            update_session_auth_hash(self.context.get('request'), instance)

            return instance


class PipolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pipol
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
