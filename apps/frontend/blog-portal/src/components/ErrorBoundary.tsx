import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

type ErrorBoundaryProps = {
  errorMessage: string;
  to?: string;
};

export const ErrorBoundary = ({
  errorMessage,
  to,
}: Readonly<ErrorBoundaryProps>) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!to) return;

    const timeout = setTimeout(
      () =>
        navigate({
          to,
        }),
      3000,
    );

    return () => clearTimeout(timeout);
  }, [navigate, to]);

  return (
    <div className="grid place-items-center w-full h-full">
      <div className="flex flex-col items-center p-4 bg-red-200 rounded-md border-red-600 border-2 border-opacity-50 text-red-500">
        <h1 className="text-lg font-bold">An error occurred!</h1>
        <p className="text-md">{errorMessage}</p>
      </div>
    </div>
  );
};
