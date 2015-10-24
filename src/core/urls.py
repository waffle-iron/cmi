from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from .views import PipolViewSet, GroupViewSet

router = routers.DefaultRouter()
router.register(r'users', PipolViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
]
