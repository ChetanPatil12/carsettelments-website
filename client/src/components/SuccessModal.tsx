import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Calendar } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle className="h-10 w-10 text-accent" aria-hidden="true" />
          </div>
          <DialogTitle className="text-2xl">{t("modal.success.title")}</DialogTitle>
          <DialogDescription className="text-base">
            {t("modal.success.message")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-3">
          <Button
            asChild
            className="w-full py-6 text-base font-semibold"
          >
            <a
              href="https://calendly.com/carsettlements"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-schedule"
            >
              <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
              {t("modal.success.schedule")}
            </a>
          </Button>
          
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
            data-testid="button-modal-close"
          >
            {t("modal.success.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
