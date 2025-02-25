from django import forms
from .models import Review
from .models import Contact

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['name', 'review_text', 'image']

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']
