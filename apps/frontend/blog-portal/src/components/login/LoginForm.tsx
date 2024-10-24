import { formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormField } from "./LoginFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { apiClient } from "@/utils";
import { useAuth } from "@/context/auth";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
    BlogPortalAuthError,
    BlogPortalAuthErrorMessage,
} from "@/packages/types/error";
import { BlogPortalAuthErrorResponse } from "@/packages/types/response";

const { VITE_FRONTEND_URL = "DUMMY-URL" } = import.meta.env;

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
    const { setUser, isAuthenticated } = useAuth();
    const { redirect } = useSearch({ strict: false }) as { redirect?: string };
    const search = useMemo(() => {
        return redirect?.replace(VITE_FRONTEND_URL, "") ?? "/posts";
    }, [redirect]);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleRedirect = useCallback(() => {
        console.log("Redirecting to", search);
        navigate({
            to: search,
        });
    }, [search, navigate]);

    const handleError = useCallback(
        ({ response }: BlogPortalAuthErrorResponse) => {
            switch (response.data) {
                case BlogPortalAuthErrorMessage.USER_NOT_FOUND:
                    form.setError("username", {
                        message: BlogPortalAuthErrorMessage.USER_NOT_FOUND,
                        type: "value",
                    });
                    break;
                case BlogPortalAuthErrorMessage.INCORRECT_PASSWORD:
                    form.setError("password", {
                        message: BlogPortalAuthErrorMessage.INCORRECT_PASSWORD,
                        type: "value",
                    });
                    break;
                default:
                    form.setError("username", {
                        message: "Unknown error",
                        type: "value",
                    });
            }
        },
        [form]
    );

    const onSubmit = useCallback(
        async (formData: z.infer<typeof formSchema>) => {
            try {
                const { data: user } = await apiClient.post(
                    "/users/login",
                    formData
                );
                if (!user) throw new Error("No user data returned");
                setUser(user);
            } catch (e) {
                const error = e as BlogPortalAuthErrorResponse;
                handleError(error);
            }
        },
        [setUser, handleError]
    );

    useEffect(() => {
        if (!isAuthenticated) return;
        handleRedirect();
    }, [isAuthenticated]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {fields.map((field) => (
                    <LoginFormField
                        key={field.name}
                        name={field.name}
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
