from django.db import models  # Import models from Django's ORM
from account.models import CustomUser
# Create your models here.


class Game(models.Model):
    """
    Model representing a game with a question, solution, and related metadata.
    """

    user=models.ForeignKey(CustomUser,related_name="user",on_delete=models.CASCADE,default=None,null=True)
    question = models.URLField()  # Field to store the URL associated with the game question
    actual_solution = models.IntegerField()  # Field to store the correct solution as an integer
    added_date = models.DateTimeField(auto_now=True)  # Automatically set the field to now when the object is created or updated
    user_solution = models.IntegerField(null=True, default=None)  # Allow null values  # Field to store the user's submitted solution
    

    def __str__(self):
        """
        String representation of the Game instance.
        Returns a combination of the question and user_solution for display purposes.
        """
        return f"{self.question} - User Solution: {self.user_solution} - User :{self.user}"  # Return the question and user_solution as a string
    
    