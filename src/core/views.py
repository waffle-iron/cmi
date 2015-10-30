# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.views
# descripción: Modelos básicos del núcleo del CMI
#  __author__: toledano
#       fecha: oct 24, 2015

from rest_framework import permissions, viewsets

from core.models import Pipol
from core.permissions import IsPipolOwner
from core.serializers import PipolSerializer


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

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'No es posible crear al usuario con los datos recibidos.'
        }, status=status.HTTP_400_BAD_REQUEST)
