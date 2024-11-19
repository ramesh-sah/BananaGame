# accounts/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class CustomUser(AbstractUser):
    """
    Custom user model that uses email as the unique identifier instead of username.
    """
    email = models.EmailField(unique=True)  # Email field must be unique
    first_name = models.CharField(max_length=30, blank=True)  # First name field
    last_name = models.CharField(max_length=30, blank=True)  # Last name field
    username = None  # Remove the username field

    USERNAME_FIELD = 'email'  # Specify that email is the unique identifier
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Required fields for createsuperuser

    objects = CustomUserManager()  # Use the custom manager
    
    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)  # Create a token for the newly created user

    def __str__(self):
        return self.email  # Return the email as string representation