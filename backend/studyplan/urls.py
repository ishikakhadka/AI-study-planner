from rest_framework.routers import DefaultRouter
from django.urls import include, path
router=DefaultRouter()
from studyplan.views import TaskView
from .views import StudyPlanView
router.register(r"study_plan",StudyPlanView);
router.register(r"task",TaskView);
urlpatterns = [
    path('', include(router.urls)),
]
