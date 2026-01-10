import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function TopBar() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToForm = () => {
    const formSection = document.getElementById("lead-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a 
          href="/" 
          className="flex items-center gap-2 text-xl font-bold text-primary"
          data-testid="link-logo"
          aria-label="CarSettlements Home"
        >
          <svg 
            className="h-8 w-8" 
            viewBox="0 0 32 32" 
            fill="none" 
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="14" className="fill-primary" />
            <path 
              d="M8 18C8 18 10 14 16 14C22 14 24 18 24 18" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <circle cx="11" cy="20" r="2" fill="white" />
            <circle cx="21" cy="20" r="2" fill="white" />
          </svg>
          CarSettlements
        </a>

        <div className="flex items-center gap-2 md:gap-4">
          <div 
            className="flex rounded-lg border border-border p-0.5"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="button-lang-en"
              aria-pressed={language === "en"}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("es")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                language === "es"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="button-lang-es"
              aria-pressed={language === "es"}
            >
              ES
            </button>
          </div>

          <a
            href="tel:+18005550199"
            className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
            data-testid="link-phone"
            aria-label="Call us at 1-800-555-0199"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{t("nav.phone")}</span>
            <span className="font-semibold text-foreground">800-555-0199</span>
          </a>

          <Button 
            onClick={scrollToForm}
            className="hidden md:inline-flex"
            data-testid="button-nav-cta"
          >
            {t("nav.cta")}
          </Button>

          <a
            href="tel:+18005550199"
            className="flex items-center justify-center rounded-lg bg-primary p-2 text-primary-foreground md:hidden"
            data-testid="link-phone-mobile"
            aria-label="Call us"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
