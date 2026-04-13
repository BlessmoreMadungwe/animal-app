from django.contrib import admin
from django.utils.html import format_html
from .models import Animal, ContactMessage


# ---------------------------
# ANIMAL ADMIN
# ---------------------------
@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description_short", "image_preview")
    search_fields = ("name",)
    list_filter = ("name",)
    list_display_links = ("id", "name")

    # Shorten long descriptions in admin list
    def description_short(self, obj):
        return obj.description[:50] + "..." if obj.description and len(obj.description) > 50 else obj.description
    description_short.short_description = "Description"

    # Image preview
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="60" style="border-radius: 6px;" />',
                obj.image.url
            )
        return "No Image"
    image_preview.short_description = "Image"


# ---------------------------
# CONTACT MESSAGE ADMIN
# ---------------------------
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "message_short", "created_at")
    search_fields = ("name", "email")
    list_filter = ("created_at",)
    ordering = ("-created_at",)

    # Show only first 50 chars of the message
    def message_short(self, obj):
        return obj.message[:50] + "..." if len(obj.message) > 50 else obj.message
    message_short.short_description = "Message"
