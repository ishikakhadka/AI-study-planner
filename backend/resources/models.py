from django.db import models
from django.forms import CharField
from django.conf import settings

class FileType(models.TextChoices):
    IMAGE = "IMAGE", "Image"
    VIDEO = "VIDEO", "Video"
    DOCUMENT = "DOCUMENT", "Document"


class FileVisibility(models.TextChoices):
    PUBLIC = "PUBLIC", "Public"
    PRIVATE = "PRIVATE", "Private"
class Resources(models.Model):
    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
            related_name="resources",
        )
    
    title = models.CharField(max_length=200)

    description = models.TextField(
        max_length=200,
        blank=True,
        null=True
    )

    file_type = models.CharField(
        max_length=50,
        choices=FileType.choices
    )

    file_visibility = models.CharField(
        max_length=50,
        choices=FileVisibility.choices
    )

    file = models.FileField(
        upload_to="resources/"
    )