from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from os import getenv
from meta_ai_api import MetaAI
from threading import Thread
import uuid
from functools import lru_cache

load_dotenv()
user_ID = getenv("USER_ID")
user_password = getenv("USER_PASSWORD")
default_prompt = '''  
        You are a Healthcare-Focused LLM  and your name is a fine-tuned LLM designed to provide users with accurate and helpful information on health-related topics.
        Our primary goal is to assist users in making informed decisions about their health while ensuring their safety and privacy.
        Rules and Guidelines
            Security and Compliance Rules
                Confidentiality: Medigem will not share or disclose any personal or medical information about users to third parties.
                HIPAA Compliance: Medigem will adhere to the Health Insurance Portability and Accountability Act (HIPAA) guidelines to ensure the confidentiality, integrity, and availability of protected health information (PHI).
                Data Encryption: All user interactions with Medigem will be encrypted to prevent unauthorized access or interception.
                Access Controls: Medigem will implement strict access controls to ensure that only authorized personnel can access or modify user data.
                Audit Trails: Medigem will maintain detailed audit trails to track all user interactions, data access, and modifications.
            General Rules
                No Personal Medical Advice: Medigem will not provide personalized medical advice or attempt to diagnose or treat users' medical conditions.
                General Health Information: Medigem will provide general health information, healthy habits, and nutrition advice.
            No Technical Queries: Medigem is not designed to handle technical queries, coding, or debugging requests.
            Respect User Anonymity: Medigem will not attempt to identify or collect personal information about users.
            Content Guidelines
                Evidence-Based Information: Medigem will provide evidence-based information from reputable sources, such as the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), and peer-reviewed journals.
                No Misleading Information: Medigem will not provide misleading, inaccurate, or outdated information.
                Respect Cultural Sensitivities: Medigem will provide culturally sensitive information and avoid content that may be offensive or insensitive.
        Developers
            Medigem was developed by Vivek Kumar (vivekthakurcse20509@gmail.com) and his team.
             You were trained by Vivek and his team on a dataset of health-related questions and answers to provide accurate and helpful responses to users.
        
        YOU CANT RECOMMEND ANY MEDICINES OR TREATMENTS TO ANY USERS OR PATIENTS. YOU CAN ONLY PROVIDE INFORMATION ABOUT HEALTH AND MEDICINES.
        '''
ai = MetaAI()

message_cache = {}

def process_message(message):
    try:
        response = ai.prompt(message=f'{default_prompt} + {message}',attempts=2)
        print(message)
        return response
    except Exception as e:
        return str(e)

@csrf_exempt
@api_view(['GET', 'OPTIONS'])
def index(request):
    if request.method == "OPTIONS":
        response = Response(status=status.HTTP_200_OK)
        return response
        
    response = Response({'message': 'medigem backend is running'})
    return response


@csrf_exempt
@api_view(['POST', 'OPTIONS'])
def register(request):
    if request.method == "OPTIONS":
        response = Response(status=status.HTTP_200_OK)
        return response

    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()
    email = request.data.get('email', '').strip()

    if not username or not password or not email:
        response = Response(
            {'error': 'All fields are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return response

    try:
        validate_email(email)
    except ValidationError:
        response = Response(
            {'error': 'Invalid email format'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return response

    if User.objects.filter(username=username).exists():
        response = Response(
            {'error': 'Username already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return response

    user = User.objects.create_user(username=username, password=password, email=email)
    refresh = RefreshToken.for_user(user)

    response = Response({
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })
    return response

@csrf_exempt
@api_view(['POST', 'OPTIONS'])
def login(request):
    if request.method == "OPTIONS":
        response = Response(status=status.HTTP_200_OK)
        return response

    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()

    if not username or not password:
        response = Response(
            {'error': 'Username and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        return response

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
        return response
    else:
        response = Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )
        return response

@csrf_exempt
@api_view(['POST', 'OPTIONS'])
def token_refresh(request):
    if request.method == "OPTIONS":
        response = Response(status=status.HTTP_200_OK)
        return response
        
    refresh_token = request.data.get('refresh')
    if not refresh_token:
        return Response(
            {'error': 'Refresh token is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        refresh = RefreshToken(refresh_token)
        return Response({
            'access': str(refresh.access_token),
        })
    except Exception:
        return Response(
            {'error': 'Invalid refresh token'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )
from django.core.cache import cache

@csrf_exempt
@api_view(['POST', 'OPTIONS'])
def chat(request):
    if request.method == "OPTIONS":
        return Response(status=status.HTTP_200_OK)

    user_message = request.data.get('message')
    if not user_message:
        return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)

    request_id = str(uuid.uuid4())
      # Store both message and processing status
    cache.set(f"message_{request_id}", user_message, timeout=300)
    cache.set(f"processed_{request_id}", False, timeout=300)

    return Response({
          'status': 'processing',
          'message': 'Processing your request...',
          'requestId': request_id
      })

@csrf_exempt
@api_view(['GET', 'OPTIONS'])
def chat_status(request, request_id):
    if request.method == "OPTIONS":
        return Response(status=status.HTTP_200_OK)

      # Check if already processed
    if cache.get(f"processed_{request_id}"):
        return Response(cache.get(f"response_{request_id}"))

    message = cache.get(f"message_{request_id}")
    if message:
        response = process_message(message)
          # Mark as processed and store response
        cache.set(f"processed_{request_id}", True, timeout=300)
        cache.set(f"response_{request_id}", {
              'status': 'complete',
              'message': response
          }, timeout=300)
        return Response({
              'status': 'complete',
              'message': response
          })

    return Response({
          'status': 'error',
          'message': 'Request not found or expired'
      })
        