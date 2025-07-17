import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailVerificationModal({ isOpen, onClose }: EmailVerificationModalProps) {
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [currentStep, setCurrentStep] = useState<"email" | "progress">("email");
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email: string) => {
    return email.endsWith('@agency.gov.sg') && email.includes('@');
  };

  const handleSendOTP = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid gov.sg email address");
      return;
    }
    setEmailError("");
    setCurrentStep("progress");
  };

  const handleConfirmOTP = () => {
    // Handle OTP confirmation logic here
    console.log("OTP confirmed:", otpValue);
    onClose();
  };

  const handleEnterLater = () => {
    onClose();
  };

  const resetModal = () => {
    setEmail("");
    setOtpValue("");
    setCurrentStep("email");
    setEmailError("");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="w-[560px] max-w-[560px] h-[420px] max-h-[420px] rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
        role="dialog"
        aria-modal="true"
      >
        {currentStep === "email" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading text-center">
                Verify email to start scanning
              </DialogTitle>
              <p className="text-sm text-muted-foreground text-center">
                Enter your gov.sg address — we'll send a one-time code and immediately begin the scan.
              </p>
            </DialogHeader>
            
            <div className="space-y-6 px-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@agency.gov.sg"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="w-full"
                />
                {emailError && (
                  <p className="text-sm text-destructive" aria-live="polite">
                    {emailError}
                  </p>
                )}
              </div>
              
              <Button 
                id="btnOTP"
                onClick={handleSendOTP}
                disabled={!email.trim()}
                className="w-full"
              >
                Send OTP & start scan
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading text-center">
                Scanning in progress…
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 px-6">
              {/* Indeterminate progress bar */}
              <div className="relative w-full h-0.5 bg-muted rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-foreground to-primary animate-pulse rounded-full"></div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">Enter verification code</Label>
                <InputOTP 
                  maxLength={6} 
                  value={otpValue} 
                  onChange={setOtpValue}
                  className="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} aria-label="Digit 1" />
                    <InputOTPSlot index={1} aria-label="Digit 2" />
                    <InputOTPSlot index={2} aria-label="Digit 3" />
                    <InputOTPSlot index={3} aria-label="Digit 4" />
                    <InputOTPSlot index={4} aria-label="Digit 5" />
                    <InputOTPSlot index={5} aria-label="Digit 6" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleConfirmOTP}
                  disabled={otpValue.length !== 6}
                  className="w-full"
                >
                  Confirm OTP
                </Button>
                
                <div className="text-right">
                  <button 
                    onClick={handleEnterLater}
                    className="text-sm text-muted-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded"
                  >
                    Enter later
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}