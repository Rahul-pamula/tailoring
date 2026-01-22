from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth.models import Group, User
from .models import Design, DesignImage, Review

# Unregister default auth models
admin.site.unregister(Group)
admin.site.unregister(User)

# Customize Admin Site
admin.site.site_header = "RAJESHWARI TAILORING Admin"
admin.site.site_title = "Rajeshwari Tailoring Admin Panel"
admin.site.index_title = "Manage Designs and Reviews"
admin.site.site_url = "/shop/designs/"

class DesignImageInline(admin.TabularInline):
    model = DesignImage
    extra = 1
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 100px;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Preview"

@admin.register(Design)
class DesignAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'description')
    inlines = [DesignImageInline]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "category"),
            "description": "Enter the main details of the design."
        }),
        ("Pricing & Details", {
            "fields": ("price", "description"),
            "description": "Provide pricing and a detailed description."
        }),
    )

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'is_approved', 'created_at', 'image_preview')
    list_editable = ('is_approved',)
    list_filter = ('is_approved', 'rating', 'created_at')
    search_fields = ('name', 'message')
    readonly_fields = ['image_preview']

    fieldsets = (
        ("Review Content", {
            "fields": ("name", "rating", "message", "image", "image_preview"),
        }),
        ("Status", {
            "fields": ("is_approved",),
            "description": "Approve this review to make it visible on the website."
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 50px;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Image"

    actions = ['approve_reviews']

    @admin.action(description="Approve selected reviews")
    def approve_reviews(self, request, queryset):
        queryset.update(is_approved=True)
