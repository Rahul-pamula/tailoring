from rest_framework import serializers
from .models import Design, DesignImage, Review

class DesignImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignImage
        fields = ['id', 'image']

class DesignSerializer(serializers.ModelSerializer):
    images = DesignImageSerializer(many=True, read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Design
        fields = ['id', 'name', 'price', 'category', 'category_display', 'description', 'created_at', 'images']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'rating', 'message', 'image', 'created_at']
        read_only_fields = ['is_approved', 'created_at']
