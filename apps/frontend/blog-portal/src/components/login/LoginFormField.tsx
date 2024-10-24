import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type LoginFormFieldProps = {
  form: UseFormReturn<any, any, undefined>;
  label: string;
  name: string;
  placeholder: string;
  prompt: string;
  password?: boolean;
};

export const LoginFormField = ({
  form,
  label,
  placeholder,
  name,
  prompt,
  password,
}: Readonly<LoginFormFieldProps>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {password ? (
              <Input placeholder={placeholder} type="password" {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormDescription>{prompt}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
