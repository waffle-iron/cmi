# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.views
# descripción: Modelos básicos del núcleo del CMI
#  __author__: toledano
#       fecha: oct 24, 2015

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView

from rest_framework import permissions, viewsets
from rest_framework import status, views
from rest_framework.response import Response

from .models import Pipol
from .permissions import IsPipolOwner
from .serializers import PipolSerializer


class PipolViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Pipol.objects.all()
    serializer_class = PipolSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsPipolOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Pipol.objects.create_user(**serializer.validated_data)

            return Response(
                serializer.validated_data,
                status=status.HTTP_201_CREATED
            )

        return Response({
            'status': 'Bad request',
            'message': 'No es posible crear al usuario con los datos recibidos.'
        }, status=status.HTTP_400_BAD_REQUEST)


class Index(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(Index, self).dispatch(*args, **kwargs)
