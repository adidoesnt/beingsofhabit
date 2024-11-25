import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from "../ui/form";
  import { UseFormReturn } from "react-hook-form";
  import { Calendar } from "@/components/ui/calendar";
  
  export const EditorFormCalendarField = ({
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
    initialValue?: Date;
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
              <Calendar
                mode="single"
                selected={field.value}
                disabled={(date: Date) => date < new Date()}
                onSelect={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  