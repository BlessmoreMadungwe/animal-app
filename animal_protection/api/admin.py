from django.contrib import admin
from django.contrib import admin
from .models import Animal

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'image')
    search_fields = ('name',)
