import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  "nav.phone": { en: "Call Us", es: "Llámanos" },
  "nav.cta": { en: "Free Consultation", es: "Consulta Gratis" },
  
  "hero.bigDomino": { 
    en: "Your auto lender is NOT your only option before repossession.", 
    es: "Tu banco NO es tu única opción antes de que te quiten el carro." 
  },
  "hero.headline": { 
    en: "Paying too much for a car that's worth less every month?", 
    es: "¿Pagando demasiado por un carro que vale menos cada mes?" 
  },
  "hero.subheadline": { 
    en: "Before repossession escalates, see if you qualify for a different exit.", 
    es: "Antes de que el embargo escale, ve si calificas para una salida diferente." 
  },
  "hero.cta": { en: "See My Options", es: "Ver Mis Opciones" },
  "hero.disclaimer": { 
    en: "Results vary. Not a law firm. Not credit repair. Not legal advice.", 
    es: "Los resultados varían. No somos abogados. No es reparación de crédito. No es asesoría legal." 
  },
  
  "storyCard.title": { en: "Representative Example", es: "Ejemplo Representativo" },
  "storyCard.name": { en: "Maria T.", es: "María T." },
  "storyCard.state": { en: "Texas", es: "Texas" },
  "storyCard.balance": { en: "Auto Loan Balance", es: "Balance del Préstamo" },
  "storyCard.payment": { en: "Monthly Payment", es: "Pago Mensual" },
  "storyCard.reduction": { en: "Est. Reduction Range", es: "Rango Est. de Reducción" },
  "storyCard.timeline": { en: "Timeline", es: "Plazo" },
  "storyCard.months": { en: "months", es: "meses" },
  "storyCard.disclaimer": { en: "Representative example. Results vary.", es: "Ejemplo representativo. Los resultados varían." },
  
  "epiphany.title": { en: "Why car loans break good people", es: "Por qué los préstamos de autos arruinan a buenas personas" },
  "epiphany.bullet1": { en: "Cars lose value. Loans don't.", es: "Los carros pierden valor. Los préstamos no." },
  "epiphany.bullet2": { en: "Lenders optimize for contracts, not for people.", es: "Los prestamistas optimizan contratos, no personas." },
  "epiphany.bullet3": { en: "Most drivers never see exit options early enough.", es: "La mayoría nunca ve las opciones de salida a tiempo." },
  "epiphany.bridge": { 
    en: "That's why we created the Auto Loan Exit Path™ — a structured way to explore exit options most drivers never hear about.", 
    es: "Por eso creamos el Auto Loan Exit Path™ — una forma estructurada de explorar opciones de salida que la mayoría nunca escucha." 
  },
  "epiphany.chartLabel.carValue": { en: "Car Value", es: "Valor del Carro" },
  "epiphany.chartLabel.loanBalance": { en: "Loan Balance", es: "Balance del Préstamo" },
  
  "form.step": { en: "Step", es: "Paso" },
  "form.of": { en: "of", es: "de" },
  "form.step1.title": { en: "Quick Assessment", es: "Evaluación Rápida" },
  "form.step1.paymentHigh": { en: "Is your car payment too high?", es: "¿Tu pago de carro es muy alto?" },
  "form.step1.yes": { en: "Yes", es: "Sí" },
  "form.step1.no": { en: "No", es: "No" },
  "form.step1.behind": { en: "Are you behind on payments?", es: "¿Estás atrasado en los pagos?" },
  "form.step1.behind0": { en: "Current (0 months)", es: "Al día (0 meses)" },
  "form.step1.behind1": { en: "1-2 months behind", es: "1-2 meses atrasado" },
  "form.step1.behind3": { en: "3-5 months behind", es: "3-5 meses atrasado" },
  "form.step1.behind6": { en: "6+ months behind", es: "6+ meses atrasado" },
  "form.step1.state": { en: "Your State", es: "Tu Estado" },
  "form.step1.selectState": { en: "Select your state", es: "Selecciona tu estado" },
  "form.step1.cta": { en: "Check My Exit Options", es: "Ver Mis Opciones de Salida" },
  
  "form.step2.title": { en: "Your Details", es: "Tus Detalles" },
  "form.step2.firstName": { en: "First Name", es: "Nombre" },
  "form.step2.lastName": { en: "Last Name", es: "Apellido" },
  "form.step2.phone": { en: "Phone Number", es: "Número de Teléfono" },
  "form.step2.email": { en: "Email", es: "Correo Electrónico" },
  "form.step2.balance": { en: "Auto Loan Balance ($)", es: "Balance del Préstamo ($)" },
  "form.step2.payment": { en: "Monthly Payment ($)", es: "Pago Mensual ($)" },
  "form.step2.apr": { en: "APR (%)", es: "Tasa APR (%)" },
  "form.step2.monthsSince": { en: "Months Since Loan Started", es: "Meses Desde que Inició el Préstamo" },
  "form.step2.vehicleMake": { en: "Vehicle Make", es: "Marca del Vehículo" },
  "form.step2.vehicleModel": { en: "Vehicle Model", es: "Modelo del Vehículo" },
  "form.step2.vehicleYear": { en: "Vehicle Year", es: "Año del Vehículo" },
  "form.step2.notes": { en: "Additional Notes", es: "Notas Adicionales" },
  "form.step2.notesPlaceholder": { en: "Any details you'd like to share...", es: "Cualquier detalle que desees compartir..." },
  "form.step2.consent": { 
    en: "I consent to be contacted by CarSettlements regarding my inquiry. Message and data rates may apply. Results are not guaranteed.", 
    es: "Doy mi consentimiento para ser contactado por CarSettlements respecto a mi consulta. Pueden aplicar tarifas de mensajes y datos. Los resultados no están garantizados." 
  },
  "form.step2.cta": { en: "Get My Free Review", es: "Obtener Mi Revisión Gratis" },
  "form.step2.back": { en: "Back", es: "Atrás" },
  
  "estimator.title": { en: "Your Estimated Savings", es: "Tu Ahorro Estimado" },
  "estimator.savingsRange": { en: "Estimated Savings Range", es: "Rango de Ahorro Estimado" },
  "estimator.newBalance": { en: "Estimated New Balance", es: "Nuevo Balance Estimado" },
  "estimator.newPayment": { en: "Estimated New Payment", es: "Nuevo Pago Estimado" },
  "estimator.term": { en: "Estimated Term", es: "Plazo Estimado" },
  "estimator.disclaimer": { en: "Estimates only. Final outcomes depend on lender, state, and approval.", es: "Solo estimaciones. Los resultados finales dependen del prestamista, estado y aprobación." },
  
  "howItWorks.title": { en: "How It Works", es: "Cómo Funciona" },
  "howItWorks.step1.title": { en: "Quick Review", es: "Revisión Rápida" },
  "howItWorks.step1.desc": { en: "We analyze your situation and loan details.", es: "Analizamos tu situación y detalles del préstamo." },
  "howItWorks.step2.title": { en: "Map Exit Paths", es: "Mapeamos Opciones" },
  "howItWorks.step2.desc": { en: "We identify possible options including the Auto Loan Exit Path™.", es: "Identificamos opciones posibles incluyendo el Auto Loan Exit Path™." },
  "howItWorks.step3.title": { en: "Fast Coordination", es: "Coordinación Rápida" },
  "howItWorks.step3.desc": { en: "If you choose to proceed, we coordinate next steps quickly.", es: "Si decides proceder, coordinamos los siguientes pasos rápidamente." },
  "howItWorks.step4.title": { en: "Reduced Burden", es: "Carga Reducida" },
  "howItWorks.step4.desc": { en: "Move forward with less financial stress (12-48 months typical).", es: "Avanza con menos estrés financiero (12-48 meses típico)." },
  "howItWorks.noGuarantees": { en: "No guarantees. Results vary by situation.", es: "Sin garantías. Los resultados varían según la situación." },
  
  "lenders.title": { en: "We Work With Many Auto Lenders", es: "Trabajamos Con Muchos Prestamistas de Autos" },
  "lenders.disclaimer": { en: "Examples only — no affiliation.", es: "Solo ejemplos — sin afiliación." },
  
  "trust.secure": { en: "Secure Form", es: "Formulario Seguro" },
  "trust.privacy": { en: "Privacy-First", es: "Privacidad Primero" },
  "trust.noFee": { en: "No success fee unless you move forward with an agreed solution*", es: "Sin tarifa de éxito a menos que avances con una solución acordada*" },
  "trust.feeNote": { en: "*Fee structure explained during consultation. Results vary.", es: "*Estructura de tarifas explicada durante la consulta. Los resultados varían." },
  
  "testimonials.title": { en: "What Our Clients Say", es: "Lo Que Dicen Nuestros Clientes" },
  "testimonials.label": { en: "Representative example", es: "Ejemplo representativo" },
  
  "faq.title": { en: "Frequently Asked Questions", es: "Preguntas Frecuentes" },
  "faq.q1": { en: "Can you stop repossession?", es: "¿Pueden detener el embargo?" },
  "faq.a1": { en: "We may be able to help explore options that could potentially delay or avoid repossession, depending on your specific situation and lender. Results vary and are not guaranteed.", es: "Podemos ayudarte a explorar opciones que podrían potencialmente retrasar o evitar el embargo, dependiendo de tu situación específica y prestamista. Los resultados varían y no están garantizados." },
  "faq.q2": { en: "Do I keep my car?", es: "¿Me quedo con mi carro?" },
  "faq.a2": { en: "In many cases, keeping your vehicle may be possible depending on the exit option that works for your situation. We'll discuss all possibilities during your free consultation.", es: "En muchos casos, quedarte con tu vehículo puede ser posible dependiendo de la opción de salida que funcione para tu situación. Discutiremos todas las posibilidades durante tu consulta gratuita." },
  "faq.q3": { en: "Is this refinancing?", es: "¿Esto es refinanciamiento?" },
  "faq.a3": { en: "Not exactly. The Auto Loan Exit Path™ may include restructuring or transferring obligations using various capital solutions. It's different from traditional refinancing.", es: "No exactamente. El Auto Loan Exit Path™ puede incluir reestructuración o transferencia de obligaciones usando varias soluciones de capital. Es diferente del refinanciamiento tradicional." },
  "faq.q4": { en: "Will this affect my credit?", es: "¿Esto afectará mi crédito?" },
  "faq.a4": { en: "The impact on your credit depends on your current situation and the specific solution pursued. We'll explain potential credit implications during your consultation.", es: "El impacto en tu crédito depende de tu situación actual y la solución específica que se busque. Explicaremos las posibles implicaciones crediticias durante tu consulta." },
  "faq.q5": { en: "How fast can I get help?", es: "¿Qué tan rápido puedo obtener ayuda?" },
  "faq.a5": { en: "We prioritize urgent pre-repossession cases. Many clients receive an initial consultation within 24-48 hours. Timeline for resolution varies (typically 12-48 months).", es: "Priorizamos casos urgentes de pre-embargo. Muchos clientes reciben una consulta inicial dentro de 24-48 horas. El plazo de resolución varía (típicamente 12-48 meses)." },
  "faq.q6": { en: "What loans qualify?", es: "¿Qué préstamos califican?" },
  "faq.a6": { en: "Most auto loans from banks, credit unions, and finance companies may qualify. During your free consultation, we'll determine if we can help with your specific loan.", es: "La mayoría de los préstamos de autos de bancos, cooperativas de crédito y compañías financieras pueden calificar. Durante tu consulta gratuita, determinaremos si podemos ayudar con tu préstamo específico." },
  "faq.q7": { en: "How do you charge fees?", es: "¿Cómo cobran las tarifas?" },
  "faq.a7": { en: "We operate on a success fee model — you only pay if you choose to move forward with an agreed solution. The fee is typically 20% of savings achieved. No upfront fees.", es: "Operamos con un modelo de tarifa de éxito — solo pagas si decides avanzar con una solución acordada. La tarifa es típicamente 20% del ahorro logrado. Sin tarifas iniciales." },
  "faq.q8": { en: "What if I'm current but payments are too high?", es: "¿Qué pasa si estoy al día pero los pagos son muy altos?" },
  "faq.a8": { en: "We can still help! Being current actually gives you more options. Many clients seek help before falling behind to proactively improve their situation.", es: "¡Aún podemos ayudar! Estar al día te da más opciones. Muchos clientes buscan ayuda antes de atrasarse para mejorar proactivamente su situación." },
  
  "footer.contact": { en: "Contact", es: "Contacto" },
  "footer.privacy": { en: "Privacy Policy", es: "Política de Privacidad" },
  "footer.terms": { en: "Terms of Service", es: "Términos de Servicio" },
  "footer.disclaimer": { en: "Disclaimer", es: "Aviso Legal" },
  "footer.legal": { 
    en: "CarSettlements.com provides auto loan relief options. Not a law firm. Not credit repair. Results vary.", 
    es: "CarSettlements.com ofrece opciones de alivio de préstamos de autos. No somos abogados. No es reparación de crédito. Los resultados varían." 
  },
  
  "chat.title": { en: "AI Assistant", es: "Asistente IA" },
  "chat.placeholder": { en: "Type your question...", es: "Escribe tu pregunta..." },
  "chat.send": { en: "Send", es: "Enviar" },
  "chat.talkToSpecialist": { en: "Talk to a Specialist", es: "Hablar con un Especialista" },
  "chat.reset": { en: "Reset Chat", es: "Reiniciar Chat" },
  "chat.close": { en: "Close", es: "Cerrar" },
  "chat.welcome": { 
    en: "Hi! I'm here to help answer your questions about auto loan relief. What would you like to know?", 
    es: "¡Hola! Estoy aquí para ayudarte con tus preguntas sobre alivio de préstamos de autos. ¿Qué te gustaría saber?" 
  },
  "chat.fallback": { 
    en: "I can help—please share your state and whether you're behind on payments.", 
    es: "Puedo ayudarte—dime tu estado y si estás atrasado en pagos." 
  },
  
  "modal.success.title": { en: "Thank You!", es: "¡Gracias!" },
  "modal.success.message": { en: "We'll contact you shortly to discuss your options.", es: "Te contactaremos pronto para discutir tus opciones." },
  "modal.success.schedule": { en: "Schedule Now", es: "Programar Ahora" },
  "modal.success.close": { en: "Close", es: "Cerrar" },
  
  "sticky.cta": { en: "Get Help Now", es: "Obtén Ayuda Ahora" },
  
  "estimator.inputTitle": { en: "Your Loan Details", es: "Detalles de Tu Préstamo" },
  "estimator.resultsTitle": { en: "Estimated Results", es: "Resultados Estimados" },
  
  "form.submitting": { en: "Submitting...", es: "Enviando..." },
  "form.error": { en: "Something went wrong. Please try again.", es: "Algo salió mal. Por favor intenta de nuevo." },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved === "en" || saved === "es") return saved;
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang") as Language;
      if (urlLang === "en" || urlLang === "es") return urlLang;
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
