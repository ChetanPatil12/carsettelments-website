import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { TopBar } from "@/components/TopBar";
import { HeroSection } from "@/components/HeroSection";
import { EpiphanySection } from "@/components/EpiphanySection";
import { LeadForm } from "@/components/LeadForm";
import { LiveEstimator } from "@/components/LiveEstimator";
import { HowItWorks } from "@/components/HowItWorks";
import { LendersSection } from "@/components/LendersSection";
import { TrustSignals } from "@/components/TrustSignals";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { SuccessModal } from "@/components/SuccessModal";
// import { apiRequest } from "@/lib/queryClient"; // Removed as backend is deleted

function getUTMParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
}

export default function Landing() {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);

    // Construct the mailto link directly - backend has been removed
    const mailtoLink = `mailto:help@carsettlements.com?subject=Lead%20Inquiry&body=${encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nState: ${formData.state}\nBalance: $${formData.loanBalance}\nPayment: $${formData.monthlyPayment}`
    )}`;

    // Open email client in new tab
    window.open(mailtoLink, "_blank");

    // Reset submission state but do NOT show success modal
    // setShowSuccess(true); 
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0" data-testid="page-landing">
      <TopBar />
      <main>
        <HeroSection />
        <EpiphanySection />
        <LeadForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        <LiveEstimator />
        <HowItWorks />
        <LendersSection />
        <TrustSignals />
        <Testimonials />
        <FAQSection />
      </main>
      <Footer />
      <AIChatWidget />
      <StickyMobileCTA />
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
