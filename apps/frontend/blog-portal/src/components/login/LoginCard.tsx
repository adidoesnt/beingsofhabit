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
  imgSrc: string;
};

export const LoginCard = ({ children, imgSrc }: Readonly<LoginCardProps>) => {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex">
          <img src={imgSrc} alt="Logo" className="w-32 h-32" />
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle>
            <h1 className="text-2xl font-bold">Log In</h1>
          </CardTitle>
          <CardDescription>
            Please enter you credentials below to enter the Beings of Habit blog
            portal.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-xs">Powered by shadcn/ui</p>
      </CardFooter>
    </Card>
  );
};
