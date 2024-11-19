from django.contrib import admin
from .models import CustomUser
# Register your models here.
@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email','password')  # Fields to display in the list view
    search_fields = ('first_name','email')  # Enable search by question field