from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import permissions, viewsets
from .serializer import StudyPlanSerializer
from .models import StudyPlan
from studyplan.models import Task
from users.models import User
from studyplan.serializer import TaskSerializer

class StudyPlanView(viewsets.ModelViewSet):
    serializer_class=StudyPlanSerializer
    permission_classes=[permissions.IsAuthenticated]
    queryset=StudyPlan.objects.all()
    
    def list(self, request):
        try:
          study_plans = StudyPlan.objects.filter(user=request.user)

          serializer = StudyPlanSerializer(study_plans, many=True)

          return Response({
            "message": "Study plans fetched successfully",
            "data": serializer.data,
        })

        except Exception as e:
           raise APIException(f"Error fetching study plans: {e}")  
    
    def create(self,request):
        try:
            serializer=self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save(
                user=request.user,
                )
                return Response({
                                 "message":"Study Plan created successfully",
                                 "data":serializer.data,
                             }) 
            return Response(serializer.errors,status=400)          
             
        except Exception as e:
            raise APIException(f"Error creating study plan:{e}")
        
   
    def retrieve(self,request,pk=None):
         try:
             study_plan=self.queryset.get(pk=pk)
            # task will be fetched on it own due to serializer
             serializer=self.serializer_class(study_plan)
             return Response({
                 "message":"Study plan retrieved successfully.",
                 "data":serializer.data
             })
         except Exception as e:
             return APIException(f"Error retrieving study_plan:{e}")   
         
    def update(self,request,pk=None):
        try:
            study_plan=self.queryset.get(pk=pk)
            
            
            serializer=self.serializer_class(study_plan,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "message":"Updated successfully",
                    "data":serializer.data
                    
                })
            return Response(
                serializer.errors,status=400
            )
        except Exception as e:
            raise APIException(f"Error updating data:{e}")  
        
      
    def destroy(self, request, pk=None):
        try:
         study_plan = self.queryset.get(pk=pk)

         study_plan.delete()

         return Response({
            "message": "Study plan deleted successfully."
        }, status=204)

        except StudyPlan.DoesNotExist:
          return Response({
            "error": "Study plan not found."
        }, status=404)

        except Exception as e:
          raise APIException(
            f"Error deleting study plan: {e}"
        )
          

    @action(
            details=True,
            action=["patch"],
            url="/tasks/complete"
                )
    def complete_task(self,request,pk=None):
        study_plan=self.get_object();
        task_ids=request.data.get("checkedTasks",[])
        if not task_ids:
            return Response({'message':"No tasks selected"},status=status.HTTP_400_BAD_REQUEST)
        tasks=study_plan.tasks.filter(id__in=task_ids)
        tasks.update(status="COMPLETED")     
        return Response(
            {
                "message": "Tasks updated successfully.",
                "updated_task_ids": list(
                    tasks.values_list("id", flat=True)
                )
            },
            status=status.HTTP_200_OK
        )   

        
    
   
        
        
              