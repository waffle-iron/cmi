from django.conf.urls import include, url, patterns
# from django.contrib import admin

from rest_framework_nested import routers
from .views import PipolViewSet, Index, UserViewSets

router = routers.SimpleRouter()
router.register(r'pipols', PipolViewSet)
router.register(r'users', UserViewSets)

<<<<<<< HEAD
urlpatterns = [

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
=======
urlpatterns = patterns(
    '',
>>>>>>> feature/authentication.service
    url(r'^api/v1/', include(router.urls)),
    url(r'^.*$', Index.as_view(), name='index'),
)


#     [
#
#     url(r'^admin/', include(admin.site.urls)),
#     url(r'^api/v1/', include(router.urls)),
#
#     url(r'^.*$', Index.as_view(), name='index'),
# ]
