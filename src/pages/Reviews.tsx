import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReviewForm from "@/components/ReviewForm";

// Interface for API response
interface Review {
  id: number;
  name: string;
  rating: number;
  message: string;
  image: string | null;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await fetch('https://rajeshwari-tailoring-backend.onrender.com/en/shop/api/reviews/');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/50 to-background">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 animate-fade-in">
            Customer Reviews
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with us.
          </p>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-8 container px-4">
        <ReviewForm onSuccess={fetchReviews} />
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-primary">25+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <p className="text-3xl md:text-4xl font-serif font-bold text-primary">4.9</p>
                <Star className="h-6 w-6 fill-primary text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 md:py-20">
        <div className="container px-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-lg font-serif">No reviews yet.</p>
              <p className="text-muted-foreground">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="group hover:shadow-lg transition-shadow duration-300 border-border"
                >
                  <CardContent className="p-6">
                    {/* Quote Icon */}
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 break-words">
                      "{review.message}"
                    </p>

                    {/* Image if exists */}
                    {review.image && (
                      <div className="mb-6 rounded-md overflow-hidden h-40 bg-muted">
                        <img
                          src={review.image}
                          alt="Customer photo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {getInitials(review.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {review.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
            We'd Love to Hear From You
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Your feedback helps us improve. Visit us today and experience our exceptional service firsthand!
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
