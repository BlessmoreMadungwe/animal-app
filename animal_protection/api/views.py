from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer, AnimalSerializer, ContactMessageSerializer
from .models import Animal, ContactMessage


# -------------------------
# User Registration
# -------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# -------------------------
# Animals API
# -------------------------
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    return Response(
        {
            "username": request.user.username,
            "tasks": Animal.objects.count(),
            "messages": ContactMessage.objects.count(),
            "notifications": 0,
        }
    )


# -------------------------
# Contact Form API
# -------------------------
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def send_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"success": "Message sent successfully!"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
