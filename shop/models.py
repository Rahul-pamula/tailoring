from django.db import models
from cloudinary.models import CloudinaryField

class Design(models.Model):
    design_number = models.PositiveIntegerField(unique=True, null=True, blank=True)  # New unique number field
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = CloudinaryField('image')  # ✅ Stores images in Cloudinary

    def __str__(self):
        return f"{self.design_number} - {self.name}"

class Review(models.Model):
    name = models.CharField(max_length=100)
    review_text = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)  # ✅ Now using Cloudinary
    approved = models.BooleanField(default=False)  # Admin approval required
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({'Approved' if self.approved else 'Pending'})"

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
