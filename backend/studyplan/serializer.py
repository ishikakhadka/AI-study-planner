from rest_framework import serializers

from .models import StudyPlan, Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task

        fields = [
            "id",
            "study_plan",
            "subject",
            "title",
            "description",
            "date",
            "start_time",
            "end_time",
            "status",
            "priority",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
           "created_at",
            "updated_at",
            "study_plan"
        ]
        
        


class StudyPlanSerializer(serializers.ModelSerializer):

    tasks = TaskSerializer(
        many=True,
        required=True
    )

    class Meta:
        model = StudyPlan

        fields = [
            "id",
            "title",
            "description",
            "start_date",
            "end_date",
            "daily_study_goal",
            "status",
            "tasks",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
           
        ]
        
    def create(self,validated_data):
        tasks=validated_data.pop("tasks",[])
        study_plan=StudyPlan.objects.create(**validated_data)
        for task in tasks:
            Task.objects.create(study_plan=study_plan,**task)
        return study_plan 
    
     
    def update(self, instance, validated_data):
        tasks_data = validated_data.pop("tasks", [])

        for field, value in validated_data.items():
           setattr(instance, field, value)

        instance.save()

        submitted_task_ids = {
        task.get("id")
        for task in tasks_data
        if task.get("id")
    }

        instance.tasks.exclude(
        id__in=submitted_task_ids
    ).delete()

        for task_data in tasks_data:

           task_id = task_data.get("id")

           if task_id:
              task_db = instance.tasks.get(id=task_id)

              for field, value in task_data.items():
                 if field != "id":
                    setattr(task_db, field, value)

              task_db.save()

           else:
              instance.tasks.create(**task_data)

        return instance  
   
        
            
                 