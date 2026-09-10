from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework import viewsets

from .models import Resources
from resources.serializer import ResourceSerializer
from resources.models import FileVisibility
class ResourceViewSet(viewsets.ModelViewSet):
    queryset=Resources.objects.all()
    permission_classes=[IsAuthenticated]
    serializer_class=ResourceSerializer
    
    def list(self,request):
        try:
            resources=Resources.objects.filter(user=request.user)
            user_data=ResourceSerializer(resources)
            public_resource=Resources.objects.filter(file_visibility=FileVisibility.PUBLIC ).exclude(user=request.user   )
            public_data=ResourceSerializer(public_resource)
            return Response({
                "message":"Resources fetched successfully",
                "data":[
                    user_data.data,public_data.data
                ]
            })
        except Exception as e:
             raise APIException(f"Error fetching resources: {e}")  

                
    
    def create(self,request):
        try:
                serializer=self.serializer_class(data=request.data) 
                if serializer.is_valid():
                           serializer.save(user=request.user)
                           return Response({
                               "message":"Resources created successfully",
                               "data":serializer.data
                           })
                return Response(
                    serializer.errors,status=400
                )           
        except Exception as e:
            return APIException(f"Error creating resource:{e}")