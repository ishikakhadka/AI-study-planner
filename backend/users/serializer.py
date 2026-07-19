from rest_framework.serializers import ModelSerializer
from django.contrib.auth import authenticate
from .models import User,Profile
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
        # write_only_field=["password"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self,validated_data):
            user=User(
                username=validated_data["username"],
                email=validated_data["email"],
            )
            user.set_password(validated_data["password"])
            user.save()
            return user
            
      
      
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True) 
    
    
    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError(
                "Invalid username or password."
            )

        data["user"] = user
        return data           
       
       
class LogoutSerializer(serializers.Serializer):
    refresh=serializers.CharField()       
    
class ProfileSerializer(serializers.ModelSerializer):   
        class Meta:
            model=Profile
            fields=["user","university","semester","description","field","daily_study_goal","profile_picture"]
            read_only_fields=["user"]
        # def create(self,validated_data):
        #         profile=Profile(
        #             university=validated_data["university"],
        #             semester=validated_data["semester"],
        #             field=validated_data["field"],
        #             description=validated_data["description"],
        #             daily_study_goal=validated_data['daily_study_goal'],   
        #             profile_picture=validated_data["profile_picture"],
        #         ) 
        #         profile.save()
        #         return profile