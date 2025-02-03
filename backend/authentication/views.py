from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.views.decorators.csrf import csrf_exempt

def add_cors_headers(response):
    """Helper function to add CORS headers to response"""
    response["Access-Control-Allow-Origin"] = "https://medigem.vercel.app"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Access-Control-Allow-Origin"
    response["Access-Control-Allow-Credentials"] = "true"
    return response

@csrf_exempt
@api_view(['GET', 'OPTIONS'])
def index(request):
    if request.method == "OPTIONS":
        response = Response(status=status.HTTP_200_OK)
        return add_cors_headers(response)
        
    response = Response({'message': 'medigem backend is running'})
    return add_cors_headers(response)

@csrf_exempt
@api_view(['POST', 'OPTIONS'])
def register(request):
    if request.method == "OPTIONS":
        response = Response(status=status.HTTP_200_OK)
        return add_cors_headers(response)

    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()
    email = request.data.get('email', '').strip()

    if not username or not password or not email:
        response = Response(
            {'error': 'All fields are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return add_cors_headers(response)

    try:
        validate_email(email)
    except ValidationError:
        response = Response(
            {'error': 'Invalid email format'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return add_cors_headers(response)

    if User.objects.filter(username=username).exists():
        response = Response(
            {'error': 'Username already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return add_cors_headers(response)

    user = User.objects.create_user(username=username, password=password, email=email)
    refresh = RefreshToken.for_user(user)

    response = Response({
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })
    return add_cors_headers(response)

@csrf_exempt
@api_view(['POST', 'OPTIONS'])
def login(request):
    if request.method == "OPTIONS":
        response = Response(status=status.HTTP_200_OK)
        return add_cors_headers(response)

    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()

    if not username or not password:
        response = Response(
            {'error': 'Username and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return add_cors_headers(response)

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        response = Response({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
        return add_cors_headers(response)
    else:
        response = Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )
        return add_cors_headers(response)