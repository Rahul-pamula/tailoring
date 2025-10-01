from django.contrib import admin
from .models import Design, Contact, Review


@admin.register(Design)
class DesignAdmin(admin.ModelAdmin):
    list_display = ('design_number', 'name', 'price')
    search_fields = ('name', 'design_number')
    list_filter = ('price',)
    ordering = ('design_number',)


admin.site.register(Contact)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'approved', 'created_at')
    list_filter = ('approved',)
    search_fields = ('name', 'review_text')
    actions = ['approve_reviews']

    def approve_reviews(self, request, queryset):
        queryset.update(approved=True)
    approve_reviews.short_description = "Approve selected reviews"
