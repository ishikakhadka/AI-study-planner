from rest_framework.views import APIView
from users.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import permissions, status, viewsets
from .models import *
from .serializer import RegisterSerializer
from users.models import User
from .serializer import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import LogoutSerializer,ProfileSerializer

class RegisterView(APIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[permissions.AllowAny]
    
    def post(self,request):
        try:
            email=request.data.get("email")
            if User.objects.filter(email=email).exists():
                raise ValidationError({ "email": ["User with given email already exists."] })
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
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response(
                {
                    "message": "Login successful",
                    "access": str(access),
                    "refresh": str(refresh),
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
    
            
class LogoutView(APIView):
    permission_classess=[permissions.IsAuthenticated]
    serilaizer_class=LogoutSerializer   
    
    def post(self,request):
            serializer=self.serilaizer_class(data=request.data)
            if serializer.is_valid():
                 refresh_token=serializer.validated_data['refresh']
                 try:
                     token=RefreshToken(refresh_token)
                     token.blacklist()
                     return Response(
                     {
                        "message": "Logged out successfully."
                     },
                     status=status.HTTP_200_OK
                )
                 except Exception as e:
                     return Response(
                         {
                             "message":"Invalid Refresh token."
                            
                         },
                          status=status.HTTP_400_BAD_REQUEST,
                     )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)             
                
                

class ProfileView(viewsets.ViewSet):
    serializer_class=ProfileSerializer
    permission_classes=[permissions.IsAuthenticated]
    queryset=Profile.objects.all()
    
    @action(detail=False, methods=['post'], url_path='login_user')
    def get_auth_user(self,request):
        user=request.user
        return Response(
           { 
            "message":"Logged in user details!!",
            "username":user.username,
            "email":user.email
            }
        )
    def create(self, request):
    
      serializer = self.serializer_class(data=request.data)

      if serializer.is_valid():
        serializer.save(user=request.user)

        return Response(
            {
                "message": "Profile created successfully",
                "data": serializer.data
            }
        )

      return Response(serializer.errors, status=400)     
    