"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export default function OTPModal({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) {
  // const [value, setValue] = React.useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // call api to verify otp
      const sessionId = await verifySecret({ accountId, password });

      if (sessionId) {
        router.push("/");
      }
    } catch (e) {
      console.log("Failed to verify OTP", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    console.log("Resend OTP");
    await sendEmailOTP({ email });
  };
  // call api to resent the otp
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader className="justify center relative flex">
            <AlertDialogTitle className="h2 text-center">
              Enter your OTP
            </AlertDialogTitle>
            <AlertDialogDescription className="subtitle-2 text-center">
              we have sent and email to{" "}
              <span className="pl-1 text-brand">{email}</span>
            </AlertDialogDescription>

            <div className="flex flex-col items-center justify-center space-y-8">
              <InputOTP maxLength={6} value={password} onChange={setPassword}>
                <InputOTPGroup className="shad-otp">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h12"
              type="button"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  priority={true}
                />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
          <div className="subtitle-2 flex items-center justify-center">
            Did not get the code?{" "}
            <button onClick={handleResendOTP} className="pl-1 text-brand">
              Resend code
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
