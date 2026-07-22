import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return <AuthCard eyebrow="Secure recovery" title="Choose a new password" description="Use a unique password of at least eight characters."><ResetPasswordForm /></AuthCard>;
}
