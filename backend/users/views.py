from rest_framework.views import APIView
from users.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializer import RegisterSerializer
from users.models import User
from .serializer import LoginSerializer

class RegisterView(APIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[permissions.AllowAny]
    
    def post(self,request):
        try:
            email=request.data.get("email")
            if User.objects.filter(email=email).exists():
                raise ValidationError('{email:User with given email already exists.}')
            serializer=self.serializer_class(data=request.data)
            if (serializer.is_valid()):
                serializer.save()
                return Response (serializer.data)
            return Response(serializer.errors,status=400)  
        except ValidationError :
            raise
        except Exception as e:
            raise Exception(f"Error creating user:{str(e)}")


class LoginView(APIView):
    
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.validated_data["user"]

            return Response(
                {
                    "message": "Login successful",
                    "username": user.username,
                    "email": user.email,
                },
                status=status.HTTP_200_OK,
            )
            
        print(serializer.errors)
  
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
    
            
        
    
    


