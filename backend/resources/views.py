from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework import viewsets

from .models import Resources
from resources.serializer import ResourceSerializer
class ResourceViewSet(viewsets.ModelViewSet):
    queryset=Resources.objects.all()
    permission_classes=[IsAuthenticated]
    serializer_class=ResourceSerializer
    
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