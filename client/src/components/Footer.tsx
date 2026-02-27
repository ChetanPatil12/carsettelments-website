import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="/"
              className="mb-4 flex items-center gap-2 text-xl font-bold text-primary"
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
            <p className="text-sm text-muted-foreground">
              Auto Loan Exit Path™
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+14046047834"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                  data-testid="link-footer-phone"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +1 (404) 604-7834
                </a>
              </li>
              <li>
                <a
                  href="mailto:help@carsettlements.com"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                  data-testid="link-footer-email"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  help@carsettlements.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                United States
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="/privacy"
                  className="transition-colors hover:text-foreground"
                  data-testid="link-footer-privacy"
                >
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="transition-colors hover:text-foreground"
                  data-testid="link-footer-terms"
                >
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="transition-colors hover:text-foreground"
                  data-testid="link-footer-disclaimer"
                >
                  {t("footer.disclaimer")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mon - Fri: 8am - 8pm EST</li>
              <li>Sat: 9am - 5pm EST</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            {t("footer.legal")}
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} CarSettlements.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
