from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass 

class Profile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    university=models.CharField(max_length=255,blank=True, null=True)
    semester=models.IntegerField(blank=True, null=True)
    field=models.TextField(blank=True, null=True)
    description=models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True, null=True)
    daily_study_goal = models.PositiveIntegerField(default=2,help_text="Hours per day")
