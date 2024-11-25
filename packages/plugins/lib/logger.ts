import { Logger } from "@/packages/utils/logger";

type GetLoggerPluginProps = {
  logger: Logger;
};

type LoggerPluginProps = {
  request: Request;
  path: string;
};

export const loggerPlugin = ({ logger }: GetLoggerPluginProps) => {
  return ({ request, path }: LoggerPluginProps) => {
    const method = request.method.toUpperCase();
    logger.info(`${method} ${path}`);
  };
};
