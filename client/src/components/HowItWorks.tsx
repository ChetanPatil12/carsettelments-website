import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Map, Zap, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, titleKey: "howItWorks.step1.title", descKey: "howItWorks.step1.desc" },
  { icon: Map, titleKey: "howItWorks.step2.title", descKey: "howItWorks.step2.desc" },
  { icon: Zap, titleKey: "howItWorks.step3.title", descKey: "howItWorks.step3.desc" },
  { icon: TrendingUp, titleKey: "howItWorks.step4.title", descKey: "howItWorks.step4.desc" },
];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("howItWorks.title")}
        </h2>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                        <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                      </div>
                      <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(step.descKey)}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            {t("howItWorks.noGuarantees")}
          </p>
        </div>
      </div>
    </section>
  );
}
