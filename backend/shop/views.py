from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.translation import gettext_lazy as _
from .models import Review, Design
from .forms import ReviewForm


def design_list(request):
    designs = Design.objects.all().prefetch_related('images')
    return render(request, 'shop/designs.html', {'designs': designs})
