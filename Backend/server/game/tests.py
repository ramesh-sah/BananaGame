from django.urls import reverse  # Import reverse to generate URLs
from rest_framework import status  # Import status codes
from rest_framework.test import APITestCase  # Import APITestCase for API testing
from .models import Game  # Import the Game model

class GameViewTests(APITestCase):
    """
    Test cases for the Game API views.
    """

    def setUp(self):
        """Create a Game instance for testing."""
        self.game = Game.objects.create(
            question='https://example.com/question',
            solution=42,
            obtain_result=1
        )
        self.url = reverse('game-detail', kwargs={'pk': self.game.id})  # URL for detail view

    def test_get_game_detail(self):
        """Test retrieving a game by ID."""
        response = self.client.get(self.url)  # Make a GET request to retrieve the game
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Check if response is OK
        self.assertEqual(response.data['question'], self.game.question)  # Check question field
        self.assertEqual(response.data['solution'], self.game.solution)  # Check solution field

    def test_patch_game(self):
        """Test updating an existing game via PATCH request."""
        data = {'solution': 99}  # New solution value
        response = self.client.patch(self.url, data, format='json')  # Make a PATCH request to update the game
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Check if update was successful
        self.game.refresh_from_db()  # Refresh from database to get updated values
        self.assertEqual(self.game.solution, 99)  # Verify that the solution has been updated
