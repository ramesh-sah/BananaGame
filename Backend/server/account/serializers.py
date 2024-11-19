# accounts/serializers.py

from rest_framework import serializers  
from .models import CustomUser  
from rest_framework.authtoken.models import Token  

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model.
    """

    class Meta:
        model = CustomUser  
        fields = ['id', 'email', 'first_name', 'last_name', 'password']  
        extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is write-only
        }

    def create(self, validated_data):
        """
        Create and return a new user instance using validated data.
        """
        # Ensure 'first_name' and 'last_name' are present in validated_data
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')

        if not first_name or not last_name:
            raise serializers.ValidationError("First name and last name are required.")

        user = CustomUser(
            email=validated_data['email'],
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()  # Save the user instance
        
        # Automatically create a token via signal, then retrieve it
        token, created = Token.objects.get_or_create(user=user)

        return {
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            'token': token.key  # Return the token key
        }

    def update(self, instance, validated_data):
        """
        Update and return an existing user instance.
        """
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)  # Hash the new password if provided
            else:
                setattr(instance, attr, value)  # Update other fields
        instance.save()  # Save the updated instance
        return instance