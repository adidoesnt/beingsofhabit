import { Textarea } from "../ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";

export const EditorFormTextAreaField = ({
  form,
  label,
  placeholder,
  name,
  prompt,
  initialValue,
  className,
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
            <Textarea
              placeholder={placeholder}
              {...field}
              defaultValue={initialValue}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
