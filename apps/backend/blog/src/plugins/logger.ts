import { logger } from "src/utils";

type LoggerPluginProps = {
    request: Request;
    path: string;
}

export const loggerPlugin = () => ({ request, path }: LoggerPluginProps) => {
    const method = request.method.toUpperCase();
    logger.info(`${method} ${path}`);
}