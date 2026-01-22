import { useState } from "react";
import { Star, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ReviewFormProps {
    onSuccess?: () => void;
}

const ReviewForm = ({ onSuccess }: ReviewFormProps) => {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget; // Capture reference
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMsg("");

        const formData = new FormData(form);
        formData.append("rating", rating.toString());

        try {
            const response = await fetch("https://rajeshwari-tailoring-backend.onrender.com/en/shop/api/reviews/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Failed to submit review");
            }

            setStatus("success");
            // Reset form
            form.reset();
            setRating(5);

            // Notify parent to refresh list if needed
            if (onSuccess) onSuccess();

        } catch (err: any) {
            console.error(err);
            setStatus("error");
            setErrorMsg(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "success") {
        return (
            <Card className="max-w-2xl mx-auto mb-12 border-green-200 bg-green-50/50">
                <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-green-800 mb-2">Thank You!</h3>
                    <p className="text-green-700">
                        Your review has been submitted successfully and will be visible after approval.
                    </p>
                    <Button
                        variant="outline"
                        className="mt-6 border-green-200 hover:bg-green-100 text-green-700"
                        onClick={() => setStatus("idle")}
                    >
                        Submit Another Review
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-2xl mx-auto mb-12 border-border shadow-sm">
            <CardHeader className="text-center pb-2">
                <CardTitle className="font-serif text-2xl">Write a Review</CardTitle>
                <CardDescription>Share your experience with us. Your feedback matters!</CardDescription>
            </CardHeader>
            <CardContent>
                {status === "error" && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMsg}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating Selection */}
                    <div className="flex flex-col items-center gap-2">
                        <Label>Your Rating</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="focus:outline-none transition-transform hover:scale-110"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <Star
                                        className={`h-8 w-8 transition-colors ${star <= (hoverRating || rating)
                                            ? "fill-primary text-primary"
                                            : "text-muted-foreground/30"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" name="name" placeholder="E.g. Priya Sharma" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Photo (Optional)</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Your Review</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your experience..."
                            required
                            className="min-h-[100px]"
                        />
                    </div>

                    <Button type="submit" className="w-full md:w-auto md:px-8 mx-auto block" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ReviewForm;
