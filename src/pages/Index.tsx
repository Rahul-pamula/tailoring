import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/30 to-secondary/50" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
              {t.heroTitle1}
              <span className="block text-primary">{t.heroTitle2}</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button asChild size="lg" className="group text-base px-8 py-6">
                <Link to="/designs">
                  {t.viewDesigns}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-card">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
              {t.aboutTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.aboutText}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {t.masterCraftsmanship}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t.masterDesc}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {t.personalAttention}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t.personalDesc}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {t.premiumQuality}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t.premiumDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              {t.ourServices}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.servicesDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[t.customTailoring, t.bridalWear, t.blouseStitching, t.maggamWork].map((service) => (
              <div
                key={service}
                className="group relative aspect-square rounded-lg overflow-hidden bg-secondary"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="font-serif text-lg text-background font-medium">
                    {service}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Index;
