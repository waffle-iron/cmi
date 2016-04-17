from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_nested import routers
from .views import (
    PipolViewSet,
    Index,
    UserViewSets,
    PoliticaActual,
    PoliticaViewSet,
    # actual
)

router = routers.DefaultRouter()
router.register(r'v1.0/pipols', PipolViewSet)
router.register(r'v1.0/users', UserViewSets)
router.register(r'v1.0/politica', PoliticaViewSet)
router.register(r'v1.0/actual', PoliticaActual, base_name='actual')

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    # url(r'^api/v1.0/actual/', actual, name='actual'),
    url(r'^api/', include(router.urls)),
    url(r'^$', Index.as_view(), name='index'),
]
