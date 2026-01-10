import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, TrendingDown, Calendar, DollarSign } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();

  const scrollToForm = () => {
    const formSection = document.getElementById("lead-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20 lg:py-24" data-testid="section-hero">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent-foreground dark:border-accent/50 dark:bg-accent/20 dark:text-accent" data-testid="badge-mechanism">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>Auto Loan Exit Path™</span>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-semibold text-accent md:text-xl" data-testid="text-big-domino">
                {t("hero.bigDomino")}
              </p>
              
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl" data-testid="text-headline">
                {t("hero.headline")}
              </h1>
              
              <p className="max-w-xl text-lg text-muted-foreground md:text-xl" data-testid="text-subheadline">
                {t("hero.subheadline")}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="px-8 py-6 text-lg font-semibold shadow-lg transition-all hover:shadow-xl"
                data-testid="button-hero-cta"
              >
                {t("hero.cta")}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground" data-testid="text-disclaimer">
              {t("hero.disclaimer")}
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <Card className="w-full max-w-md overflow-hidden border-2 border-card-border bg-card shadow-xl" data-testid="card-story">
              <div className="bg-primary/10 px-6 py-4 dark:bg-primary/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground" data-testid="avatar-story">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="text-story-name">{t("storyCard.name")}</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-story-state">{t("storyCard.state")}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground" data-testid="badge-story-label">
                    {t("storyCard.title")}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" aria-hidden="true" />
                      {t("storyCard.balance")}
                    </div>
                    <p className="text-xl font-bold text-foreground" data-testid="text-story-balance">$28,500</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {t("storyCard.payment")}
                    </div>
                    <p className="text-xl font-bold text-foreground" data-testid="text-story-payment">$625/mo</p>
                  </div>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 rounded-lg bg-accent/10 p-3 dark:bg-accent/20">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3" aria-hidden="true" />
                      {t("storyCard.reduction")}
                    </div>
                    <p className="text-xl font-bold text-accent" data-testid="text-story-reduction">25-40%</p>
                  </div>
                  <div className="space-y-1 rounded-lg bg-primary/10 p-3 dark:bg-primary/20">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {t("storyCard.timeline")}
                    </div>
                    <p className="text-xl font-bold text-primary" data-testid="text-story-timeline">12-48 {t("storyCard.months")}</p>
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  {t("storyCard.disclaimer")}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
