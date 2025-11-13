from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Animal

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

# class AnimalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Animal
#         fields = "__all__"

class AnimalSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Animal
        fields = ['id', 'name', 'image']