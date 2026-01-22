from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Design, Review
from .serializers import DesignSerializer, ReviewSerializer

class DesignListAPI(generics.ListAPIView):
    queryset = Design.objects.all().prefetch_related('images')
    serializer_class = DesignSerializer
    filterset_fields = ['category']

class ReviewListCreateAPI(generics.ListCreateAPIView):
    queryset = Review.objects.filter(is_approved=True).order_by('-created_at')
    serializer_class = ReviewSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save(is_approved=False)
