import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LoginCardProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const LoginCard = ({ children }: Readonly<LoginCardProps>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-bold">Log In</h1>
        </CardTitle>
        <CardDescription>
          Please enter you credentials below to enter the Beings of Habit blog
          portal.
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-xs">Powered by shadcn/ui</p>
      </CardFooter>
    </Card>
  );
};
