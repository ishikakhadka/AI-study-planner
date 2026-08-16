from django.db import models
from django.conf import settings


class StudyPlanStatus(models.TextChoices):
    ACTIVE = "ACTIVE", "Active"
    COMPLETED = "COMPLETED", "Completed"
    PAUSED = "PAUSED", "Paused"

class TaskStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    COMPLETED = "COMPLETED", "Completed"
    SKIPPED = "SKIPPED", "Skipped"


class TaskPriority(models.TextChoices):
    LOW = "LOW", "Low"
    MEDIUM = "MEDIUM", "Medium"
    HIGH = "HIGH", "High"

class StudyPlan(models.Model):
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="study_plans"
    )

    title = models.CharField(max_length=200)

    description = models.TextField(
        blank=True
    )

    start_date = models.DateField()

    end_date = models.DateField()

    daily_study_goal = models.PositiveIntegerField(
        help_text="Daily study goal in minutes"
    )

    status = models.CharField(
        max_length=20,
        choices=StudyPlanStatus.choices,
        default=StudyPlanStatus.ACTIVE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title

class Task(models.Model):
    study_plan=models.ForeignKey(StudyPlan,on_delete=models.CASCADE,related_name="tasks")
    date=models.DateField()
    start_time=models.TimeField()
    end_time=models.TimeField()
    description=models.CharField(max_length=255,blank=True,null=True)
    title = models.CharField(
        max_length=200
    )
    subject=models.CharField(max_length=200,blank=True,null=True)
    status=models.CharField(max_length=20,choices=TaskStatus.choices,default=TaskStatus.IN_PROGRESS)
    priority=models.CharField(max_length=20,choices=TaskPriority.choices,default=TaskPriority.HIGH)
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.subject} - {self.title}"