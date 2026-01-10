import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function StickyMobileCTA() {
  const { t } = useLanguage();

  const scrollToForm = () => {
    const formSection = document.getElementById("lead-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="flex gap-3">
        <a
          href="tel:+18005550199"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-muted"
          data-testid="link-sticky-call"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span>Call</span>
        </a>
        <Button
          onClick={scrollToForm}
          className="flex-[2] py-6 text-base font-semibold"
          data-testid="button-sticky-cta"
        >
          {t("sticky.cta")}
        </Button>
      </div>
    </div>
  );
}
