from django.db import models

# Create your models here.
class Animal(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="animals/", blank=True, null=True)

    def __str__(self):
        return self.name
