from django.shortcuts import render, redirect
from .models import Design, Review
from .forms import ReviewForm, ContactForm  # Ensure ContactForm is imported

def index(request):
    designs = Design.objects.all()  
    return render(request, "shop/index.html", {"designs": designs})  

def designs(request):
    designs = Design.objects.all()
    return render(request, "shop/designs.html", {"designs": designs})

def customer_reviews(request):
    reviews = Review.objects.filter(approved=True)  # Show only approved reviews

    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES)
        if form.is_valid():
            review = form.save(commit=False)
            review.approved = False  # Admin must approve manually
            review.save()
            return redirect('customer_reviews')
    else:
        form = ReviewForm()

    return render(request, 'shop/reviews.html', {"reviews": reviews, "form": form})

def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('contact')  # Redirect after submission
    else:
        form = ContactForm()

    return render(request, "shop/contact.html", {"form": form})
