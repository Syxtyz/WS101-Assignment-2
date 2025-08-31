# from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json
# from .models import User

# # Create your views here.

# @csrf_exempt
# def register_User(request):
#     if request.method == 'POST':
#         data = json.loads(request.body.decode("utf-8"))
#         email = data.get("email")
#         password = data.get("password")

#         if User.objects.filter(email=email).exists():
#             return JsonResponse({"error": "Email already registered"}, status=400)

#         hashed_password = make_password(password)

#         user = User.objects.create(email=email, password=hashed_password)
        
#         return JsonResponse({"message": "User registered successfully", "id": user.id})
    
#     return JsonResponse({"error": "Invalid request"}, status=400)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import UserSerializer
from django.contrib.auth.hashers import check_password

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializedData = UserSerializer(users, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_user(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user(request, pk):
    try :
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)