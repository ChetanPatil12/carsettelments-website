import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Lock, BadgeCheck } from "lucide-react";

export function TrustSignals() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <Lock className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground">{t("trust.secure")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">256-bit SSL Encryption</p>
            </div>

            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground">{t("trust.privacy")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Your data is protected</p>
            </div>

            <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 dark:bg-accent/20">
                <BadgeCheck className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground">{t("trust.noFee")}</h3>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {t("trust.feeNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
