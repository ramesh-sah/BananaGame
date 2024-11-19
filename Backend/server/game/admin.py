# game/admin.py

from django.contrib import admin
from .models import Game  # Import the Game model

# Register the Game model with the admin site
@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'actual_solution', 'user_solution')  # Fields to display in the list view
    search_fields = ('question','id',)  # Enable search by question field