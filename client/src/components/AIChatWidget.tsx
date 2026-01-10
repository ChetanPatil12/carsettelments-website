import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, RotateCcw, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
}

interface KnowledgeEntry {
  keywords: string[];
  en: string;
  es: string;
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["stop", "repossession", "repo", "detener", "embargo", "quitar"],
    en: "We may be able to help explore options that could potentially delay or avoid repossession, depending on your specific situation. Results vary and are not guaranteed. Would you like to speak with a specialist?",
    es: "Podemos ayudarte a explorar opciones que podrían potencialmente retrasar o evitar el embargo, dependiendo de tu situación específica. Los resultados varían y no están garantizados. ¿Te gustaría hablar con un especialista?",
  },
  {
    keywords: ["keep", "car", "vehicle", "quedar", "carro", "vehículo", "conservar"],
    en: "In many cases, keeping your vehicle may be possible depending on the exit option that works for your situation. During a free consultation, we can discuss all possibilities.",
    es: "En muchos casos, quedarte con tu vehículo puede ser posible dependiendo de la opción de salida que funcione para tu situación. Durante una consulta gratuita, podemos discutir todas las posibilidades.",
  },
  {
    keywords: ["refinance", "refinancing", "refinanciar", "refinanciamiento"],
    en: "The Auto Loan Exit Path™ is different from traditional refinancing. It may include restructuring or transferring obligations using various capital solutions. We can explain more during your consultation.",
    es: "El Auto Loan Exit Path™ es diferente del refinanciamiento tradicional. Puede incluir reestructuración o transferencia de obligaciones usando varias soluciones de capital. Podemos explicar más durante tu consulta.",
  },
  {
    keywords: ["credit", "score", "affect", "crédito", "puntaje", "afectar"],
    en: "The impact on your credit depends on your current situation and the specific solution pursued. We'll explain potential credit implications during your consultation.",
    es: "El impacto en tu crédito depende de tu situación actual y la solución específica que se busque. Explicaremos las posibles implicaciones crediticias durante tu consulta.",
  },
  {
    keywords: ["fast", "quick", "time", "how long", "rápido", "tiempo", "cuánto"],
    en: "We prioritize urgent pre-repossession cases. Many clients receive an initial consultation within 24-48 hours. Timeline for resolution typically ranges from 12-48 months.",
    es: "Priorizamos casos urgentes de pre-embargo. Muchos clientes reciben una consulta inicial dentro de 24-48 horas. El plazo de resolución típicamente varía de 12-48 meses.",
  },
  {
    keywords: ["qualify", "eligible", "loan", "calificar", "elegible", "préstamo"],
    en: "Most auto loans from banks, credit unions, and finance companies may qualify. During your free consultation, we'll determine if we can help with your specific loan.",
    es: "La mayoría de los préstamos de autos de bancos, cooperativas de crédito y compañías financieras pueden calificar. Durante tu consulta gratuita, determinaremos si podemos ayudar con tu préstamo específico.",
  },
  {
    keywords: ["fee", "cost", "charge", "price", "tarifa", "costo", "cobrar", "precio"],
    en: "We operate on a success fee model — you only pay if you choose to move forward with an agreed solution. The fee is typically 20% of savings achieved. No upfront fees ever.",
    es: "Operamos con un modelo de tarifa de éxito — solo pagas si decides avanzar con una solución acordada. La tarifa es típicamente 20% del ahorro logrado. Sin tarifas iniciales nunca.",
  },
  {
    keywords: ["current", "not behind", "high payment", "al día", "no atrasado", "pago alto"],
    en: "Even if you're current on payments, we can help! Being current actually gives you more options. Many clients seek help before falling behind to proactively improve their situation.",
    es: "¡Aún si estás al día en los pagos, podemos ayudar! Estar al día te da más opciones. Muchos clientes buscan ayuda antes de atrasarse para mejorar proactivamente su situación.",
  },
  {
    keywords: ["exit path", "mechanism", "how", "work", "salida", "mecanismo", "cómo", "funciona"],
    en: "The Auto Loan Exit Path™ is a structured way to explore exit options most drivers never hear about. It may include restructuring or transferring obligations using capital solutions and third-party arrangements. We'll explain everything during your free consultation.",
    es: "El Auto Loan Exit Path™ es una forma estructurada de explorar opciones de salida que la mayoría nunca escucha. Puede incluir reestructuración o transferencia de obligaciones usando soluciones de capital y arreglos con terceros. Te explicaremos todo durante tu consulta gratuita.",
  },
];

const quickReplies = {
  en: [
    "Can you stop repossession?",
    "Will I keep my car?",
    "How do you charge?",
    "How fast can you help?",
  ],
  es: [
    "¿Pueden detener el embargo?",
    "¿Me quedo con mi carro?",
    "¿Cómo cobran?",
    "¿Qué tan rápido ayudan?",
  ],
};

function findBestAnswer(query: string, language: "en" | "es"): string {
  const lowerQuery = query.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch[language];
  }

  return language === "en"
    ? "I can help—please share your state and whether you're behind on payments."
    : "Puedo ayudarte—dime tu estado y si estás atrasado en pagos.";
}

export function AIChatWidget() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: t("chat.welcome"),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "bot",
        content: t("chat.welcome"),
      },
    ]);
  }, [language]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const botResponse: Message = {
      id: `bot-${Date.now()}`,
      role: "bot",
      content: findBestAnswer(text, language),
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput("");
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "bot",
        content: t("chat.welcome"),
      },
    ]);
  };

  const scrollToForm = () => {
    setIsOpen(false);
    const formSection = document.getElementById("lead-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:bottom-6"
        aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
        data-testid="button-chat-toggle"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-accent"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <Card
          className="fixed bottom-36 right-4 z-50 flex h-[450px] w-[350px] flex-col overflow-hidden border-2 border-card-border shadow-2xl md:bottom-24"
          role="dialog"
          aria-label="AI Chat Assistant"
        >
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
            <h3 className="font-semibold text-primary-foreground">{t("chat.title")}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="rounded p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground"
                aria-label={t("chat.reset")}
                data-testid="button-chat-reset"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground"
                aria-label={t("chat.close")}
                data-testid="button-chat-close"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-border bg-card p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies[language].map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(reply)}
                  className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                  data-testid={`button-quick-reply-${index}`}
                >
                  {reply}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={scrollToForm}
              className="mb-3 w-full"
              data-testid="button-chat-specialist"
            >
              {t("chat.talkToSpecialist")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("chat.placeholder")}
                className="h-10"
                data-testid="input-chat"
              />
              <Button
                size="icon"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                data-testid="button-chat-send"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
