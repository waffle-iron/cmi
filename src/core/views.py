# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.views
# descripción: Modelos básicos del núcleo del CMI
#  __author__: toledano
#       fecha: oct 24, 2015

import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView

from rest_framework import permissions, status, views, viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.response import Response

from .models import Pipol, Politica
from .permissions import IsPipolOwner
from .serializers import PipolSerializer, PoliticaSerializer, UserSerializer


class UserViewSets(viewsets.ModelViewSet):
    """
    Punto de contacto para la API que permite que los usuarios
    puedan verse y editarse.
    """
    queryset = Pipol.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        email = data.get('email', None)
        password = data.get('password', None)
        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = PipolSerializer(account)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'satus': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


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
            'message': 'No es posible crear al usuario con los datos recibidos'
        }, status=status.HTTP_400_BAD_REQUEST)


class Index(TemplateView):
    template_name = 'core/index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(Index, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        from datetime import date
        context = super(Index, self).get_context_data(**kwargs)
        context['hoy'] = date.today().strftime("%Y%m%d")
        return context


@api_view()
def actual(request):
    json = PoliticaSerializer(Politica.objects.latest())
    return JsonResponse(json.data)


class PoliticaActual(viewsets.ViewSetMixin, views.APIView):

    def get(self, request, *args, **kwargs):
        json = PoliticaSerializer(Politica.objects.latest())
        return JsonResponse(json)


class PoliticaViewSet(viewsets.ModelViewSet):
    queryset = Politica.objects.all()
    serializer_class = PoliticaSerializer
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly, )
