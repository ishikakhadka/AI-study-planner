from rest_framework import serializers
from .models import Resources
class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Resources
        fields="__all__"
        read_only_fields = [
                   "user",
                ]