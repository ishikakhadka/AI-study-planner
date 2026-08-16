from rest_framework.routers import DefaultRouter
from django.urls import include, path
router=DefaultRouter()
from .views import StudyPlanView
router.register(r"study_plan",StudyPlanView);
urlpatterns = [
    path('', include(router.urls)),
]
