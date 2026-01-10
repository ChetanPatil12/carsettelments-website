import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert M.",
    state: "Florida",
    quote: {
      en: "I was 3 months behind and thought I'd lose my car. They helped me explore options I didn't know existed. My payment is now manageable.",
      es: "Estaba 3 meses atrasado y pensé que perdería mi carro. Me ayudaron a explorar opciones que no sabía que existían. Mi pago ahora es manejable.",
    },
    avatar: "R",
    reduction: "32%",
  },
  {
    name: "Jennifer L.",
    state: "Texas",
    quote: {
      en: "The process was straightforward. Within 48 hours I knew my options. Avoided repossession and now I can breathe again.",
      es: "El proceso fue sencillo. En 48 horas supe mis opciones. Evité el embargo y ahora puedo respirar de nuevo.",
    },
    avatar: "J",
    reduction: "28%",
  },
  {
    name: "Carlos G.",
    state: "California",
    quote: {
      en: "My car payment was eating up my budget. They found a path that reduced my monthly obligation significantly. Highly recommend.",
      es: "Mi pago del carro estaba consumiendo mi presupuesto. Encontraron un camino que redujo mi obligación mensual significativamente. Lo recomiendo.",
    },
    avatar: "C",
    reduction: "41%",
  },
];

export function Testimonials() {
  const { language, t } = useLanguage();

  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("testimonials.title")}
        </h2>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col border-2 border-card-border p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.state}</p>
                  </div>
                </div>

                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-chart-4 text-chart-4"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mb-4 flex-1 text-sm leading-relaxed text-foreground">
                  "{testimonial.quote[language]}"
                </blockquote>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">{t("testimonials.label")}</span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent dark:bg-accent/20">
                    ~{testimonial.reduction} saved
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
