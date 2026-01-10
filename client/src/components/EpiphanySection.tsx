import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";

export function EpiphanySection() {
  const { t } = useLanguage();

  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("epiphany.title")}
          </h2>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              t("epiphany.bullet1"),
              t("epiphany.bullet2"),
              t("epiphany.bullet3"),
            ].map((bullet, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm font-medium text-foreground md:text-base">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-lg">
              <svg
                viewBox="0 0 400 200"
                className="h-auto w-full"
                role="img"
                aria-label="Chart showing car value declining faster than loan balance"
              >
                <defs>
                  <linearGradient id="carValueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="loanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                
                <rect x="40" y="20" width="340" height="150" fill="none" stroke="hsl(var(--border))" strokeWidth="1" rx="4" />
                
                <line x1="40" y1="170" x2="380" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="40" y1="120" x2="380" y2="120" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4,4" />
                <line x1="40" y1="70" x2="380" y2="70" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4,4" />

                <path
                  d="M 50 40 Q 120 50, 200 90 T 370 150"
                  fill="none"
                  stroke="url(#carValueGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                <path
                  d="M 50 50 Q 150 55, 250 70 T 370 95"
                  fill="none"
                  stroke="url(#loanGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <circle cx="50" cy="40" r="5" fill="hsl(var(--destructive))" />
                <circle cx="370" cy="150" r="5" fill="hsl(var(--destructive))" />
                <circle cx="50" cy="50" r="5" fill="hsl(var(--primary))" />
                <circle cx="370" cy="95" r="5" fill="hsl(var(--primary))" />

                <rect x="220" y="30" width="150" height="55" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                <circle cx="235" cy="48" r="6" fill="hsl(var(--destructive))" />
                <text x="248" y="52" fill="hsl(var(--foreground))" fontSize="11" fontWeight="500">
                  {t("epiphany.chartLabel.carValue")}
                </text>
                <circle cx="235" cy="68" r="6" fill="hsl(var(--primary))" />
                <text x="248" y="72" fill="hsl(var(--foreground))" fontSize="11" fontWeight="500">
                  {t("epiphany.chartLabel.loanBalance")}
                </text>

                <text x="50" y="190" fill="hsl(var(--muted-foreground))" fontSize="10">Year 1</text>
                <text x="200" y="190" fill="hsl(var(--muted-foreground))" fontSize="10">Year 3</text>
                <text x="350" y="190" fill="hsl(var(--muted-foreground))" fontSize="10">Year 5</text>
              </svg>
            </div>
          </div>

          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center dark:border-accent/50 dark:bg-accent/10">
            <p className="text-base font-medium text-foreground md:text-lg">
              {t("epiphany.bridge")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
