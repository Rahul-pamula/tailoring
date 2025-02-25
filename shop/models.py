from django.db import models



class Design(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='designs/')

class Review(models.Model):
    name = models.CharField(max_length=100)
    review_text = models.TextField()
    image = models.ImageField(upload_to='reviews/', blank=True, null=True)
    approved = models.BooleanField(default=False)  # Admin approval required
    created_at = models.DateTimeField(auto_now_add=True)
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return self.name
