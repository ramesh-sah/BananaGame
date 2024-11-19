# accounts/managers.py

from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    """
    Custom manager for CustomUser.
    """

    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        """
        Create and return a user with an email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)  # Normalize the email address
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)  # Create a new user instance
        user.set_password(password)  # Hash and set the user's password
        user.save(using=self._db)  # Save the user instance
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        """
        Create and return a superuser with an email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, first_name, last_name, password=password, **extra_fields)