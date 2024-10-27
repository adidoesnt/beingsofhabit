import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Category } from "@/packages/types/post";
import { toFirstLetterUppercase } from "@/packages/utils/string";

const categories = Object.values(Category).map((category) => ({
  value: category,
  label: category,
}));

export const EditorFormDropdownField = ({
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
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? toFirstLetterUppercase(
                        categories.find(
                          (category) => category.value === field.value,
                        )?.label ?? "",
                      )
                    : "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white text-black flex flex-col items-center">
              <Command className="flex flex-col gap-2 w-full">
                <CommandInput
                  className="bg-white text-black border-gray-100 border-[1px] rounded-sm p-1"
                  placeholder="Search category..."
                />
                <CommandList className="flex flex-col p-2 gap-2 border-gray-100 border-[1px] rounded-sm">
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup className="flex flex-col gap-4">
                    {categories.map((category) => (
                      <CommandItem
                        value={category.label}
                        key={category.value}
                        onSelect={() => {
                          form.setValue("category", category.value);
                        }}
                        className="flex gap-1 items-center"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            category.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {toFirstLetterUppercase(category.label)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{prompt}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
