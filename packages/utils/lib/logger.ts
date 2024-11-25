import fs from "fs";
import path from "path";
import chalk, { type ChalkInstance } from "chalk";

const { NODE_ENV = "PROD" } = process.env;

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

const colourMap = new Map<LogLevel, ChalkInstance>([
  [LogLevel.DEBUG, chalk.blue],
  [LogLevel.INFO, chalk.green],
  [LogLevel.WARN, chalk.yellow],
  [LogLevel.ERROR, chalk.red],
]);

export class Logger {
  private readonly _name: string;
  private _filePath?: string;
  private _filePaths?: Record<LogLevel, string>;

  constructor(name: string) {
    this._name = name;
    return this;
  }

  private getTimestamp() {
    const date = new Date();
    const dateString =
      NODE_ENV === "DEV" ? date.toLocaleString() : date.toISOString();
    return `[${dateString}]`;
  }

  get name() {
    return `[${this._name}]`;
  }

  private createFilePath(filePath: string) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "");
    }
  }

  set filePath(filePath: string) {
    if (this._filePaths) throw new Error("File paths already set");

    this._filePath = filePath;

    this.createFilePath(filePath);
  }

  set filePaths(filePaths: Record<LogLevel, string>) {
    if (this._filePath) throw new Error("File path already set");
    this._filePaths = filePaths;

    for (const [_level, filePath] of Object.entries(filePaths)) {
      this.createFilePath(filePath);
    }
  }

  appendToFile(message: string) {
    if (!this._filePath) throw new Error("File path not set");
    fs.appendFileSync(this._filePath, message);
  }

  appendToFiles(message: string) {
    if (!this._filePaths) throw new Error("File paths not set");
    for (const [_level, filePath] of Object.entries(this._filePaths)) {
      fs.appendFileSync(filePath, message);
    }
  }

  info(message: string) {
    const prefix = colourMap.get(LogLevel.INFO)!(
      `${this.getTimestamp()} ${this.name}`,
    );
    const formattedMessage = `${prefix} ${message}`;
    console.log(formattedMessage);

    if (this._filePath) this.appendToFile(formattedMessage);
    if (this._filePaths) this.appendToFiles(formattedMessage);
  }

  debug(message: string, ...params: any[]) {
    const prefix = colourMap.get(LogLevel.DEBUG)!(
      `${this.getTimestamp()} ${this.name}`,
    );
    const formattedMessage = `${prefix} ${message}`;
    console.log(formattedMessage, ...params);

    const formattedWithParams = `${formattedMessage}\n${JSON.stringify(params, null, 2)}`;
    if (this._filePath) this.appendToFile(formattedWithParams);
    if (this._filePaths) this.appendToFiles(formattedWithParams);
  }

  warn(message: string) {
    const prefix = colourMap.get(LogLevel.WARN)!(
      `${this.getTimestamp()} ${this.name}`,
    );
    const formattedMessage = `${prefix} ${message}`;
    console.warn(formattedMessage);

    if (this._filePath) this.appendToFile(formattedMessage);
    if (this._filePaths) this.appendToFiles(formattedMessage);
  }

  error(message: string, error: Error) {
    const prefix = colourMap.get(LogLevel.ERROR)!(
      `${this.getTimestamp()} ${this.name}`,
    );
    const formattedMessage = `${prefix} ${message}`;
    console.error(formattedMessage, error);

    const formattedWithError = `${formattedMessage}\n${JSON.stringify(error, null, 2)}`;
    if (this._filePath) this.appendToFile(formattedWithError);
    if (this._filePaths) this.appendToFiles(formattedWithError);
  }

  static getLogger(name: string) {
    return new Logger(name);
  }
}
