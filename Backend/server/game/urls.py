
from django.urls import path
from .views import GameHistory, GameView
urlpatterns = [
    path('game/',GameView.as_view(),name='game'),
    path('game/<int:pk>/', GameView.as_view(), name='game-detail'),  # Use <path:question> to handle URL characters
    path('game/history/',GameHistory.as_view(),name="game-history")
    
]

