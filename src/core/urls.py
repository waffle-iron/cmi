from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_nested import routers
from .views import PipolViewSet, Index

router = routers.SimpleRouter()
router.register(r'pipols', PipolViewSet)

urlpatterns = [

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(router.urls)),

    url(r'^.*$', Index.as_view(), name='index'),
]
