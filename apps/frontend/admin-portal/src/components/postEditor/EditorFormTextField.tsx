import { Input } from "../ui/input";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";

export const EditorFormTextField = ({
    form,
    label,
    placeholder,
    name,
    prompt,
    initialValue,
}: Readonly<{
    form: UseFormReturn<any, any, undefined>;
    label: string;
    placeholder: string;
    prompt: string;
    name: string;
    className?: string;
    initialValue?: string;
}>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormDescription>{prompt}</FormDescription>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            defaultValue={initialValue}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
