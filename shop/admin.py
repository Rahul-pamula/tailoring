from django.contrib import admin
from .models import Design  # Import your model
from .models import Contact

admin.site.register(Contact)

admin.site.register(Design)  # Register model
from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'approved', 'created_at')
    list_filter = ('approved',)
    search_fields = ('name', 'review_text')
    actions = ['approve_reviews']

    def approve_reviews(self, request, queryset):
        queryset.update(approved=True)
    approve_reviews.short_description = "Approve selected reviews"
