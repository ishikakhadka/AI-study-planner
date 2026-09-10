from rest_framework.routers import DefaultRouter
from django.urls import include, path
router=DefaultRouter()
from resources.views import ResourceViewSet

router.register(r"resources",ResourceViewSet);
urlpatterns = [
    path('', include(router.urls)),
]
