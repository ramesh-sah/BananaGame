import logging  # Import logging to enable logging of events
import requests  # Import requests to make HTTP requests
from rest_framework.views import APIView  # Import APIView for creating class-based views
from rest_framework.response import Response  # Import Response for returning HTTP responses
from rest_framework import status  # Import status for HTTP status codes
from django.shortcuts import get_object_or_404  # Import shortcut to get an object or return a 404 error
from .models import Game  # Import the Game model from the current app's models
from .serializers import GameSerializer  # Import the GameSerializer for serializing Game instances
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated 


# Set up logging for this module
logger = logging.getLogger(__name__)

class GameView(APIView):
    
    # authentication_classes=[TokenAuthentication]
    # permission_classes=[IsAuthenticated]
    # URL of the external API to fetch game data
    url = 'https://marcconrad.com/uob/banana/api.php'

    def get(self, request, pk=None):
        """
        Handle GET requests.
        If pk is None, fetch data from an external API and save it to the database.
        If pk is provided, retrieve the corresponding Game instance from the database.
        """
        
        if pk is None:
            try:
                # Make a GET request to the external API
                response = requests.get(self.url)
                response.raise_for_status()  # Raise an error for bad responses
                
                # Parse JSON data directly from the response
                data = response.json()  
                logger.debug("Received data: %s", data)  # Log the received data

                # Extract question and solution from the received data
                question = data.get("question")
                actual_solution = data.get("solution")

                # Log extracted values before attempting to save them
                logger.debug("Question: %s, Solution: %s", question, actual_solution)

                # Create and save a new Game object in the database
                game_instance = Game.objects.create(question=question, actual_solution=actual_solution)
                logger.info("Saved question: %s, solution: %s", question, actual_solution)
                
                # Prepare a response with details of the saved object
                saved_data = {
                    "id": game_instance.id,
                    "question": game_instance.question,
                    "solution": game_instance.actual_solution,
                    "obtain_result": game_instance.user_solution,
                    "user":game_instance.user,
                }
                
                return Response(saved_data, status=status.HTTP_201_CREATED)  # Return the saved data with a 201 status

            except requests.exceptions.RequestException as e:
                logger.error("Request failed: %s", str(e))  # Log any request-related errors
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # Return error response

            except Exception as e:
                logger.exception("An unexpected error occurred: %s", str(e))  # Log unexpected errors
                return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # If pk is provided, retrieve the Game instance based on the primary key (pk)
        game_instance = get_object_or_404(Game, id=pk)  # Fetch the game or return a 404 error if not found
        
        serializer = GameSerializer(game_instance)  # Serialize the retrieved Game instance
        return Response(serializer.data)  # Return serialized data as a response

    def patch(self, request, pk=None):
        """
        Handle PATCH requests to update an existing Game instance.
        Retrieve the instance based on pk and update it with provided data.
        """
        
        game_instance = get_object_or_404(Game, id=pk)  # Fetch the game instance or return a 404 error
        
        serializer = GameSerializer(game_instance, partial=True, data=request.data)  # Create serializer with partial updates
        
        if serializer.is_valid():  # Check if the provided data is valid
            serializer.save()  # Save updated instance to the database
            return Response({'msg': 'Data updated successfully'}, status=status.HTTP_200_OK)  # Return success message
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors if any

class GameHistory(APIView):
    def get(self, request):
        """
        Handle GET requests to retrieve all Game instances.
        """
        game_instances = Game.objects.all()  # Fetch all game instances
        
        serializer = GameSerializer(game_instances, many=True)  # Use many=True for multiple instances
        
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return serialized data with a 200 status