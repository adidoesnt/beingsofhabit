import { LoginCard } from "@/components/login/LoginCard";
import { LoginForm } from "@/components/login/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <LoginCard imgSrc="/Logo.png">
      <LoginForm />
    </LoginCard>
  );
}
