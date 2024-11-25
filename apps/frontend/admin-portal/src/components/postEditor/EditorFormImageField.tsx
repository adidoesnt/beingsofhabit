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

export const EditorFormImageField = ({
  form,
  label,
  name,
  prompt,
}: Readonly<{
  form: UseFormReturn<any, any, undefined>;
  label: string;
  prompt: string;
  name: string;
  className?: string;
}>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{prompt}</FormDescription>
          <FormControl>
            <Input
              {...form.register(name)}
              className="flex w-full h-full items-center p-2"
              id="picture"
              type="file"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
