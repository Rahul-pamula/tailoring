from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Design, Review
from .forms import ReviewForm, ContactForm  # Ensure ContactForm is imported


def index(request):
    designs = Design.objects.all()
    return render(request, "shop/spa.html", {"designs": designs})


def designs(request):
    query = request.GET.get('q')
    if query:
        if query.isdigit():
            designs = Design.objects.filter(design_number=int(query))
        else:
            designs = Design.objects.filter(name__icontains=query)
    else:
        designs = Design.objects.all()
    return render(request, "shop/spa.html", {"designs": designs})


def customer_reviews(request):
    reviews = Review.objects.filter(
        approved=True)  # Show only approved reviews

    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES)
        if form.is_valid():
            review = form.save(commit=False)
            review.approved = False  # Admin must approve manually
            review.save()
            return redirect('customer_reviews')  # Redirect to refresh page
    else:
        form = ReviewForm()

    return render(request, 'shop/spa.html', {"reviews": reviews, "form": form})


def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('contact')  # Redirect after submission
    else:
        form = ContactForm()

    return render(request, "shop/spa.html", {"form": form})

# API Views


def api_designs(request):
    designs = Design.objects.all()
    data = []
    for design in designs:
        data.append({
            'id': design.id,
            'name': design.name,
            'price': str(design.price),
            'image': design.image.url if design.image else None,
        })
    return JsonResponse(data, safe=False)


def api_reviews(request):
    reviews = Review.objects.filter(approved=True)
    data = []
    for review in reviews:
        data.append({
            'id': review.id,
            'name': review.name,
            'review_text': review.review_text,
            'image': review.image.url if review.image else None,
            'created_at': review.created_at.isoformat(),
        })
    return JsonResponse(data, safe=False)
