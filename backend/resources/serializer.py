from rest_framework import serializers
from .models import Resources
class ResourceSerializer(serializers.ModeSerializer):
    class Meta:
        model=Resources
        fields="__all__"
        # read_only_fields = [
        #            "created_at",
        #             "updated_at",
        #         ]