import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { US_STATES } from "@shared/schema";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const step1Schema = z.object({
  paymentTooHigh: z.boolean(),
  monthsBehind: z.string().min(1, "Required"),
  state: z.string().min(1, "State is required"),
});

const step2Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  email: z.string().email("Valid email is required"),
  loanBalance: z.number().min(1000, "Minimum $1,000"),
  monthlyPayment: z.number().min(1, "Required"),
  apr: z.number().min(0).max(50).optional(),
  monthsSinceLoan: z.number().min(0).optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.number().min(1990).max(2030).optional(),
  notes: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "Consent is required"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

interface LeadFormProps {
  onSubmit: (data: Step1Data & Step2Data) => Promise<void>;
  isSubmitting: boolean;
}

export function LeadForm({ onSubmit, isSubmitting }: LeadFormProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      paymentTooHigh: true,
      monthsBehind: "0",
      state: "",
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      loanBalance: 25000,
      monthlyPayment: 500,
      apr: 14,
      monthsSinceLoan: 24,
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: new Date().getFullYear() - 2,
      notes: "",
      consent: false,
    },
  });

  const handleStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleStep2Submit = async (data: Step2Data) => {
    if (step1Data) {
      await onSubmit({ ...step1Data, ...data });
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  return (
    <section id="lead-form" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-center gap-4" data-testid="progress-indicator">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
                data-testid="step-indicator-1"
              >
                1
              </div>
              <span className={`text-sm font-medium ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                {t("form.step")} 1
              </span>
            </div>
            <div className={`h-0.5 w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`} data-testid="step-connector" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
                data-testid="step-indicator-2"
              >
                2
              </div>
              <span className={`text-sm font-medium ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                {t("form.step")} 2
              </span>
            </div>
          </div>

          <Card className="overflow-hidden border-2 border-card-border shadow-xl" data-testid="card-lead-form">
            {step === 1 && (
              <Form {...step1Form}>
                <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="p-6 md:p-8">
                  <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:text-3xl" data-testid="text-step1-title">
                    {t("form.step1.title")}
                  </h2>

                  <div className="space-y-6">
                    <FormField
                      control={step1Form.control}
                      name="paymentTooHigh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium" data-testid="label-payment-high">
                            {t("form.step1.paymentHigh")}
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-4">
                              <Button
                                type="button"
                                variant={field.value ? "default" : "outline"}
                                className="flex-1"
                                onClick={() => field.onChange(true)}
                                data-testid="button-payment-yes"
                              >
                                {t("form.step1.yes")}
                              </Button>
                              <Button
                                type="button"
                                variant={!field.value ? "default" : "outline"}
                                className="flex-1"
                                onClick={() => field.onChange(false)}
                                data-testid="button-payment-no"
                              >
                                {t("form.step1.no")}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step1Form.control}
                      name="monthsBehind"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium" data-testid="label-months-behind">
                            {t("form.step1.behind")}
                          </FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { value: "0", label: t("form.step1.behind0") },
                                { value: "1-2", label: t("form.step1.behind1") },
                                { value: "3-5", label: t("form.step1.behind3") },
                                { value: "6+", label: t("form.step1.behind6") },
                              ].map((option) => (
                                <Button
                                  key={option.value}
                                  type="button"
                                  variant={field.value === option.value ? "default" : "outline"}
                                  className="h-auto py-3 text-sm"
                                  onClick={() => field.onChange(option.value)}
                                  data-testid={`button-behind-${option.value}`}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step1Form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium" data-testid="label-state">
                            {t("form.step1.state")}
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12" data-testid="select-state">
                                <SelectValue placeholder={t("form.step1.selectState")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {US_STATES.map((state) => (
                                <SelectItem key={state.value} value={state.value} data-testid={`option-state-${state.value}`}>
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full py-6 text-lg font-semibold"
                      data-testid="button-step1-submit"
                    >
                      {t("form.step1.cta")}
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === 2 && (
              <Form {...step2Form}>
                <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="p-6 md:p-8">
                  <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:text-3xl" data-testid="text-step2-title">
                    {t("form.step2.title")}
                  </h2>

                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={step2Form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-firstName">{t("form.step2.firstName")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12" data-testid="input-firstName" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step2Form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-lastName">{t("form.step2.lastName")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12" data-testid="input-lastName" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={step2Form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-phone">{t("form.step2.phone")}</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="tel"
                                placeholder="(555) 555-5555"
                                className="h-12" 
                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                data-testid="input-phone" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step2Form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-email">{t("form.step2.email")}</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" className="h-12" data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={step2Form.control}
                      name="loanBalance"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel data-testid="label-balance">{t("form.step2.balance")}</FormLabel>
                            <span className="text-lg font-bold text-primary" data-testid="text-balance-value">
                              ${field.value.toLocaleString()}
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              min={5000}
                              max={100000}
                              step={1000}
                              className="py-2"
                              data-testid="slider-balance"
                            />
                          </FormControl>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$5,000</span>
                            <span>$100,000</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={step2Form.control}
                        name="monthlyPayment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-payment">{t("form.step2.payment")}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                className="h-12" 
                                data-testid="input-payment" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step2Form.control}
                        name="apr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-apr">{t("form.step2.apr")}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                className="h-12" 
                                data-testid="input-apr" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <FormField
                        control={step2Form.control}
                        name="vehicleMake"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-make">{t("form.step2.vehicleMake")}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Toyota" className="h-12" data-testid="input-make" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step2Form.control}
                        name="vehicleModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-model">{t("form.step2.vehicleModel")}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Camry" className="h-12" data-testid="input-model" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step2Form.control}
                        name="vehicleYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel data-testid="label-year">{t("form.step2.vehicleYear")}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 2020)}
                                className="h-12" 
                                data-testid="input-year" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={step2Form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-notes">{t("form.step2.notes")}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t("form.step2.notesPlaceholder")} className="h-12" data-testid="input-notes" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1"
                              data-testid="checkbox-consent"
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-sm leading-relaxed text-muted-foreground" data-testid="label-consent">
                            {t("form.step2.consent")}
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 py-6"
                        data-testid="button-back"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                        {t("form.step2.back")}
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-6 text-lg font-semibold"
                        data-testid="button-submit"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                            {t("form.submitting")}
                          </>
                        ) : (
                          t("form.step2.cta")
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
