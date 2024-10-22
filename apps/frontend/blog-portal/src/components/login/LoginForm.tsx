import { formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormField } from "./LoginFormField";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const fields = [
  {
    name: "username",
    prompt: "Please enter your username.",
    label: "Username",
    placeholder: "boh-username",
  },
  {
    name: "password",
    label: "Password",
    prompt: "Please enter your password.",
    placeholder: "boh-password",
    password: true,
  },
];

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    // TODO: send data to backend, set context
    console.log(data);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <LoginFormField
            key={field.name}
            form={form}
            label={field.label}
            placeholder={field.placeholder}
            prompt={field.prompt}
            password={field.password}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
