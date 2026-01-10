import { useLanguage } from "@/contexts/LanguageContext";

const lenders = [
  "Ford Credit",
  "GM Financial",
  "Toyota Financial",
  "Ally Financial",
  "Chase Auto",
  "Capital One Auto",
  "Honda Financial",
  "Nissan Motor Acceptance",
  "Santander Consumer",
  "Wells Fargo Auto",
];

export function LendersSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-card py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("lenders.title")}
        </h2>

        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {lenders.map((lender, index) => (
              <div
                key={index}
                className="flex h-16 items-center justify-center rounded-lg border border-border bg-background px-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {lender}
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {t("lenders.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}
