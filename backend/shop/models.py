from django.db import models

class Design(models.Model):
    CATEGORY_CHOICES = [
        ('Dress', 'Dress'),
        ('Blouse', 'Blouse'),
        ('Maggam', 'Maggam'),
    ]

    name = models.CharField(max_length=255, verbose_name="Design Name", help_text="Enter the name of the design (e.g., 'Royal Anarkali')")
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Price (₹)", help_text="Leave blank if price is 'On Request'")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, db_index=True, verbose_name="Category", help_text="Select the type of clothing")
    description = models.TextField(verbose_name="Description", help_text="Detailed description of the design")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")

    def __str__(self):
        return self.name

class DesignImage(models.Model):
    design = models.ForeignKey(Design, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='designs/', verbose_name="Image", help_text="Upload high-quality images")

    def __str__(self):
        return f"Image for {self.design.name}"

class Review(models.Model):
    """
    Model representing a customer review.
    Reviews are saved with is_approved=False by default.
    They must be approved by an admin before appearing on the site.
    """
    name = models.CharField(max_length=255, verbose_name="Customer Name")
    rating = models.IntegerField(verbose_name="Rating (1-5)", help_text="Star rating given by the customer")
    message = models.TextField(verbose_name="Review Message")
    image = models.ImageField(upload_to='reviews/', null=True, blank=True, verbose_name="Customer Photo", help_text="Optional photo uploaded by customer")
    
    # Approval field: Defaults to False so new reviews are hidden
    is_approved = models.BooleanField(default=False, db_index=True, verbose_name="Approved?", help_text="Check this box to show the review on the website")
    
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return f"Review by {self.name} ({self.rating}/5)"
