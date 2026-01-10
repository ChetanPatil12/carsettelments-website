import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, DollarSign, Calendar, Percent } from "lucide-react";

function getSavingsRange(monthsBehind: string): { min: number; max: number } {
  switch (monthsBehind) {
    case "0":
      return { min: 10, max: 25 };
    case "1-2":
      return { min: 20, max: 35 };
    case "3-5":
      return { min: 25, max: 45 };
    case "6+":
      return { min: 30, max: 50 };
    default:
      return { min: 15, max: 30 };
  }
}

function getTermRange(monthsBehind: string): { min: number; max: number } {
  switch (monthsBehind) {
    case "0":
      return { min: 24, max: 36 };
    case "1-2":
      return { min: 24, max: 42 };
    case "3-5":
      return { min: 30, max: 48 };
    case "6+":
      return { min: 36, max: 48 };
    default:
      return { min: 24, max: 48 };
  }
}

export function LiveEstimator() {
  const { t } = useLanguage();
  const [balance, setBalance] = useState(25000);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [apr, setApr] = useState(14);
  const [monthsBehind, setMonthsBehind] = useState("0");

  const savingsRange = getSavingsRange(monthsBehind);
  const termRange = getTermRange(monthsBehind);

  const estimatedSavingsMin = balance * (savingsRange.min / 100);
  const estimatedSavingsMax = balance * (savingsRange.max / 100);
  const newBalanceMin = balance - estimatedSavingsMax;
  const newBalanceMax = balance - estimatedSavingsMin;
  const newPaymentMin = Math.round(newBalanceMin / termRange.max);
  const newPaymentMax = Math.round(newBalanceMax / termRange.min);

  return (
    <section className="bg-card py-16 md:py-24" data-testid="section-estimator">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl" data-testid="text-estimator-title">
            {t("estimator.title")}
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 border-card-border p-6" data-testid="card-estimator-inputs">
              <h3 className="mb-6 text-lg font-semibold text-foreground">{t("estimator.inputTitle")}</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{t("form.step2.balance")}</Label>
                    <span className="text-lg font-bold text-primary">${balance.toLocaleString()}</span>
                  </div>
                  <Slider
                    value={[balance]}
                    onValueChange={(value) => setBalance(value[0])}
                    min={5000}
                    max={100000}
                    step={1000}
                    className="py-2"
                    data-testid="estimator-slider-balance"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$5,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("form.step2.payment")}</Label>
                    <Input
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(parseInt(e.target.value) || 0)}
                      className="h-12"
                      data-testid="estimator-input-payment"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("form.step2.apr")}</Label>
                    <Input
                      type="number"
                      value={apr}
                      onChange={(e) => setApr(parseInt(e.target.value) || 0)}
                      className="h-12"
                      data-testid="estimator-input-apr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t("form.step1.behind")}</Label>
                  <Select value={monthsBehind} onValueChange={setMonthsBehind}>
                    <SelectTrigger className="h-12" data-testid="estimator-select-behind">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">{t("form.step1.behind0")}</SelectItem>
                      <SelectItem value="1-2">{t("form.step1.behind1")}</SelectItem>
                      <SelectItem value="3-5">{t("form.step1.behind3")}</SelectItem>
                      <SelectItem value="6+">{t("form.step1.behind6")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 p-6 dark:border-accent/50 dark:from-accent/10 dark:to-primary/10" data-testid="card-estimator-results">
              <h3 className="mb-6 text-lg font-semibold text-foreground">{t("estimator.resultsTitle")}</h3>
              
              <div className="space-y-5">
                <div className="rounded-lg bg-card p-4" data-testid="result-savings-range">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingDown className="h-4 w-4" aria-hidden="true" />
                    {t("estimator.savingsRange")}
                  </div>
                  <p className="text-2xl font-bold text-accent" data-testid="text-savings-percent">
                    {savingsRange.min}% - {savingsRange.max}%
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground" data-testid="text-savings-amount">
                    ${estimatedSavingsMin.toLocaleString()} - ${estimatedSavingsMax.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-lg bg-card p-4" data-testid="result-new-balance">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" aria-hidden="true" />
                    {t("estimator.newBalance")}
                  </div>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-new-balance">
                    ${newBalanceMin.toLocaleString()} - ${newBalanceMax.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-lg bg-card p-4" data-testid="result-new-payment">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Percent className="h-4 w-4" aria-hidden="true" />
                    {t("estimator.newPayment")}
                  </div>
                  <p className="text-2xl font-bold text-primary" data-testid="text-new-payment">
                    ${newPaymentMin.toLocaleString()} - ${newPaymentMax.toLocaleString()}/mo
                  </p>
                </div>

                <div className="rounded-lg bg-card p-4" data-testid="result-term">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {t("estimator.term")}
                  </div>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-term">
                    {termRange.min} - {termRange.max} {t("storyCard.months")}
                  </p>
                </div>

                <p className="text-center text-xs text-muted-foreground" data-testid="text-estimator-disclaimer">
                  {t("estimator.disclaimer")}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
