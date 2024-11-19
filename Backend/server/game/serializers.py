from rest_framework import serializers  # Import serializers from Django REST Framework
from .models import Game  # Import the Game model from the current app's models
from account.serializers import CustomUserSerializer  # Import the CustomUserSerializer

class GameSerializer(serializers.ModelSerializer):
    """
    Serializer for the Game model.
    
    This serializer handles the conversion of Game model instances 
    to and from JSON format, allowing for easy data exchange 
    between the API and the client.
    """
    
    user = CustomUserSerializer(read_only=True)  # Include user data in the serialization

    class Meta:
        model = Game  # Specify the model that this serializer is linked to
        fields = "__all__"  # List of fields to include in serialization

        # Optionally, you can add additional configuration here, such as read_only_fields or extra_kwargs
        # Example: read_only_fields = ['user']